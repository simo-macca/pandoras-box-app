import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HandCalculatorModal } from '../HandCalculatorModal';
import { Player } from '../../../types/game';
import { TRANSLATIONS } from '../../../data/translations';

describe('HandCalculatorModal component', () => {
  const t = TRANSLATIONS.en;
  const players: Player[] = [
    { id: 'p1', name: 'Alice', color: 'red' },
    { id: 'p2', name: 'Bob', color: 'blue' },
  ];

  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    players,
    onSubmitRound: vi.fn(),
    language: 'en' as const,
    roundNumber: 1,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const getPlayerTotalBanner = () => {
    const label = screen.getByText(t.scoring.playerTotal);
    return label.parentElement!;
  };

  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <HandCalculatorModal {...defaultProps} isOpen={false} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing when players list is empty', () => {
    const { container } = render(
      <HandCalculatorModal {...defaultProps} players={[]} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('displays modal title and round number', () => {
    render(<HandCalculatorModal {...defaultProps} roundNumber={3} />);

    expect(screen.getByText(/round 3/i)).toBeInTheDocument();
  });

  it('allows switching active player via player picker', async () => {
    const user = userEvent.setup();
    render(<HandCalculatorModal {...defaultProps} />);

    // Initially Alice is active
    expect(screen.getByText('AL')).toBeInTheDocument(); // Alice avatar

    // Switch to Bob via dropdown select
    const playerSelect = screen.getByLabelText(/player name:/i);
    await user.selectOptions(playerSelect, 'p2');

    // Now active player banner shows Bob
    expect(screen.getByText('BO')).toBeInTheDocument(); // Bob avatar
  });

  it('adds number cards and updates total points', async () => {
    const user = userEvent.setup();
    render(<HandCalculatorModal {...defaultProps} />);

    // Add card 5 once (+5 pts)
    const inc5 = screen.getByLabelText('Increase number 5');
    await user.click(inc5);

    // Add card 10 twice (+20 pts)
    const inc10 = screen.getByLabelText('Increase number 10');
    await user.click(inc10);
    await user.click(inc10);

    // Total points should be 25 pts
    expect(getPlayerTotalBanner()).toHaveTextContent('25 pts');
  });

  it('adds special cards and updates total points', async () => {
    const user = userEvent.setup();
    render(<HandCalculatorModal {...defaultProps} />);

    // Add standard special (+7)
    const incSpecial = screen.getByLabelText('Increase standard specials');
    await user.click(incSpecial);

    // Add curse card (+13)
    const incCurse = screen.getByLabelText('Increase curse card');
    await user.click(incCurse);

    // Total should be 20 pts
    expect(getPlayerTotalBanner()).toHaveTextContent('20 pts');
  });

  it('handles winner toggle and resets card counts on winner', async () => {
    const user = userEvent.setup();
    render(<HandCalculatorModal {...defaultProps} />);

    // Add some points first
    const inc10 = screen.getByLabelText('Increase number 10');
    await user.click(inc10);
    expect(getPlayerTotalBanner()).toHaveTextContent('10 pts');

    // Toggle winner
    const winnerBtn = screen.getByRole('button', { name: /round winner/i });
    await user.click(winnerBtn);

    // Winner points should be 0
    expect(getPlayerTotalBanner()).toHaveTextContent('0 pts');
  });

  it('toggles Doomsday across all players', async () => {
    const user = userEvent.setup();
    render(<HandCalculatorModal {...defaultProps} />);

    const doomsdayBtn = screen.getByRole('button', { name: /doomsday/i });
    await user.click(doomsdayBtn);

    // Total should be 50 pts
    expect(getPlayerTotalBanner()).toHaveTextContent('50 pts');
  });

  it('resets current player scores with quick zero button', async () => {
    const user = userEvent.setup();
    render(<HandCalculatorModal {...defaultProps} />);

    // Add card 8
    const inc8 = screen.getByLabelText('Increase number 8');
    await user.click(inc8);
    expect(getPlayerTotalBanner()).toHaveTextContent('8 pts');

    // Click quick zero
    const resetBtn = screen.getByTitle(t.scoring.quickZero);
    await user.click(resetBtn);

    expect(getPlayerTotalBanner()).toHaveTextContent('0 pts');
  });

  it('submits round scores and calls onClose on submit', async () => {
    const user = userEvent.setup();
    const onSubmitRound = vi.fn();
    const onClose = vi.fn();

    render(
      <HandCalculatorModal
        {...defaultProps}
        onSubmitRound={onSubmitRound}
        onClose={onClose}
      />
    );

    // Mark Alice as winner
    const winnerBtn = screen.getByRole('button', { name: /round winner/i });
    await user.click(winnerBtn);

    // Switch to Bob and give Bob 10 points
    const playerSelect = screen.getByLabelText(/player name:/i);
    await user.selectOptions(playerSelect, 'p2');

    const inc10 = screen.getByLabelText('Increase number 10');
    await user.click(inc10);

    // Click Save Round Scores
    const submitBtn = screen.getByRole('button', {
      name: /save round scores/i,
    });
    await user.click(submitBtn);

    expect(onSubmitRound).toHaveBeenCalledWith(
      expect.objectContaining({
        p1: expect.objectContaining({ isWinner: true, totalPoints: 0 }),
        p2: expect.objectContaining({ isWinner: false, totalPoints: 10 }),
      })
    );
    expect(onClose).toHaveBeenCalled();
  });
});
