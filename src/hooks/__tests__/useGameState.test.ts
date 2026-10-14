import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useGameState } from '../useGameState';
import { DEFAULT_HAND_SCORE } from '../../utils/scoring';
import { HandScore, Player } from '../../types/game';

describe('useGameState hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with default players and configuration', () => {
    const { result } = renderHook(() => useGameState());

    expect(result.current.gameState.players).toHaveLength(4);
    expect(result.current.gameState.config.targetScore).toBe(154);
    expect(result.current.gameState.rounds).toHaveLength(0);
    expect(result.current.gameState.isGameOver).toBe(false);
    expect(result.current.gameState.winnerId).toBeNull();
    expect(result.current.playerStats).toHaveLength(4);
    expect(result.current.language).toBe('en');
  });

  it('updates language and persists preference', () => {
    const { result } = renderHook(() => useGameState());

    act(() => {
      result.current.setLanguage('it');
    });

    expect(result.current.language).toBe('it');
  });

  it('adds rounds and updates player scores and stats', () => {
    const { result } = renderHook(() => useGameState());
    const [p1, p2, p3, p4] = result.current.gameState.players;

    const round1Scores: Record<string, HandScore> = {
      [p1.id]: {
        ...DEFAULT_HAND_SCORE,
        totalPoints: 0,
        isWinner: true,
      } as HandScore,
      [p2.id]: { ...DEFAULT_HAND_SCORE, totalPoints: 15 } as HandScore,
      [p3.id]: { ...DEFAULT_HAND_SCORE, totalPoints: 25 } as HandScore,
      [p4.id]: { ...DEFAULT_HAND_SCORE, totalPoints: 30 } as HandScore,
    };

    act(() => {
      result.current.addRound(round1Scores, 'Great first round');
    });

    expect(result.current.gameState.rounds).toHaveLength(1);
    expect(result.current.gameState.rounds[0].roundNumber).toBe(1);
    expect(result.current.gameState.rounds[0].notes).toBe('Great first round');

    const p1Stats = result.current.playerStats.find((p) => p.id === p1.id)!;
    expect(p1Stats.totalScore).toBe(0);
    expect(p1Stats.roundsWonCount).toBe(1);
    expect(p1Stats.rank).toBe(1);
    expect(p1Stats.isLeader).toBe(true);

    const p4Stats = result.current.playerStats.find((p) => p.id === p4.id)!;
    expect(p4Stats.totalScore).toBe(30);
    expect(p4Stats.rank).toBe(4);
  });

  it('allows editing an existing round', () => {
    const { result } = renderHook(() => useGameState());
    const [p1, p2, p3, p4] = result.current.gameState.players;

    act(() => {
      result.current.addRound({
        [p1.id]: { ...DEFAULT_HAND_SCORE, totalPoints: 10 } as HandScore,
        [p2.id]: { ...DEFAULT_HAND_SCORE, totalPoints: 20 } as HandScore,
        [p3.id]: { ...DEFAULT_HAND_SCORE, totalPoints: 30 } as HandScore,
        [p4.id]: { ...DEFAULT_HAND_SCORE, totalPoints: 40 } as HandScore,
      });
    });

    expect(result.current.gameState.rounds[0].scores[p1.id].totalPoints).toBe(
      10
    );

    act(() => {
      result.current.editRound(
        1,
        {
          [p1.id]: {
            ...DEFAULT_HAND_SCORE,
            totalPoints: 0,
            isWinner: true,
          } as HandScore,
          [p2.id]: { ...DEFAULT_HAND_SCORE, totalPoints: 20 } as HandScore,
          [p3.id]: { ...DEFAULT_HAND_SCORE, totalPoints: 30 } as HandScore,
          [p4.id]: { ...DEFAULT_HAND_SCORE, totalPoints: 40 } as HandScore,
        },
        'Updated notes'
      );
    });

    expect(result.current.gameState.rounds[0].scores[p1.id].totalPoints).toBe(
      0
    );
    expect(result.current.gameState.rounds[0].notes).toBe('Updated notes');
  });

  it('deletes rounds and renumbers subsequent rounds', () => {
    const { result } = renderHook(() => useGameState());
    const [p1, p2, p3, p4] = result.current.gameState.players;

    const dummyScores: Record<string, HandScore> = {
      [p1.id]: { ...DEFAULT_HAND_SCORE, totalPoints: 5 } as HandScore,
      [p2.id]: { ...DEFAULT_HAND_SCORE, totalPoints: 5 } as HandScore,
      [p3.id]: { ...DEFAULT_HAND_SCORE, totalPoints: 5 } as HandScore,
      [p4.id]: { ...DEFAULT_HAND_SCORE, totalPoints: 5 } as HandScore,
    };

    act(() => {
      result.current.addRound(dummyScores);
      result.current.addRound(dummyScores);
      result.current.addRound(dummyScores);
    });

    expect(result.current.gameState.rounds).toHaveLength(3);

    // Delete round 2
    act(() => {
      result.current.deleteRound(2);
    });

    expect(result.current.gameState.rounds).toHaveLength(2);
    expect(result.current.gameState.rounds[0].roundNumber).toBe(1);
    expect(result.current.gameState.rounds[1].roundNumber).toBe(2);
  });

  it('supports undoLastRound action', () => {
    const { result } = renderHook(() => useGameState());
    const [p1] = result.current.gameState.players;

    act(() => {
      result.current.undoLastRound();
    });
    expect(result.current.gameState.rounds).toHaveLength(0);

    act(() => {
      result.current.addRound({
        [p1.id]: { ...DEFAULT_HAND_SCORE, totalPoints: 20 } as HandScore,
      });
    });
    expect(result.current.gameState.rounds).toHaveLength(1);

    act(() => {
      result.current.undoLastRound();
    });
    expect(result.current.gameState.rounds).toHaveLength(0);
  });

  it('updates game setup without wiping existing rounds', () => {
    const { result } = renderHook(() => useGameState());
    const [p1] = result.current.gameState.players;

    act(() => {
      result.current.addRound({
        [p1.id]: { ...DEFAULT_HAND_SCORE, totalPoints: 10 } as HandScore,
      });
    });

    const updatedPlayers: Player[] = [
      { id: 'p1', name: 'Alice Super', color: 'purple' },
      { id: 'p2', name: 'Bob Wonder', color: 'orange' },
      { id: 'p5', name: 'Eve', color: 'cyan' },
    ];

    act(() => {
      result.current.updateGameSetup(updatedPlayers, {
        targetScore: 200,
        presetName: 'custom',
      });
    });

    expect(result.current.gameState.players).toHaveLength(3);
    expect(result.current.gameState.players[0].name).toBe('Alice Super');
    expect(result.current.gameState.config.targetScore).toBe(200);
    expect(result.current.gameState.rounds).toHaveLength(1);
  });

  it('starts a new game and enforces target score floor of 50', () => {
    const { result } = renderHook(() => useGameState());
    const [p1] = result.current.gameState.players;

    act(() => {
      result.current.addRound({
        [p1.id]: { ...DEFAULT_HAND_SCORE, totalPoints: 10 } as HandScore,
      });
    });

    act(() => {
      result.current.startNewGame(
        [
          { id: 'p10', name: 'Solo 1', color: 'red' },
          { id: 'p20', name: 'Solo 2', color: 'blue' },
        ],
        { targetScore: 25, presetName: 'custom' }
      );
    });

    expect(result.current.gameState.rounds).toHaveLength(0);
    expect(result.current.gameState.players).toHaveLength(2);
    expect(result.current.gameState.config.targetScore).toBe(50); // Enforces 50
  });

  it('automatically triggers game over when a player reaches targetScore, and picks lowest score as winner', () => {
    const { result } = renderHook(() => useGameState());
    const [p1, p2, p3, p4] = result.current.gameState.players;

    act(() => {
      result.current.updateGameSetup(result.current.gameState.players, {
        targetScore: 100,
        presetName: 'custom',
      });
    });

    act(() => {
      result.current.addRound({
        [p1.id]: { ...DEFAULT_HAND_SCORE, totalPoints: 15 } as HandScore,
        [p2.id]: { ...DEFAULT_HAND_SCORE, totalPoints: 40 } as HandScore,
        [p3.id]: { ...DEFAULT_HAND_SCORE, totalPoints: 60 } as HandScore,
        [p4.id]: { ...DEFAULT_HAND_SCORE, totalPoints: 105 } as HandScore, // Exceeds target 100!
      });
    });

    expect(result.current.gameState.isGameOver).toBe(true);
    // Winner is p1 with lowest score 15
    expect(result.current.gameState.winnerId).toBe(p1.id);

    // Continue game allows playing further
    act(() => {
      result.current.continueGame();
    });
    expect(result.current.gameState.isGameOver).toBe(false);
    expect(result.current.gameState.isContinued).toBe(true);

    // Conclude game ends it manually
    act(() => {
      result.current.concludeGame();
    });
    expect(result.current.gameState.isGameOver).toBe(true);
    expect(result.current.gameState.isContinued).toBe(false);
    expect(result.current.gameState.winnerId).toBe(p1.id);
  });

  it('resets current game and resets all data', () => {
    const { result } = renderHook(() => useGameState());
    const [p1] = result.current.gameState.players;

    act(() => {
      result.current.addRound({
        [p1.id]: { ...DEFAULT_HAND_SCORE, totalPoints: 200 } as HandScore,
      });
      result.current.setActiveRuleCardIds(['rule-1']);
    });

    expect(result.current.gameState.rounds).toHaveLength(1);
    expect(result.current.gameState.activeRuleCardIds).toEqual(['rule-1']);

    act(() => {
      result.current.resetCurrentGame();
    });

    expect(result.current.gameState.rounds).toHaveLength(0);
    expect(result.current.gameState.activeRuleCardIds).toEqual([]);
    expect(result.current.gameState.isGameOver).toBe(false);

    act(() => {
      result.current.resetAllData();
    });

    expect(result.current.gameState.players).toHaveLength(4);
    expect(result.current.gameState.config.targetScore).toBe(154);
  });

  it('exports and imports game state correctly', () => {
    const { result } = renderHook(() => useGameState());
    const [p1] = result.current.gameState.players;

    act(() => {
      result.current.addRound({
        [p1.id]: { ...DEFAULT_HAND_SCORE, totalPoints: 45 } as HandScore,
      });
    });

    const exported = result.current.exportGameState();
    expect(typeof exported).toBe('string');
    expect(exported).toContain('gameState');

    // Create fresh hook and import
    const { result: newHook } = renderHook(() => useGameState());

    let success = false;
    act(() => {
      success = newHook.current.importGameState(exported);
    });

    expect(success).toBe(true);
    expect(newHook.current.gameState.rounds).toHaveLength(1);
    expect(newHook.current.gameState.rounds[0].scores[p1.id].totalPoints).toBe(
      45
    );

    // Test corrupted json import with error suppressed
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    let failResult = true;
    act(() => {
      failResult = newHook.current.importGameState('invalid json');
    });
    expect(failResult).toBe(false);
    errorSpy.mockRestore();
  });
});
