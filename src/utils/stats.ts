import { GameConfig, GameState, Player, RoundEntry } from '@/types/game';

export interface PlayerStats extends Player {
  totalScore: number;
  rank: number;
  isLeader: boolean;
  isInDanger: boolean;
  isEliminated: boolean;
  progressPct: number;
  pointsRemaining: number;
  roundsWonCount: number;
}

export const DANGER_THRESHOLD_RATIO = 0.8;

/**
 * Official Rulefactory rule: "Rounds are played until someone exceeds the set
 * point limit." Reaching the limit exactly does not end the game.
 */
export function isOverScoreLimit(score: number, targetScore: number): boolean {
  return score > targetScore;
}

export function calculatePlayerStats(
  players: Player[],
  rounds: RoundEntry[],
  targetScore: number
): PlayerStats[] {
  const totals: Record<string, { score: number; wins: number }> = {};
  players.forEach((p) => {
    totals[p.id] = { score: 0, wins: 0 };
  });

  rounds.forEach((round) => {
    players.forEach((p) => {
      const roundScore = round.scores[p.id];
      if (roundScore) {
        totals[p.id].score += roundScore.totalPoints;
        if (roundScore.isWinner) {
          totals[p.id].wins += 1;
        }
      }
    });
  });

  // In Frantic, lower score is better!
  const stats: PlayerStats[] = players.map((p) => {
    const totalScore = totals[p.id]?.score || 0;
    const wins = totals[p.id]?.wins || 0;
    const safeTarget = targetScore > 0 ? targetScore : 1;
    const progressPct = Math.max(
      0,
      Math.min(100, Math.round((totalScore / safeTarget) * 100))
    );
    const pointsRemaining = Math.max(0, targetScore - totalScore);
    // Official rule: the game ends when someone EXCEEDS the point limit.
    const isEliminated = isOverScoreLimit(totalScore, targetScore);
    const isInDanger =
      totalScore >= targetScore * DANGER_THRESHOLD_RATIO && !isEliminated;

    return {
      ...p,
      totalScore,
      rank: 1,
      isLeader: false,
      isInDanger,
      isEliminated,
      progressPct,
      pointsRemaining,
      roundsWonCount: wins,
    };
  });

  stats.sort((a, b) => a.totalScore - b.totalScore);

  stats.forEach((s, idx) => {
    s.rank = idx + 1;
    s.isLeader = idx === 0;
  });

  return stats;
}

/** Number of played rounds (event entries such as Seppuku are not rounds). */
export function countPlayedRounds(rounds: RoundEntry[]): number {
  return rounds.filter((r) => !r.isEvent).length;
}

/** House rule: an optional maximum number of rounds. */
export function isRoundLimitReached(
  rounds: RoundEntry[],
  roundLimit: GameConfig['roundLimit']
): boolean {
  return Boolean(
    roundLimit && roundLimit > 0 && countPlayedRounds(rounds) >= roundLimit
  );
}

export type GameOverUpdate = Pick<
  GameState,
  'isGameOver' | 'isContinued' | 'winnerId'
>;

/**
 * Works out whether the game-over flags must change after the history or the
 * configuration changed. Returns `null` when the state is already consistent.
 *
 * - The game is over when someone exceeds the point limit (official rule) or
 *   the optional round limit is reached (house rule).
 * - A match the players chose to continue stays open until it is concluded
 *   manually.
 * - The winner is always the player with the lowest score.
 */
export function getGameOverUpdate(
  state: GameState,
  stats: PlayerStats[]
): Partial<GameOverUpdate> | null {
  const isOver =
    state.rounds.length > 0 &&
    (stats.some((p) =>
      isOverScoreLimit(p.totalScore, state.config.targetScore)
    ) ||
      isRoundLimitReached(state.rounds, state.config.roundLimit));
  const leaderId = stats[0]?.id ?? null;

  if (!isOver) {
    return state.isGameOver || state.isContinued
      ? { isGameOver: false, isContinued: false, winnerId: null }
      : null;
  }
  if (!state.isGameOver && !state.isContinued) {
    return { isGameOver: true, winnerId: leaderId };
  }
  if (state.isGameOver && state.winnerId !== leaderId) {
    return { winnerId: leaderId };
  }
  return null;
}
