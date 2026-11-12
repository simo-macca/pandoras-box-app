import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Player,
  RoundEntry,
  GameConfig,
  GameState,
  Language,
  HandScore,
  SeppukuOutcome,
} from '@/types/game';
import { soundEffects } from '@/utils/sound';
import { APP_VERSION } from '@/data/appInfo';
import {
  calculatePlayerStats,
  countPlayedRounds,
  getGameOverUpdate,
  PlayerStats,
} from '@/utils/stats';
import {
  buildSeppukuResult,
  createIdentityTheftEntry,
  createLateJoinerEntries,
  createSeppukuEntry,
  findIdentityTheftPair,
  IdentityTheftPair,
  renumberRounds,
  SEPPUKU_NOTE,
} from '@/utils/events';
import {
  getInitialGameState,
  loadSavedGameState,
  saveGameStateToStorage,
  loadSavedLanguage,
  saveLanguageToStorage,
  sanitizeGameState,
  MIN_TARGET_SCORE,
} from '@/utils/storage';

/** Clamps the point limit and normalises the optional round limit. */
function normalizeConfig(config: GameConfig): GameConfig {
  return {
    ...config,
    targetScore: Math.max(MIN_TARGET_SCORE, config.targetScore),
    roundLimit:
      config.roundLimit && config.roundLimit > 0 ? config.roundLimit : null,
  };
}

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(() =>
    loadSavedGameState()
  );
  const [language, setLanguageState] = useState<Language>(() =>
    loadSavedLanguage()
  );

  // Persist every change.
  useEffect(() => {
    saveGameStateToStorage(gameState);
  }, [gameState]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    saveLanguageToStorage(lang);
  }, []);

  // Leaderboard, sorted by ascending score (lowest score leads).
  const playerStats = useMemo<PlayerStats[]>(
    () =>
      calculatePlayerStats(
        gameState.players,
        gameState.rounds,
        gameState.config.targetScore
      ),
    [gameState.players, gameState.rounds, gameState.config.targetScore]
  );

  // Keep the game-over flags in sync with the history and configuration.
  useEffect(() => {
    const update = getGameOverUpdate(gameState, playerStats);
    if (!update) return;
    if (update.isGameOver) soundEffects.playWinner();
    setGameState((prev) => ({ ...prev, ...update }));
  }, [gameState, playerStats]);

  const addRound = useCallback(
    (scores: Record<string, HandScore>, notes?: string) => {
      soundEffects.playChime(false);
      setGameState((prev) => {
        const roundNumber = countPlayedRounds(prev.rounds) + 1;
        const activeRuleCardIds = [...(prev.activeRuleCardIds ?? [])];
        const newRound: RoundEntry = {
          id: `round-${roundNumber}-${Date.now()}`,
          roundNumber,
          timestamp: Date.now(),
          activeRuleCardId: activeRuleCardIds[0] ?? null,
          activeRuleCardIds,
          scores,
          notes,
        };
        return { ...prev, rounds: [...prev.rounds, newRound] };
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
            ? { ...r, scores, notes: notes ?? r.notes }
            : r
        ),
      }));
    },
    []
  );

  const deleteRound = useCallback((roundNumber: number, entryId?: string) => {
    soundEffects.playClick();
    setGameState((prev) => {
      const remaining = prev.rounds.filter((r) =>
        entryId ? r.id !== entryId : r.roundNumber !== roundNumber || r.isEvent
      );
      return { ...prev, rounds: renumberRounds(remaining) };
    });
  }, []);

  /**
   * Applies Identity Theft and returns the swapped pair, or `null` when all
   * scores are equal (nothing to swap).
   */
  const applyIdentityTheft = useCallback((): IdentityTheftPair | null => {
    const pair = findIdentityTheftPair(gameState.players, gameState.rounds);
    if (!pair) return null;

    const entry = createIdentityTheftEntry(
      pair,
      gameState.players,
      gameState.rounds
    );
    soundEffects.playClick();
    setGameState((prev) => ({ ...prev, rounds: [...prev.rounds, entry] }));
    return pair;
  }, [gameState.players, gameState.rounds]);

  const applySeppuku = useCallback(
    (
      choices: Record<string, SeppukuOutcome>,
      existingRoundId?: string
    ): boolean => {
      if (gameState.players.length === 0) return false;
      const result = buildSeppukuResult(gameState.players, choices);

      soundEffects.playClick();
      setGameState((prev) => {
        const existing =
          existingRoundId && prev.rounds.some((r) => r.id === existingRoundId);
        if (existing) {
          return {
            ...prev,
            rounds: prev.rounds.map((r) =>
              r.id === existingRoundId
                ? {
                    ...r,
                    scores: result.scores,
                    notes: SEPPUKU_NOTE,
                    eventMetadata: { ...r.eventMetadata, ...result.metadata },
                  }
                : r
            ),
          };
        }
        return {
          ...prev,
          rounds: [...prev.rounds, createSeppukuEntry(result, prev.rounds)],
        };
      });
      return true;
    },
    [gameState.players]
  );

  const undoLastRound = useCallback(() => {
    soundEffects.playClick();
    setGameState((prev) =>
      prev.rounds.length === 0
        ? prev
        : { ...prev, rounds: prev.rounds.slice(0, -1) }
    );
  }, []);

  const setActiveRuleCardIds = useCallback((ids: string[]) => {
    soundEffects.playClick();
    setGameState((prev) => ({ ...prev, activeRuleCardIds: ids }));
  }, []);

  const startNewGame = useCallback(
    (players?: Player[], config?: GameConfig) => {
      soundEffects.playClick();
      setGameState((prev) => ({
        players: players || prev.players,
        config: normalizeConfig(config || prev.config),
        rounds: [],
        activeRuleCardIds: [],
        isGameStarted: true,
        isGameOver: false,
        winnerId: null,
        isContinued: false,
      }));
    },
    []
  );

  const updateGameSetup = useCallback(
    (players: Player[], config: GameConfig) => {
      soundEffects.playClick();
      setGameState((prev) => {
        const prevIds = new Set(prev.players.map((p) => p.id));
        const joiners = players.filter((p) => !prevIds.has(p.id));
        const lateJoinerEntries = createLateJoinerEntries(
          prev.players,
          prev.rounds,
          joiners
        );
        return {
          ...prev,
          players,
          config: normalizeConfig(config),
          rounds: [...prev.rounds, ...lateJoinerEntries],
        };
      });
    },
    []
  );

  /** Restores an undo snapshot. Invalid snapshots are ignored. */
  const restoreGameState = useCallback((stateToRestore: GameState) => {
    const safeState = sanitizeGameState(stateToRestore);
    if (!safeState) {
      console.warn('Undo snapshot is invalid; it was not restored.');
      return;
    }
    soundEffects.playClick();
    setGameState(safeState);
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
    setGameState((prev) => ({ ...prev, isGameOver: false, isContinued: true }));
  }, []);

  const concludeGame = useCallback(() => {
    soundEffects.playWinner();
    const winnerId = playerStats[0]?.id ?? null;
    setGameState((prev) => ({
      ...prev,
      isGameOver: true,
      isContinued: false,
      winnerId,
    }));
  }, [playerStats]);

  const resetAllData = useCallback(() => {
    soundEffects.playClick();
    setGameState(getInitialGameState());
  }, []);

  const exportGameState = useCallback(
    (): string =>
      JSON.stringify(
        {
          version: APP_VERSION,
          exportDate: new Date().toISOString(),
          gameState,
        },
        null,
        2
      ),
    [gameState]
  );

  const importGameState = useCallback((jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      const candidate = parsed && parsed.gameState ? parsed.gameState : parsed;
      const stateToLoad = sanitizeGameState(candidate);
      if (!stateToLoad) throw new Error('Invalid game state structure');

      setGameState(stateToLoad);
      soundEffects.playClick();
      return true;
    } catch (err) {
      console.error('Failed to import game state:', err);
      return false;
    }
  }, []);

  const canApplyIdentityTheft = useMemo(() => {
    if (gameState.isGameOver && !gameState.isContinued) return false;
    return findIdentityTheftPair(gameState.players, gameState.rounds) !== null;
  }, [
    gameState.players,
    gameState.rounds,
    gameState.isGameOver,
    gameState.isContinued,
  ]);

  /** The stored winner, falling back to the current leader. */
  const winner = useMemo<PlayerStats | null>(
    () =>
      playerStats.find((p) => p.id === gameState.winnerId) ??
      playerStats[0] ??
      null,
    [playerStats, gameState.winnerId]
  );

  return {
    gameState,
    playerStats,
    winner,
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
