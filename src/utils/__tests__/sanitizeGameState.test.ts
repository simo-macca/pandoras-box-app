import { describe, it, expect, beforeEach } from 'vitest';
import {
  sanitizeGameState,
  loadSavedGameState,
  STORAGE_KEYS,
  MIN_TARGET_SCORE,
} from '../storage';
import { isOverScoreLimit, calculatePlayerStats } from '../stats';

describe('sanitizeGameState', () => {
  it('rejects payloads that are not game states', () => {
    expect(sanitizeGameState(null)).toBeNull();
    expect(sanitizeGameState('hello')).toBeNull();
    expect(sanitizeGameState({ players: 'x', config: {} })).toBeNull();
    expect(sanitizeGameState({ players: [], config: {} })).toBeNull();
    expect(sanitizeGameState({ players: [{ id: 'p1' }] })).toBeNull();
  });

  it('repairs players, config and rounds instead of crashing', () => {
    const state = sanitizeGameState({
      players: [
        { id: 'p1', name: '  Alice ', color: 'red' },
        { id: 'p1', name: 'Duplicate', color: 'blue' },
        { id: 'p2', name: '', color: 'not-a-colour' },
        { name: 'No id' },
      ],
      config: { targetScore: 10, presetName: 'weird', roundLimit: -3 },
      rounds: [
        { roundNumber: 1, timestamp: 1, scores: { p1: { totalPoints: 5 } } },
        { roundNumber: 2, timestamp: 2 },
        { roundNumber: 3, scores: { p2: { totalPoints: 'NaN' } } },
      ],
      activeRuleCardIds: ['fantastic-six', 42],
    });

    expect(state).not.toBeNull();
    expect(state!.players).toHaveLength(2);
    expect(state!.players[0].name).toBe('Alice');
    expect(state!.players[1].name).toBe('Player 3');
    expect(state!.config.targetScore).toBe(MIN_TARGET_SCORE);
    expect(state!.config.presetName).toBe('custom');
    expect(state!.config.roundLimit).toBeNull();
    expect(state!.rounds).toHaveLength(2);
    expect(state!.rounds[1].scores).toEqual({});
    expect(state!.activeRuleCardIds).toEqual(['fantastic-six']);
    expect(() =>
      calculatePlayerStats(state!.players, state!.rounds, 154)
    ).not.toThrow();
  });
});

describe('loadSavedGameState with corrupted storage', () => {
  beforeEach(() => localStorage.clear());

  it('falls back to a fresh game when the saved state is structurally invalid', () => {
    localStorage.setItem(
      STORAGE_KEYS.GAME_STATE,
      JSON.stringify({ players: null })
    );
    const state = loadSavedGameState();
    expect(state.players.length).toBeGreaterThan(0);
    expect(state.rounds).toEqual([]);
  });
});

describe('isOverScoreLimit (official end-of-game rule)', () => {
  it('ends the game only when the limit is exceeded, not when reached', () => {
    expect(isOverScoreLimit(153, 154)).toBe(false);
    expect(isOverScoreLimit(154, 154)).toBe(false);
    expect(isOverScoreLimit(155, 154)).toBe(true);
  });
});
