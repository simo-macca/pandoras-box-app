import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RoundHistoryTable } from '../RoundHistoryTable';
import { Player, RoundEntry, HandScore } from '../../../types/game';
import { DEFAULT_HAND_SCORE } from '../../../utils/scoring';

describe('RoundHistoryTable component', () => {
  const players: Player[] = [
    { id: 'p1', name: 'Alice', color: 'red' },
    { id: 'p2', name: 'Bob', color: 'blue' },
  ];

  const defaultProps = {
    rounds: [] as RoundEntry[],
    players,
    onUndoLastRound: vi.fn(),
    onEditRound: vi.fn(),
    onDeleteRound: vi.fn(),
    language: 'en' as const,
  };

  it('renders empty state when no rounds exist', () => {
    render(<RoundHistoryTable {...defaultProps} rounds={[]} />);

    expect(screen.getByText(/no rounds played yet/i)).toBeInTheDocument();
  });

  it('renders rounds with player scores and round numbers', () => {
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
          p2: { ...DEFAULT_HAND_SCORE, totalPoints: 25 } as HandScore,
        },
      },
      {
        roundNumber: 2,
        timestamp: 2000,
        activeRuleCardId: null,
        scores: {
          p1: { ...DEFAULT_HAND_SCORE, totalPoints: 30 } as HandScore,
          p2: {
            ...DEFAULT_HAND_SCORE,
            totalPoints: 5,
            isWinner: true,
          } as HandScore,
        },
      },
    ];

    render(<RoundHistoryTable {...defaultProps} rounds={rounds} />);

    expect(screen.getByText('Round 1')).toBeInTheDocument();
    expect(screen.getByText('Round 2')).toBeInTheDocument();
    expect(screen.getAllByText('Alice').length).toBe(2);
    expect(screen.getAllByText('Bob').length).toBe(2);
  });

  it('calls onUndoLastRound when undo button is clicked', async () => {
    const user = userEvent.setup();
    const onUndoLastRound = vi.fn();
    const rounds: RoundEntry[] = [
      {
        roundNumber: 1,
        timestamp: 1000,
        activeRuleCardId: null,
        scores: {
          p1: { ...DEFAULT_HAND_SCORE, totalPoints: 0 } as HandScore,
          p2: { ...DEFAULT_HAND_SCORE, totalPoints: 10 } as HandScore,
        },
      },
    ];

    render(
      <RoundHistoryTable
        {...defaultProps}
        rounds={rounds}
        onUndoLastRound={onUndoLastRound}
      />
    );

    const undoBtn = screen.getByTitle(
      'Revert the scores of the most recent round'
    );
    await user.click(undoBtn);

    expect(onUndoLastRound).toHaveBeenCalled();
  });

  it('calls onEditRound when clicking the edit button for a round', async () => {
    const user = userEvent.setup();
    const onEditRound = vi.fn();
    const rounds: RoundEntry[] = [
      {
        roundNumber: 1,
        timestamp: 1000,
        activeRuleCardId: null,
        scores: {
          p1: { ...DEFAULT_HAND_SCORE, totalPoints: 0 } as HandScore,
        },
      },
    ];

    render(
      <RoundHistoryTable
        {...defaultProps}
        rounds={rounds}
        onEditRound={onEditRound}
      />
    );

    const editBtn = screen.getByTitle(/edit round/i);
    await user.click(editBtn);

    expect(onEditRound).toHaveBeenCalledWith(1);
  });

  it('triggers delete confirmation and calls onDeleteRound upon confirmation', async () => {
    const user = userEvent.setup();
    const onDeleteRound = vi.fn();
    const rounds: RoundEntry[] = [
      {
        roundNumber: 1,
        timestamp: 1000,
        activeRuleCardId: null,
        scores: {
          p1: { ...DEFAULT_HAND_SCORE, totalPoints: 0 } as HandScore,
        },
      },
    ];

    render(
      <RoundHistoryTable
        {...defaultProps}
        rounds={rounds}
        onDeleteRound={onDeleteRound}
      />
    );

    const deleteBtn = screen.getByTitle(/delete round/i);
    await user.click(deleteBtn);

    // Confirmation button should appear
    const confirmBtn = screen.getByRole('button', { name: /confirm/i });
    expect(confirmBtn).toBeInTheDocument();

    await user.click(confirmBtn);
    expect(onDeleteRound).toHaveBeenCalledWith(1);
  });

  it('renders Identity Theft event entries without edit button and with event badge', () => {
    const rounds: RoundEntry[] = [
      {
        roundNumber: 1,
        timestamp: 1000,
        activeRuleCardId: null,
        scores: {
          p1: { ...DEFAULT_HAND_SCORE, totalPoints: 10 } as HandScore,
          p2: { ...DEFAULT_HAND_SCORE, totalPoints: 30 } as HandScore,
        },
      },
      {
        id: 'event-1',
        roundNumber: 1,
        timestamp: 2000,
        isEvent: true,
        eventType: 'identity-theft',
        eventMetadata: {
          lowPlayerId: 'p1',
          highPlayerId: 'p2',
          lowPlayerName: 'Alice',
          highPlayerName: 'Bob',
          lowScoreBefore: 10,
          highScoreBefore: 30,
        },
        scores: {
          p1: { ...DEFAULT_HAND_SCORE, totalPoints: 20 } as HandScore,
          p2: { ...DEFAULT_HAND_SCORE, totalPoints: -20 } as HandScore,
        },
      },
    ];

    render(<RoundHistoryTable {...defaultProps} rounds={rounds} />);

    // Header round count should only count actual rounds (1)
    expect(screen.getByText('1')).toBeInTheDocument();

    // Event badge should be displayed
    expect(screen.getByText(/identity theft/i)).toBeInTheDocument();

    // Swapped indicator
    expect(screen.getAllByText(/swapped/i).length).toBeGreaterThanOrEqual(1);

    // Only 1 edit button should exist (for round 1, not for event)
    const editButtons = screen.getAllByTitle(/edit round/i);
    expect(editButtons).toHaveLength(1);
  });
});
