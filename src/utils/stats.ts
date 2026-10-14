import { Player, RoundEntry } from '../types/game';

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
    const progressPct = Math.min(
      100,
      Math.round((totalScore / targetScore) * 100)
    );
    const pointsRemaining = Math.max(0, targetScore - totalScore);
    const isEliminated = totalScore >= targetScore;
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
