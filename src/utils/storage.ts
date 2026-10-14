import { GameState, Language, ThemeMode, Player } from '../types/game';

export const STORAGE_KEYS = {
  GAME_STATE: 'frantic_game_state_v2',
  LANGUAGE: 'frantic_lang_v2',
  THEME: 'frantic_theme_mode',
} as const;

export const INITIAL_PLAYERS: Player[] = [
  { id: 'p1', name: 'Player 1', color: 'red' },
  { id: 'p2', name: 'Player 2', color: 'blue' },
  { id: 'p3', name: 'Player 3', color: 'green' },
  { id: 'p4', name: 'Player 4', color: 'yellow' },
];

export function getInitialGameState(): GameState {
  return {
    players: [
      { id: 'p1', name: 'Player 1', color: 'red' },
      { id: 'p2', name: 'Player 2', color: 'blue' },
      { id: 'p3', name: 'Player 3', color: 'green' },
      { id: 'p4', name: 'Player 4', color: 'yellow' },
    ],
    config: {
      targetScore: 154,
      presetName: 'medium',
    },
    rounds: [],
    activeRuleCardIds: [],
    isGameStarted: true,
    isGameOver: false,
    winnerId: null,
    isContinued: false,
  };
}

export const INITIAL_STATE: GameState = getInitialGameState();

export function loadSavedGameState(): GameState {
  if (typeof window === 'undefined') return INITIAL_STATE;
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.GAME_STATE);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed?.config?.targetScore && parsed.config.targetScore < 50) {
        parsed.config.targetScore = 50;
      }
      return parsed;
    }
  } catch (err) {
    console.warn('Failed to parse saved game state from localStorage:', err);
  }
  return INITIAL_STATE;
}

export function saveGameStateToStorage(gameState: GameState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.GAME_STATE, JSON.stringify(gameState));
  } catch (err) {
    console.error('Failed to save game state to localStorage:', err);
  }
}

export function loadSavedLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.LANGUAGE) as Language;
    if (stored && ['en', 'de', 'it', 'fr'].includes(stored)) {
      return stored;
    }
  } catch {
    // fallback
  }
  return 'en';
}

export function saveLanguageToStorage(lang: Language): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
  } catch (err) {
    console.error('Failed to save language preference:', err);
  }
}

export function loadSavedTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'system';
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME) as ThemeMode | null;
    if (
      saved &&
      (saved === 'system' || saved === 'light' || saved === 'dark')
    ) {
      return saved;
    }
  } catch {
    // fallback
  }
  return 'system';
}

export function saveThemeToStorage(theme: ThemeMode): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch {
    // ignore localStorage quota errors
  }
}
