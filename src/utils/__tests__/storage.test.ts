import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  STORAGE_KEYS,
  VERSIONED_KEY_PREFIXES,
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
import { GameState } from '@/types/game';
import { APP_VERSION } from '@/data/appInfo';

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

  describe('versioned keys and migration', () => {
    it('names the keys after the current app version', () => {
      expect(STORAGE_KEYS.GAME_STATE).toBe(
        `frantic_game_state_v${APP_VERSION}`
      );
      expect(STORAGE_KEYS.LANGUAGE).toBe(`frantic_lang_v${APP_VERSION}`);
      expect(STORAGE_KEYS.THEME).toBe('frantic_theme_mode');
    });

    it('migrates a match saved under the legacy v2 key and removes it', () => {
      const legacy = {
        ...INITIAL_STATE,
        config: {
          ...INITIAL_STATE.config,
          targetScore: 179,
          presetName: 'long',
        },
      };
      localStorage.setItem('frantic_game_state_v2', JSON.stringify(legacy));

      const loaded = loadSavedGameState();

      expect(loaded.config.targetScore).toBe(179);
      expect(localStorage.getItem(STORAGE_KEYS.GAME_STATE)).not.toBeNull();
      expect(localStorage.getItem('frantic_game_state_v2')).toBeNull();
    });

    it('prefers the newest older version when several exist', () => {
      localStorage.setItem(`${VERSIONED_KEY_PREFIXES.LANGUAGE}2`, 'de');
      localStorage.setItem(`${VERSIONED_KEY_PREFIXES.LANGUAGE}0.9.0`, 'it');
      localStorage.setItem(`${VERSIONED_KEY_PREFIXES.LANGUAGE}0.10.0`, 'fr');

      expect(loadSavedLanguage()).toBe('fr');
      expect(localStorage.getItem(STORAGE_KEYS.LANGUAGE)).toBe('fr');
      expect(
        Object.keys(localStorage).filter((k) =>
          k.startsWith(VERSIONED_KEY_PREFIXES.LANGUAGE)
        )
      ).toEqual([STORAGE_KEYS.LANGUAGE]);
    });

    it('keeps the current key when it already exists', () => {
      localStorage.setItem(STORAGE_KEYS.LANGUAGE, 'it');
      localStorage.setItem('frantic_lang_v2', 'de');

      expect(loadSavedLanguage()).toBe('it');
    });
  });
});
