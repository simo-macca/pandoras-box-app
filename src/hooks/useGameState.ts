import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Player,
  RoundEntry,
  GameConfig,
  GameState,
  Language,
  HandScore,
  SeppukuOutcome,
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

    const currentRoundCount = gameState.rounds.filter((r) => !r.isEvent).length;
    const reachedRoundLimit = Boolean(
      gameState.config.roundLimit &&
      gameState.config.roundLimit > 0 &&
      currentRoundCount >= gameState.config.roundLimit
    );
    const someoneExceeded = playerStats.some(
      (p) => p.totalScore >= gameState.config.targetScore
    );
    const isOver = someoneExceeded || reachedRoundLimit;
    const lowestScorePlayer = playerStats[0];

    if (isOver) {
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
    gameState.rounds,
    gameState.config.targetScore,
    gameState.config.roundLimit,
    gameState.isGameOver,
    gameState.isContinued,
    gameState.winnerId,
  ]);

  const addRound = useCallback(
    (scores: Record<string, HandScore>, notes?: string) => {
      soundEffects.playDiceFinish(false);
      setGameState((prev) => {
        const nextRoundNumber =
          prev.rounds.filter((r) => !r.isEvent).length + 1;
        const newRound: RoundEntry = {
          id: `round-${nextRoundNumber}-${Date.now()}`,
          roundNumber: nextRoundNumber,
          timestamp: Date.now(),
          activeRuleCardId: prev.activeRuleCardIds?.[0] || null,
          activeRuleCardIds: prev.activeRuleCardIds
            ? [...prev.activeRuleCardIds]
            : [],
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
          r.roundNumber === roundNumber && !r.isEvent
            ? { ...r, scores, notes: notes !== undefined ? notes : r.notes }
            : r
        ),
      }));
    },
    []
  );

  const deleteRound = useCallback((roundNumber: number, entryId?: string) => {
    soundEffects.playClick();
    setGameState((prev) => {
      const filtered = prev.rounds.filter((r) =>
        entryId ? r.id !== entryId : r.roundNumber !== roundNumber || r.isEvent
      );
      let currentRoundNum = 0;
      const renumbered = filtered.map((r) => {
        if (r.isEvent) {
          return r;
        }
        currentRoundNum += 1;
        return {
          ...r,
          roundNumber: currentRoundNum,
        };
      });
      return {
        ...prev,
        rounds: renumbered,
      };
    });
  }, []);

  const applyIdentityTheft = useCallback((): boolean => {
    if (gameState.players.length < 2) return false;

    const currentStats = calculatePlayerStats(
      gameState.players,
      gameState.rounds,
      gameState.config.targetScore
    );

    const scores = currentStats.map((s) => s.totalScore);
    const minScore = Math.min(...scores);
    const maxScore = Math.max(...scores);

    // Disable or do nothing if all scores are identical
    if (minScore === maxScore) {
      return false;
    }

    // Deterministically pick lowest: first in players array matching minScore
    const lowestPlayer = gameState.players.find(
      (p) => currentStats.find((s) => s.id === p.id)?.totalScore === minScore
    );

    // Deterministically pick highest: first in players array matching maxScore
    const highestPlayer = gameState.players.find(
      (p) => currentStats.find((s) => s.id === p.id)?.totalScore === maxScore
    );

    if (
      !lowestPlayer ||
      !highestPlayer ||
      lowestPlayer.id === highestPlayer.id
    ) {
      return false;
    }

    const deltaLow = maxScore - minScore;
    const deltaHigh = minScore - maxScore;

    const roundScores: Record<string, HandScore> = {};
    gameState.players.forEach((p) => {
      let delta = 0;
      if (p.id === lowestPlayer.id) {
        delta = deltaLow;
      } else if (p.id === highestPlayer.id) {
        delta = deltaHigh;
      }
      roundScores[p.id] = {
        isWinner: false,
        totalPoints: delta,
      };
    });

    const timestamp = Date.now();
    const currentRoundCount = gameState.rounds.filter((r) => !r.isEvent).length;
    const eventEntry: RoundEntry = {
      id: `event-identity-theft-${timestamp}`,
      roundNumber: currentRoundCount,
      timestamp,
      isEvent: true,
      eventType: 'identity-theft',
      scores: roundScores,
      notes: `Identity Theft: ${lowestPlayer.name} (${minScore} pts) ⇄ ${highestPlayer.name} (${maxScore} pts)`,
      eventMetadata: {
        lowPlayerId: lowestPlayer.id,
        highPlayerId: highestPlayer.id,
        lowPlayerName: lowestPlayer.name,
        highPlayerName: highestPlayer.name,
        lowScoreBefore: minScore,
        highScoreBefore: maxScore,
      },
    };

    soundEffects.playClick();
    setGameState((prev) => ({
      ...prev,
      rounds: [...prev.rounds, eventEntry],
    }));

    return true;
  }, [gameState]);

  const applySeppuku = useCallback(
    (
      choices: Record<string, SeppukuOutcome>,
      existingRoundId?: string
    ): boolean => {
      if (gameState.players.length === 0) return false;

      const roundScores: Record<string, HandScore> = {};
      const choicesMetadata: Record<
        string,
        {
          playerName: string;
          outcome: SeppukuOutcome;
          points: number;
        }
      > = {};

      gameState.players.forEach((p) => {
        const choice = choices[p.id] || 'no_risk';
        const points =
          choice === 'risk_number' ? -21 : choice === 'risk_special' ? 42 : 21;

        roundScores[p.id] = {
          isWinner: false,
          totalPoints: points,
        };

        choicesMetadata[p.id] = {
          playerName: p.name,
          outcome: choice,
          points,
        };
      });

      soundEffects.playClick();
      setGameState((prev) => {
        if (existingRoundId) {
          const exists = prev.rounds.some((r) => r.id === existingRoundId);
          if (exists) {
            return {
              ...prev,
              rounds: prev.rounds.map((r) =>
                r.id === existingRoundId
                  ? {
                      ...r,
                      scores: roundScores,
                      notes: 'Seppuku T: Point adjustments applied',
                      eventMetadata: {
                        ...r.eventMetadata,
                        choices: choicesMetadata,
                      },
                    }
                  : r
              ),
            };
          }
        }

        const timestamp = Date.now();
        const currentRoundCount = prev.rounds.filter((r) => !r.isEvent).length;
        const eventEntry: RoundEntry = {
          id: `event-seppuku-${timestamp}`,
          roundNumber: currentRoundCount,
          timestamp,
          isEvent: true,
          eventType: 'seppuku',
          scores: roundScores,
          notes: 'Seppuku T: Point adjustments applied',
          eventMetadata: {
            choices: choicesMetadata,
          },
        };

        return {
          ...prev,
          rounds: [...prev.rounds, eventEntry],
        };
      });

      return true;
    },
    [gameState.players]
  );

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
        const finalConfig: GameConfig = {
          ...baseConfig,
          targetScore: Math.max(50, baseConfig.targetScore),
          roundLimit:
            baseConfig.roundLimit && baseConfig.roundLimit > 0
              ? baseConfig.roundLimit
              : null,
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
        const finalConfig: GameConfig = {
          ...config,
          targetScore: Math.max(50, config.targetScore),
          roundLimit:
            config.roundLimit && config.roundLimit > 0
              ? config.roundLimit
              : null,
        };

        // Detect mid-game late joiners: players whose id was not in prev.players
        const prevIds = new Set(prev.players.map((p) => p.id));
        const newPlayers = players.filter((p) => !prevIds.has(p.id));

        const updatedRounds = [...prev.rounds];
        if (newPlayers.length > 0 && prev.rounds.length > 0) {
          const currentStats = calculatePlayerStats(
            prev.players,
            prev.rounds,
            prev.config.targetScore
          );
          const currentScores = currentStats.map((s) => s.totalScore);
          const maxScore =
            currentScores.length > 0 ? Math.max(...currentScores) : 0;
          const startingScore = maxScore + 1;
          const currentRoundCount = prev.rounds.filter(
            (r) => !r.isEvent
          ).length;
          const timestamp = Date.now();

          newPlayers.forEach((newPlayer, idx) => {
            const lateJoinerEntry: RoundEntry = {
              id: `event-late-joiner-${newPlayer.id}-${timestamp + idx}`,
              roundNumber: currentRoundCount,
              timestamp: timestamp + idx,
              isEvent: true,
              eventType: 'late-joiner',
              scores: {
                [newPlayer.id]: {
                  isWinner: false,
                  totalPoints: startingScore,
                },
              },
              notes: `Late Joiner: ${newPlayer.name} joined with starting score of ${startingScore} pts`,
              eventMetadata: {
                playerId: newPlayer.id,
                playerName: newPlayer.name,
                startingScore,
                highestScoreBefore: maxScore,
              },
            };
            updatedRounds.push(lateJoinerEntry);
          });
        }

        return {
          ...prev,
          players,
          config: finalConfig,
          rounds: updatedRounds,
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

  const canApplyIdentityTheft = useMemo(() => {
    if (gameState.players.length < 2) return false;
    if (gameState.isGameOver && !gameState.isContinued) return false;
    const scores = playerStats.map((s) => s.totalScore);
    if (scores.length === 0) return false;
    const minScore = Math.min(...scores);
    const maxScore = Math.max(...scores);
    return minScore !== maxScore;
  }, [
    gameState.players.length,
    gameState.isGameOver,
    gameState.isContinued,
    playerStats,
  ]);

  return {
    gameState,
    playerStats,
    language,
    setLanguage,
    addRound,
    editRound,
    deleteRound,
    undoLastRound,
    applyIdentityTheft,
    canApplyIdentityTheft,
    applySeppuku,
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
