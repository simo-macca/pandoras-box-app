import {
  GameState,
  GameConfig,
  Language,
  ThemeMode,
  Player,
  PlayerColor,
  RoundEntry,
  HandScore,
} from '@/types/game';

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
      roundLimit: null,
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

export const MIN_TARGET_SCORE = 50;

const VALID_COLORS: readonly PlayerColor[] = [
  'red',
  'blue',
  'green',
  'yellow',
  'purple',
  'orange',
  'white',
  'black',
  'cyan',
  'pink',
];
const VALID_PRESETS: readonly GameConfig['presetName'][] = [
  'short',
  'medium',
  'long',
  'custom',
];

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

const isFiniteNumber = (v: unknown): v is number =>
  typeof v === 'number' && Number.isFinite(v);

/**
 * Validates and normalises an untrusted game state (localStorage, JSON import,
 * undo snapshot). Returns `null` when the payload cannot be repaired, so that a
 * corrupted save never crashes the UI.
 */
export function sanitizeGameState(input: unknown): GameState | null {
  if (!isRecord(input) || !Array.isArray(input.players)) return null;
  if (!isRecord(input.config)) return null;

  const seenIds = new Set<string>();
  const players: Player[] = [];
  input.players.forEach((raw, idx) => {
    if (!isRecord(raw) || typeof raw.id !== 'string' || !raw.id) return;
    if (seenIds.has(raw.id)) return;
    seenIds.add(raw.id);
    const name =
      typeof raw.name === 'string' && raw.name.trim()
        ? raw.name.trim()
        : `Player ${idx + 1}`;
    const color = VALID_COLORS.includes(raw.color as PlayerColor)
      ? (raw.color as PlayerColor)
      : VALID_COLORS[idx % VALID_COLORS.length];
    players.push({ id: raw.id, name, color });
  });
  if (players.length === 0) return null;

  const rawTarget = input.config.targetScore;
  const targetScore = isFiniteNumber(rawTarget)
    ? Math.max(MIN_TARGET_SCORE, Math.round(rawTarget))
    : 154;
  const presetName = VALID_PRESETS.includes(
    input.config.presetName as GameConfig['presetName']
  )
    ? (input.config.presetName as GameConfig['presetName'])
    : 'custom';
  const rawLimit = input.config.roundLimit;
  const roundLimit =
    isFiniteNumber(rawLimit) && rawLimit > 0 ? Math.round(rawLimit) : null;

  const rounds: RoundEntry[] = [];
  if (Array.isArray(input.rounds)) {
    input.rounds.forEach((raw) => {
      if (!isRecord(raw) || !isRecord(raw.scores)) return;
      const scores: Record<string, HandScore> = {};
      Object.entries(raw.scores).forEach(([playerId, score]) => {
        if (isRecord(score) && isFiniteNumber(score.totalPoints)) {
          scores[playerId] = {
            ...(score as unknown as HandScore),
            isWinner: Boolean(score.isWinner),
          };
        }
      });
      rounds.push({
        ...(raw as unknown as RoundEntry),
        roundNumber: isFiniteNumber(raw.roundNumber) ? raw.roundNumber : 0,
        timestamp: isFiniteNumber(raw.timestamp) ? raw.timestamp : Date.now(),
        scores,
      });
    });
  }

  const activeRuleCardIds = Array.isArray(input.activeRuleCardIds)
    ? input.activeRuleCardIds.filter(
        (id): id is string => typeof id === 'string'
      )
    : [];

  return {
    players,
    config: { targetScore, presetName, roundLimit },
    rounds,
    activeRuleCardIds,
    isGameStarted: true,
    isGameOver: Boolean(input.isGameOver),
    winnerId: typeof input.winnerId === 'string' ? input.winnerId : null,
    isContinued: Boolean(input.isContinued),
  };
}

export function loadSavedGameState(): GameState {
  if (typeof window === 'undefined') return getInitialGameState();
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.GAME_STATE);
    if (stored) {
      const sanitized = sanitizeGameState(JSON.parse(stored));
      if (sanitized) return sanitized;
      console.warn('Saved game state is invalid; starting a fresh match.');
    }
  } catch (err) {
    console.warn('Failed to parse saved game state from localStorage:', err);
  }
  return getInitialGameState();
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
