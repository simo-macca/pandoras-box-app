import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Player,
  RoundEntry,
  GameConfig,
  GameState,
  Language,
  HandScore,
} from '../types/game';
import { soundEffects } from '../utils/sound';
import {
  calculateHandPoints,
  SCORE_PRESETS,
  getRecommendedPresets,
} from '../utils/scoring';
import { calculatePlayerStats, PlayerStats } from '../utils/stats';
import {
  INITIAL_PLAYERS,
  INITIAL_STATE,
  getInitialGameState,
  loadSavedGameState,
  saveGameStateToStorage,
  loadSavedLanguage,
  saveLanguageToStorage,
} from '../utils/storage';

// Re-export domain models & pure functions for backward compatibility
export {
  calculateHandPoints,
  SCORE_PRESETS,
  getRecommendedPresets,
  calculatePlayerStats,
  INITIAL_PLAYERS,
  INITIAL_STATE,
  getInitialGameState,
};
export type { PlayerStats };

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(() =>
    loadSavedGameState()
  );
  const [language, setLanguageState] = useState<Language>(() =>
    loadSavedLanguage()
  );

  // Synchronize state with persistent storage
  useEffect(() => {
    saveGameStateToStorage(gameState);
  }, [gameState]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    saveLanguageToStorage(lang);
  }, []);

  // Compute derived leaderboard and player metrics
  const playerStats = useMemo<PlayerStats[]>(() => {
    return calculatePlayerStats(
      gameState.players,
      gameState.rounds,
      gameState.config.targetScore
    );
  }, [gameState]);

  // Handle game-over lifecycle transitions automatically based on point threshold
  useEffect(() => {
    if (gameState.rounds.length === 0) {
      if (gameState.isGameOver || gameState.isContinued) {
        setGameState((prev) => ({
          ...prev,
          isGameOver: false,
          isContinued: false,
          winnerId: null,
        }));
      }
      return;
    }

    const someoneExceeded = playerStats.some(
      (p) => p.totalScore >= gameState.config.targetScore
    );
    const lowestScorePlayer = playerStats[0];

    if (someoneExceeded) {
      if (!gameState.isGameOver && !gameState.isContinued) {
        soundEffects.playWinner();
        setGameState((prev) => ({
          ...prev,
          isGameOver: true,
          winnerId: lowestScorePlayer?.id || null,
        }));
      } else if (gameState.isGameOver) {
        if (gameState.winnerId !== (lowestScorePlayer?.id || null)) {
          setGameState((prev) => ({
            ...prev,
            winnerId: lowestScorePlayer?.id || null,
          }));
        }
      }
    } else {
      if (gameState.isGameOver || gameState.isContinued) {
        setGameState((prev) => ({
          ...prev,
          isGameOver: false,
          isContinued: false,
          winnerId: null,
        }));
      }
    }
  }, [
    playerStats,
    gameState.rounds.length,
    gameState.config.targetScore,
    gameState.isGameOver,
    gameState.isContinued,
    gameState.winnerId,
  ]);

  const addRound = useCallback(
    (scores: Record<string, HandScore>, notes?: string) => {
      soundEffects.playDiceFinish(false);
      setGameState((prev) => {
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
    (
      roundNumber: number,
      scores: Record<string, HandScore>,
      notes?: string
    ) => {
      soundEffects.playClick();
      setGameState((prev) => ({
        ...prev,
        rounds: prev.rounds.map((r) =>
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
    setGameState((prev) => {
      const filtered = prev.rounds.filter((r) => r.roundNumber !== roundNumber);
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
    setGameState((prev) => {
      if (prev.rounds.length === 0) return prev;
      return {
        ...prev,
        rounds: prev.rounds.slice(0, -1),
      };
    });
  }, []);

  const setActiveRuleCardIds = useCallback((ids: string[]) => {
    soundEffects.playClick();
    setGameState((prev) => ({
      ...prev,
      activeRuleCardIds: ids,
    }));
  }, []);

  const startNewGame = useCallback(
    (players?: Player[], config?: GameConfig) => {
      soundEffects.playClick();
      setGameState((prev) => {
        const finalPlayers = players || prev.players;
        const baseConfig = config || prev.config;
        const finalConfig = {
          ...baseConfig,
          targetScore: Math.max(50, baseConfig.targetScore),
        };
        return {
          players: finalPlayers,
          config: finalConfig,
          rounds: [],
          activeRuleCardIds: [],
          isGameStarted: true,
          isGameOver: false,
          winnerId: null,
          isContinued: false,
        };
      });
    },
    []
  );

  const updateGameSetup = useCallback(
    (players: Player[], config: GameConfig) => {
      soundEffects.playClick();
      setGameState((prev) => {
        const finalConfig = {
          ...config,
          targetScore: Math.max(50, config.targetScore),
        };
        return {
          ...prev,
          players,
          config: finalConfig,
        };
      });
    },
    []
  );

  const restoreGameState = useCallback((stateToRestore: GameState) => {
    soundEffects.playClick();
    setGameState(stateToRestore);
    saveGameStateToStorage(stateToRestore);
  }, []);

  const resetCurrentGame = useCallback(() => {
    soundEffects.playClick();
    setGameState((prev) => ({
      ...prev,
      rounds: [],
      activeRuleCardIds: [],
      isGameOver: false,
      winnerId: null,
      isContinued: false,
    }));
  }, []);

  const continueGame = useCallback(() => {
    soundEffects.playClick();
    setGameState((prev) => ({
      ...prev,
      isGameOver: false,
      isContinued: true,
    }));
  }, []);

  const concludeGame = useCallback(() => {
    soundEffects.playWinner();
    setGameState((prev) => {
      const lowestScorePlayer = playerStats[0];
      return {
        ...prev,
        isGameOver: true,
        isContinued: false,
        winnerId: lowestScorePlayer?.id || null,
      };
    });
  }, [playerStats]);

  const resetAllData = useCallback(() => {
    soundEffects.playClick();
    const freshState = getInitialGameState();
    setGameState(freshState);
    saveGameStateToStorage(freshState);
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

      if (
        !stateToLoad.players ||
        !Array.isArray(stateToLoad.players) ||
        !stateToLoad.config
      ) {
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
        isContinued: !!stateToLoad.isContinued,
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
    updateGameSetup,
    restoreGameState,
    resetCurrentGame,
    continueGame,
    concludeGame,
    resetAllData,
    exportGameState,
    importGameState,
  };
}
