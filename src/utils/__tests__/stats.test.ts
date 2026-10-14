import { describe, it, expect } from 'vitest';
import { calculatePlayerStats, DANGER_THRESHOLD_RATIO } from '../stats';
import { Player, RoundEntry, HandScore } from '../../types/game';
import { DEFAULT_HAND_SCORE } from '../scoring';

describe('stats utils', () => {
  const players: Player[] = [
    { id: 'p1', name: 'Alice', color: 'red' },
    { id: 'p2', name: 'Bob', color: 'blue' },
    { id: 'p3', name: 'Charlie', color: 'green' },
  ];

  const targetScore = 100;

  it('calculates initial stats with empty rounds', () => {
    const stats = calculatePlayerStats(players, [], targetScore);
    expect(stats).toHaveLength(3);
    stats.forEach((s) => {
      expect(s.totalScore).toBe(0);
      expect(s.roundsWonCount).toBe(0);
      expect(s.progressPct).toBe(0);
      expect(s.pointsRemaining).toBe(targetScore);
      expect(s.isInDanger).toBe(false);
      expect(s.isEliminated).toBe(false);
    });

    // In a tie at 0, first player in sorted array is assigned rank 1 and isLeader = true
    expect(stats[0].rank).toBe(1);
    expect(stats[0].isLeader).toBe(true);
  });

  it('accumulates round scores and correctly assigns ranks (lowest score is 1st)', () => {
    const rounds: RoundEntry[] = [
      {
        roundNumber: 1,
        timestamp: 1000,
        activeRuleCardId: null,
        scores: {
          p1: {
            ...DEFAULT_HAND_SCORE,
            totalPoints: 0,
            isWinner: true,
          } as HandScore,
          p2: { ...DEFAULT_HAND_SCORE, totalPoints: 20 } as HandScore,
          p3: { ...DEFAULT_HAND_SCORE, totalPoints: 40 } as HandScore,
        },
      },
      {
        roundNumber: 2,
        timestamp: 2000,
        activeRuleCardId: null,
        scores: {
          p1: { ...DEFAULT_HAND_SCORE, totalPoints: 10 } as HandScore,
          p2: {
            ...DEFAULT_HAND_SCORE,
            totalPoints: 0,
            isWinner: true,
          } as HandScore,
          p3: { ...DEFAULT_HAND_SCORE, totalPoints: 30 } as HandScore,
        },
      },
    ];

    const stats = calculatePlayerStats(players, rounds, targetScore);

    // p1: 0 + 10 = 10, 1 win -> rank 1
    // p2: 20 + 0 = 20, 1 win -> rank 2
    // p3: 40 + 30 = 70, 0 wins -> rank 3
    expect(stats[0].id).toBe('p1');
    expect(stats[0].totalScore).toBe(10);
    expect(stats[0].rank).toBe(1);
    expect(stats[0].isLeader).toBe(true);
    expect(stats[0].roundsWonCount).toBe(1);
    expect(stats[0].progressPct).toBe(10);
    expect(stats[0].pointsRemaining).toBe(90);

    expect(stats[1].id).toBe('p2');
    expect(stats[1].totalScore).toBe(20);
    expect(stats[1].rank).toBe(2);
    expect(stats[1].isLeader).toBe(false);
    expect(stats[1].roundsWonCount).toBe(1);

    expect(stats[2].id).toBe('p3');
    expect(stats[2].totalScore).toBe(70);
    expect(stats[2].rank).toBe(3);
    expect(stats[2].isLeader).toBe(false);
    expect(stats[2].roundsWonCount).toBe(0);
  });

  it('identifies danger zone and elimination status based on threshold', () => {
    expect(DANGER_THRESHOLD_RATIO).toBe(0.8);

    const rounds: RoundEntry[] = [
      {
        roundNumber: 1,
        timestamp: 1000,
        activeRuleCardId: null,
        scores: {
          p1: { ...DEFAULT_HAND_SCORE, totalPoints: 79 } as HandScore, // below 80 -> not in danger
          p2: { ...DEFAULT_HAND_SCORE, totalPoints: 85 } as HandScore, // >= 80, < 100 -> in danger
          p3: { ...DEFAULT_HAND_SCORE, totalPoints: 105 } as HandScore, // >= 100 -> eliminated
        },
      },
    ];

    const stats = calculatePlayerStats(players, rounds, targetScore);

    const p1Stats = stats.find((s) => s.id === 'p1')!;
    expect(p1Stats.isInDanger).toBe(false);
    expect(p1Stats.isEliminated).toBe(false);

    const p2Stats = stats.find((s) => s.id === 'p2')!;
    expect(p2Stats.isInDanger).toBe(true);
    expect(p2Stats.isEliminated).toBe(false);
    expect(p2Stats.progressPct).toBe(85);

    const p3Stats = stats.find((s) => s.id === 'p3')!;
    expect(p3Stats.isInDanger).toBe(false); // once eliminated, isInDanger is false
    expect(p3Stats.isEliminated).toBe(true);
    expect(p3Stats.progressPct).toBe(100); // capped at 100
    expect(p3Stats.pointsRemaining).toBe(0); // clamped at 0
  });
});
