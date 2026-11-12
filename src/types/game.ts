export type PlayerColor =
  | 'red'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'purple'
  | 'orange'
  | 'white'
  | 'black'
  | 'cyan'
  | 'pink';

export type Language = 'en' | 'de' | 'it' | 'fr';

export type ThemeMode = 'light' | 'dark' | 'system';

export type TimeBombModifier =
  'none' | 'winner_bonus' | 'loser_penalty' | 'expired_double';

export interface Player {
  id: string;
  name: string;
  color: PlayerColor;
}

export interface HandScore {
  isWinner: boolean;
  numberCards?: Record<number, number>;
  specialCardsCount?: number;
  curseCount?: number;
  theEndCount?: number;
  fuckYouCount?: number;
  mimicryCount?: number;
  isDoomsday?: boolean;
  timeBombModifier?: TimeBombModifier;
  customModifier?: number;
  /** Pandora's Box rule card "Double Special": all special cards count double. */
  doubleSpecials?: boolean;
  totalPoints: number;
}

export interface IdentityTheftEventMetadata {
  lowPlayerId: string;
  highPlayerId: string;
  lowPlayerName: string;
  highPlayerName: string;
  lowScoreBefore: number;
  highScoreBefore: number;
}

export type SeppukuOutcome = 'risk_number' | 'risk_special' | 'no_risk';

export interface SeppukuEventMetadata {
  choices: Record<
    string,
    {
      playerName: string;
      outcome: SeppukuOutcome;
      points: number;
    }
  >;
}

export interface LateJoinerEventMetadata {
  playerId: string;
  playerName: string;
  startingScore: number;
  highestScoreBefore: number;
}

export interface RoundEntry {
  id?: string;
  roundNumber: number;
  timestamp: number;
  activeRuleCardId?: string | null;
  activeRuleCardIds?: string[];
  scores: Record<string, HandScore>;
  notes?: string;
  isEvent?: boolean;
  eventType?: 'identity-theft' | 'seppuku' | 'late-joiner' | string;
  eventMetadata?:
    | IdentityTheftEventMetadata
    | SeppukuEventMetadata
    | LateJoinerEventMetadata
    | Record<string, any>;
}

export interface GameConfig {
  targetScore: number;
  presetName: 'short' | 'medium' | 'long' | 'custom';
  roundLimit?: number | null;
}

export interface GameState {
  players: Player[];
  config: GameConfig;
  rounds: RoundEntry[];
  activeRuleCardIds?: string[];
  isGameStarted: boolean;
  isGameOver: boolean;
  winnerId: string | null;
  isContinued?: boolean;
}
