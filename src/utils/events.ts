import {
  HandScore,
  Player,
  RoundEntry,
  SeppukuEventMetadata,
  SeppukuOutcome,
} from '@/types/game';
import { SEPPUKU_POINTS } from '@/utils/scoring';
import { calculatePlayerStats, countPlayedRounds } from '@/utils/stats';

/**
 * Pure builders for the score-changing events that are recorded as their own
 * entries in the round history (Identity Theft, Seppuku, late joiners).
 * They never touch React state, so they can be unit-tested in isolation.
 */

export interface IdentityTheftPair {
  low: Player;
  high: Player;
  lowScore: number;
  highScore: number;
}

/**
 * Identity Theft (rulebook p. 14): the person with the highest score swaps
 * their score with the person with the lowest score. Ties go to the first
 * qualifying person in the order of play (p. 12) — the app uses the order of
 * the player list. Returns `null` when nothing can be swapped.
 */
export function findIdentityTheftPair(
  players: Player[],
  rounds: RoundEntry[]
): IdentityTheftPair | null {
  if (players.length < 2) return null;

  // The target score does not influence totals; any positive value works.
  const stats = calculatePlayerStats(players, rounds, 1);
  const scoreById = new Map(stats.map((s) => [s.id, s.totalScore]));
  const scores = stats.map((s) => s.totalScore);
  const lowScore = Math.min(...scores);
  const highScore = Math.max(...scores);
  if (lowScore === highScore) return null;

  const low = players.find((p) => scoreById.get(p.id) === lowScore);
  const high = players.find((p) => scoreById.get(p.id) === highScore);
  if (!low || !high || low.id === high.id) return null;

  return { low, high, lowScore, highScore };
}

export function createIdentityTheftEntry(
  pair: IdentityTheftPair,
  players: Player[],
  rounds: RoundEntry[],
  timestamp: number = Date.now()
): RoundEntry {
  const { low, high, lowScore, highScore } = pair;
  const scores: Record<string, HandScore> = {};
  players.forEach((p) => {
    let delta = 0;
    if (p.id === low.id) delta = highScore - lowScore;
    else if (p.id === high.id) delta = lowScore - highScore;
    scores[p.id] = { isWinner: false, totalPoints: delta };
  });

  return {
    id: `event-identity-theft-${timestamp}`,
    roundNumber: countPlayedRounds(rounds),
    timestamp,
    isEvent: true,
    eventType: 'identity-theft',
    scores,
    notes: `Identity Theft: ${low.name} (${lowScore} pts) ⇄ ${high.name} (${highScore} pts)`,
    eventMetadata: {
      lowPlayerId: low.id,
      highPlayerId: high.id,
      lowPlayerName: low.name,
      highPlayerName: high.name,
      lowScoreBefore: lowScore,
      highScoreBefore: highScore,
    },
  };
}

export interface SeppukuResult {
  scores: Record<string, HandScore>;
  metadata: SeppukuEventMetadata;
}

/**
 * Seppuku (rulebook p. 16): number card −21, any other card +42, refusing +21.
 * Players without an explicit choice are treated as refusing.
 */
export function buildSeppukuResult(
  players: Player[],
  choices: Record<string, SeppukuOutcome>
): SeppukuResult {
  const scores: Record<string, HandScore> = {};
  const metadata: SeppukuEventMetadata = { choices: {} };

  players.forEach((p) => {
    const outcome = choices[p.id] || 'no_risk';
    const points = SEPPUKU_POINTS[outcome];
    scores[p.id] = { isWinner: false, totalPoints: points };
    metadata.choices[p.id] = { playerName: p.name, outcome, points };
  });

  return { scores, metadata };
}

export const SEPPUKU_NOTE = 'Seppuku: Point adjustments applied';

export function createSeppukuEntry(
  result: SeppukuResult,
  rounds: RoundEntry[],
  timestamp: number = Date.now()
): RoundEntry {
  return {
    id: `event-seppuku-${timestamp}`,
    roundNumber: countPlayedRounds(rounds),
    timestamp,
    isEvent: true,
    eventType: 'seppuku',
    scores: result.scores,
    notes: SEPPUKU_NOTE,
    eventMetadata: result.metadata,
  };
}

/**
 * House rule (not in the official rulebook): a player who joins a running
 * match starts at the highest current score + 1.
 */
export function createLateJoinerEntries(
  previousPlayers: Player[],
  rounds: RoundEntry[],
  joiners: Player[],
  timestamp: number = Date.now()
): RoundEntry[] {
  if (joiners.length === 0 || rounds.length === 0) return [];

  const stats = calculatePlayerStats(previousPlayers, rounds, 1);
  const highestScoreBefore =
    stats.length > 0 ? Math.max(...stats.map((s) => s.totalScore)) : 0;
  const startingScore = highestScoreBefore + 1;
  const roundNumber = countPlayedRounds(rounds);

  return joiners.map((player, idx) => ({
    id: `event-late-joiner-${player.id}-${timestamp + idx}`,
    roundNumber,
    timestamp: timestamp + idx,
    isEvent: true,
    eventType: 'late-joiner',
    scores: {
      [player.id]: { isWinner: false, totalPoints: startingScore },
    },
    notes: `Late Joiner: ${player.name} joined with starting score of ${startingScore} pts`,
    eventMetadata: {
      playerId: player.id,
      playerName: player.name,
      startingScore,
      highestScoreBefore,
    },
  }));
}

/**
 * Renumbers rounds after a deletion. Played rounds are numbered 1..n; event
 * entries are anchored to the number of played rounds before them.
 */
export function renumberRounds(rounds: RoundEntry[]): RoundEntry[] {
  let played = 0;
  return rounds.map((r) => {
    if (r.isEvent) {
      return r.roundNumber === played ? r : { ...r, roundNumber: played };
    }
    played += 1;
    return r.roundNumber === played ? r : { ...r, roundNumber: played };
  });
}
