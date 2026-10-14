import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  STORAGE_KEYS,
  INITIAL_PLAYERS,
  INITIAL_STATE,
  getInitialGameState,
  loadSavedGameState,
  saveGameStateToStorage,
  loadSavedLanguage,
  saveLanguageToStorage,
  loadSavedTheme,
  saveThemeToStorage,
} from '../storage';
import { GameState } from '../../types/game';

describe('storage utils', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  describe('game state persistence', () => {
    it('returns default initial state when storage is empty', () => {
      const state = loadSavedGameState();
      expect(state).toEqual(INITIAL_STATE);
      expect(state.players).toHaveLength(4);
      expect(state.config.targetScore).toBe(154);
      expect(state.rounds).toEqual([]);
    });

    it('generates a fresh initial state via getInitialGameState', () => {
      const state1 = getInitialGameState();
      const state2 = getInitialGameState();
      expect(state1).toEqual(state2);
      expect(state1.players).toEqual(INITIAL_PLAYERS);
    });

    it('saves and loads game state successfully', () => {
      const customState: GameState = {
        ...INITIAL_STATE,
        config: { targetScore: 180, presetName: 'custom' },
        players: [{ id: 'p1', name: 'Tester', color: 'purple' }],
      };

      saveGameStateToStorage(customState);
      const loaded = loadSavedGameState();

      expect(loaded.config.targetScore).toBe(180);
      expect(loaded.players[0].name).toBe('Tester');
      expect(loaded.players[0].color).toBe('purple');
    });

    it('enforces minimum target score of 50 if saved score is below threshold', () => {
      const stateWithLowScore = {
        ...INITIAL_STATE,
        config: { targetScore: 30, presetName: 'custom' },
      };
      localStorage.setItem(
        STORAGE_KEYS.GAME_STATE,
        JSON.stringify(stateWithLowScore)
      );

      const loaded = loadSavedGameState();
      expect(loaded.config.targetScore).toBe(50);
    });

    it('handles corrupted JSON in localStorage gracefully without crashing', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      localStorage.setItem(STORAGE_KEYS.GAME_STATE, 'invalid-json{{');

      const loaded = loadSavedGameState();
      expect(loaded).toEqual(INITIAL_STATE);
      expect(warnSpy).toHaveBeenCalled();
    });
  });

  describe('language persistence', () => {
    it('defaults to English (en) when no preference is saved', () => {
      expect(loadSavedLanguage()).toBe('en');
    });

    it('saves and loads supported languages', () => {
      saveLanguageToStorage('de');
      expect(loadSavedLanguage()).toBe('de');

      saveLanguageToStorage('it');
      expect(loadSavedLanguage()).toBe('it');

      saveLanguageToStorage('fr');
      expect(loadSavedLanguage()).toBe('fr');
    });

    it('ignores unsupported or invalid language strings', () => {
      localStorage.setItem(STORAGE_KEYS.LANGUAGE, 'es_ES');
      expect(loadSavedLanguage()).toBe('en');
    });
  });

  describe('theme persistence', () => {
    it('defaults to system when no theme is saved', () => {
      expect(loadSavedTheme()).toBe('system');
    });

    it('saves and loads theme modes', () => {
      saveThemeToStorage('dark');
      expect(loadSavedTheme()).toBe('dark');

      saveThemeToStorage('light');
      expect(loadSavedTheme()).toBe('light');

      saveThemeToStorage('system');
      expect(loadSavedTheme()).toBe('system');
    });

    it('ignores unsupported theme values', () => {
      localStorage.setItem(STORAGE_KEYS.THEME, 'sepia');
      expect(loadSavedTheme()).toBe('system');
    });
  });
});
