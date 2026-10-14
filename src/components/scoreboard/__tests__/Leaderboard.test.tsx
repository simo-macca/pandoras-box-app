import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Leaderboard } from '../Leaderboard';
import { Player, RoundEntry } from '../../../types/game';
import { PlayerStats } from '../../../utils/stats';

describe('Leaderboard component', () => {
  const players: Player[] = [
    { id: 'p1', name: 'Alice', color: 'red' },
    { id: 'p2', name: 'Bob', color: 'blue' },
  ];

  const playerStats: PlayerStats[] = [
    {
      id: 'p1',
      name: 'Alice',
      color: 'red',
      totalScore: 20,
      rank: 1,
      isLeader: true,
      isInDanger: false,
      isEliminated: false,
      progressPct: 13,
      pointsRemaining: 134,
      roundsWonCount: 1,
    },
    {
      id: 'p2',
      name: 'Bob',
      color: 'blue',
      totalScore: 130,
      rank: 2,
      isLeader: false,
      isInDanger: true,
      isEliminated: false,
      progressPct: 84,
      pointsRemaining: 24,
      roundsWonCount: 0,
    },
  ];

  const defaultProps = {
    playerStats,
    targetScore: 154,
    rounds: [] as RoundEntry[],
    players,
    onOpenScoreModal: vi.fn(),
    onUndoLastRound: vi.fn(),
    language: 'en' as const,
  };

  it('renders player rankings and points', () => {
    render(<Leaderboard {...defaultProps} />);

    expect(screen.getAllByText('Alice').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Bob').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/20/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/130/).length).toBeGreaterThanOrEqual(1);
  });

  it('calls onOpenScoreModal when clicking the Score Round button', async () => {
    const user = userEvent.setup();
    const onOpenScoreModal = vi.fn();

    render(
      <Leaderboard {...defaultProps} onOpenScoreModal={onOpenScoreModal} />
    );

    const logRoundBtn = screen.getByRole('button', { name: /score round/i });
    await user.click(logRoundBtn);

    expect(onOpenScoreModal).toHaveBeenCalled();
  });

  it('renders and triggers onStartNewGame when provided', async () => {
    const user = userEvent.setup();
    const onStartNewGame = vi.fn();

    render(<Leaderboard {...defaultProps} onStartNewGame={onStartNewGame} />);

    const newGameBtn = screen.getByRole('button', { name: /new game/i });
    await user.click(newGameBtn);

    expect(onStartNewGame).toHaveBeenCalled();
  });

  it('renders Conclude Match button when game is continued', async () => {
    const user = userEvent.setup();
    const onConcludeGame = vi.fn();

    render(
      <Leaderboard
        {...defaultProps}
        isContinued={true}
        onConcludeGame={onConcludeGame}
      />
    );

    const concludeBtn = screen.getByRole('button', {
      name: /conclude match/i,
    });
    await user.click(concludeBtn);

    expect(onConcludeGame).toHaveBeenCalled();
  });

  it('renders Identity Theft button as disabled when canApplyIdentityTheft is false', () => {
    render(
      <Leaderboard
        {...defaultProps}
        onApplyIdentityTheft={vi.fn()}
        canApplyIdentityTheft={false}
      />
    );

    const identityTheftBtn = screen.getByRole('button', {
      name: /identity theft/i,
    });
    expect(identityTheftBtn).toBeInTheDocument();
    expect(identityTheftBtn).toBeDisabled();
  });

  it('triggers onApplyIdentityTheft when Identity Theft button is clicked', async () => {
    const user = userEvent.setup();
    const onApplyIdentityTheft = vi.fn();

    render(
      <Leaderboard
        {...defaultProps}
        onApplyIdentityTheft={onApplyIdentityTheft}
        canApplyIdentityTheft={true}
      />
    );

    const identityTheftBtn = screen.getByRole('button', {
      name: /identity theft/i,
    });
    expect(identityTheftBtn).not.toBeDisabled();
    await user.click(identityTheftBtn);

    expect(onApplyIdentityTheft).toHaveBeenCalledTimes(1);
  });
});
