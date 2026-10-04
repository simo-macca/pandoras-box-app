import { useState, useEffect, useCallback, useMemo } from 'react';
import { Player, RoundEntry, GameConfig, GameState, Language, HandScore } from '../types/game';
import { soundEffects } from '../utils/sound';

const STORAGE_KEY = 'frantic_game_state_v2';
const LANG_STORAGE_KEY = 'frantic_lang_v2';

export const SCORE_PRESETS = {
  few: {
    short: 137,
    medium: 154,
    long: 179,
  },
  many: {
    short: 113,
    medium: 137,
    long: 154,
  },
};

export function getRecommendedPresets(playerCount: number) {
  return playerCount <= 4 ? SCORE_PRESETS.few : SCORE_PRESETS.many;
}

export function calculateHandPoints(hand: Omit<HandScore, 'totalPoints'> | HandScore): number {
  if (hand.isDoomsday) {
    return 50;
  }

  if (hand.isWinner) {
    let pts = 0;
    if (hand.timeBombModifier === 'winner_bonus') {
      pts -= 10;
    }
    pts += (hand.customModifier || 0);
    return Math.max(0, pts);
  }

  let total = 0;
  if (hand.numberCards) {
    Object.entries(hand.numberCards).forEach(([numStr, count]) => {
      const num = parseInt(numStr, 10);
      if (!isNaN(num) && count) {
        total += num * count;
      }
    });
  }

  total += (hand.specialCardsCount || 0) * 7;
  total += (hand.curseCount || 0) * 13;
  total += (hand.theEndCount || 0) * 17;
  total += (hand.fuckYouCount || 0) * 42;
  total += (hand.mimicryCount || 0) * 7;

  if (hand.timeBombModifier === 'expired_double') {
    total *= 2;
  } else if (hand.timeBombModifier === 'loser_penalty') {
    total += 10;
  } else if (hand.timeBombModifier === 'winner_bonus') {
    total -= 10;
  }

  total += (hand.customModifier || 0);
  return Math.max(0, total);
}

export interface PlayerStats extends Player {
  totalScore: number;
  rank: number;
  isLeader: boolean;
  isInDanger: boolean;
  isEliminated: boolean;
  progressPct: number;
  pointsRemaining: number;
  roundsWonCount: number;
}

const INITIAL_PLAYERS: Player[] = [
  { id: 'p1', name: 'Player 1', color: 'red' },
  { id: 'p2', name: 'Player 2', color: 'blue' },
  { id: 'p3', name: 'Player 3', color: 'green' },
  { id: 'p4', name: 'Player 4', color: 'yellow' },
];

const INITIAL_STATE: GameState = {
  players: INITIAL_PLAYERS,
  config: {
    targetScore: 154,
    presetName: 'medium',
  },
  rounds: [],
  activeRuleCardIds: [],
  isGameStarted: true,
  isGameOver: false,
  winnerId: null,
};

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(() => {
    if (typeof window === 'undefined') return INITIAL_STATE;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (err) {
      console.warn('Failed to parse saved game state from localStorage:', err);
    }
    return INITIAL_STATE;
  });

  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'en';
    try {
      const stored = localStorage.getItem(LANG_STORAGE_KEY) as Language;
      if (stored && ['en', 'de', 'it', 'fr'].includes(stored)) {
        return stored;
      }
    } catch {
      // fallback
    }
    return 'en';
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    } catch (err) {
      console.error('Failed to save game state to localStorage:', err);
    }
  }, [gameState]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch (err) {
      console.error('Failed to save language preference:', err);
    }
  }, []);

  const playerStats = useMemo<PlayerStats[]>(() => {
    const { players, rounds, config } = gameState;
    const targetScore = config.targetScore;

    const totals: Record<string, { score: number; wins: number }> = {};
    players.forEach(p => {
      totals[p.id] = { score: 0, wins: 0 };
    });

    rounds.forEach(round => {
      players.forEach(p => {
        const roundScore = round.scores[p.id];
        if (roundScore) {
          totals[p.id].score += roundScore.totalPoints;
          if (roundScore.isWinner) {
            totals[p.id].wins += 1;
          }
        }
      });
    });

    // In Frantic, lower score is better!
    const stats: PlayerStats[] = players.map(p => {
      const totalScore = totals[p.id]?.score || 0;
      const wins = totals[p.id]?.wins || 0;
      const progressPct = Math.min(100, Math.round((totalScore / targetScore) * 100));
      const pointsRemaining = Math.max(0, targetScore - totalScore);
      const isEliminated = totalScore >= targetScore;
      const isInDanger = totalScore >= targetScore * 0.8 && !isEliminated;

      return {
        ...p,
        totalScore,
        rank: 1,
        isLeader: false,
        isInDanger,
        isEliminated,
        progressPct,
        pointsRemaining,
        roundsWonCount: wins,
      };
    });

    stats.sort((a, b) => a.totalScore - b.totalScore);

    stats.forEach((s, idx) => {
      s.rank = idx + 1;
      s.isLeader = idx === 0;
    });

    return stats;
  }, [gameState]);

  useEffect(() => {
    if (gameState.rounds.length === 0) {
      if (gameState.isGameOver) {
        setGameState(prev => ({ ...prev, isGameOver: false, winnerId: null }));
      }
      return;
    }

    const someoneExceeded = playerStats.some(p => p.totalScore >= gameState.config.targetScore);
    const lowestScorePlayer = playerStats[0];

    if (someoneExceeded) {
      if (!gameState.isGameOver) {
        soundEffects.playWinner();
        setGameState(prev => ({
          ...prev,
          isGameOver: true,
          winnerId: lowestScorePlayer?.id || null,
        }));
      }
    } else {
      if (gameState.isGameOver) {
        setGameState(prev => ({
          ...prev,
          isGameOver: false,
          winnerId: null,
        }));
      }
    }
  }, [playerStats, gameState.rounds.length, gameState.config.targetScore, gameState.isGameOver]);

  const addRound = useCallback(
    (scores: Record<string, HandScore>, notes?: string) => {
      soundEffects.playDiceFinish(false);
      setGameState(prev => {
        const nextRoundNumber = prev.rounds.length + 1;
        const newRound: RoundEntry = {
          roundNumber: nextRoundNumber,
          timestamp: Date.now(),
          activeRuleCardId: prev.activeRuleCardIds?.[0] || null,
          scores,
          notes,
        };
        return {
          ...prev,
          rounds: [...prev.rounds, newRound],
        };
      });
    },
    []
  );

  const editRound = useCallback(
    (roundNumber: number, scores: Record<string, HandScore>, notes?: string) => {
      soundEffects.playClick();
      setGameState(prev => ({
        ...prev,
        rounds: prev.rounds.map(r =>
          r.roundNumber === roundNumber
            ? { ...r, scores, notes: notes !== undefined ? notes : r.notes }
            : r
        ),
      }));
    },
    []
  );

  const deleteRound = useCallback((roundNumber: number) => {
    soundEffects.playClick();
    setGameState(prev => {
      const filtered = prev.rounds.filter(r => r.roundNumber !== roundNumber);
      const renumbered = filtered.map((r, idx) => ({
        ...r,
        roundNumber: idx + 1,
      }));
      return {
        ...prev,
        rounds: renumbered,
      };
    });
  }, []);

  const undoLastRound = useCallback(() => {
    soundEffects.playClick();
    setGameState(prev => {
      if (prev.rounds.length === 0) return prev;
      return {
        ...prev,
        rounds: prev.rounds.slice(0, -1),
      };
    });
  }, []);

  const setActiveRuleCardIds = useCallback((ids: string[]) => {
    soundEffects.playClick();
    setGameState(prev => ({
      ...prev,
      activeRuleCardIds: ids,
    }));
  }, []);

  const startNewGame = useCallback((players?: Player[], config?: GameConfig) => {
    soundEffects.playClick();
    setGameState(prev => {
      const finalPlayers = players || prev.players;
      const finalConfig = config || prev.config;
      return {
        players: finalPlayers,
        config: finalConfig,
        rounds: [],
        activeRuleCardIds: [],
        isGameStarted: true,
        isGameOver: false,
        winnerId: null,
      };
    });
  }, []);

  const resetCurrentGame = useCallback(() => {
    soundEffects.playClick();
    setGameState(prev => ({
      ...prev,
      rounds: [],
      activeRuleCardIds: [],
      isGameOver: false,
      winnerId: null,
    }));
  }, []);

  const exportGameState = useCallback((): string => {
    return JSON.stringify(
      {
        version: 2,
        exportDate: new Date().toISOString(),
        gameState,
      },
      null,
      2
    );
  }, [gameState]);

  const importGameState = useCallback((jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      const stateToLoad: GameState = parsed.gameState || parsed;

      if (!stateToLoad.players || !Array.isArray(stateToLoad.players) || !stateToLoad.config) {
        throw new Error('Invalid game state structure');
      }

      setGameState({
        players: stateToLoad.players,
        config: stateToLoad.config,
        rounds: Array.isArray(stateToLoad.rounds) ? stateToLoad.rounds : [],
        activeRuleCardIds: stateToLoad.activeRuleCardIds || [],
        isGameStarted: true,
        isGameOver: !!stateToLoad.isGameOver,
        winnerId: stateToLoad.winnerId || null,
      });

      soundEffects.playClick();
      return true;
    } catch (err) {
      console.error('Failed to import game state:', err);
      return false;
    }
  }, []);

  return {
    gameState,
    playerStats,
    language,
    setLanguage,
    addRound,
    editRound,
    deleteRound,
    undoLastRound,
    setActiveRuleCardIds,
    startNewGame,
    resetCurrentGame,
    exportGameState,
    importGameState,
  };
}
