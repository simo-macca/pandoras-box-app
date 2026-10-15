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

  it('toggles Doomsday across all players, disables winner button, and clears existing winner', async () => {
    const user = userEvent.setup();
    const onSubmitRound = vi.fn();
    render(
      <HandCalculatorModal {...defaultProps} onSubmitRound={onSubmitRound} />
    );

    // Alice is winner first
    const winnerBtn = screen.getByRole('button', { name: /round winner/i });
    await user.click(winnerBtn);
    expect(getPlayerTotalBanner()).toHaveTextContent('0 pts');

    // Click Doomsday
    const doomsdayBtn = screen.getByRole('button', { name: /doomsday/i });
    await user.click(doomsdayBtn);

    // Alice now has 50 pts
    expect(getPlayerTotalBanner()).toHaveTextContent('50 pts');
    expect(winnerBtn).toBeDisabled();

    // Switch to Bob and verify Bob also has 50 pts
    const playerSelect = screen.getByLabelText(/player name:/i);
    await user.selectOptions(playerSelect, 'p2');
    expect(getPlayerTotalBanner()).toHaveTextContent('50 pts');

    // Submit round and verify all players received 50 pts and isWinner is false
    const submitBtn = screen.getByRole('button', {
      name: /save round scores/i,
    });
    await user.click(submitBtn);

    expect(onSubmitRound).toHaveBeenCalledWith(
      expect.objectContaining({
        p1: expect.objectContaining({
          isDoomsday: true,
          isWinner: false,
          totalPoints: 50,
        }),
        p2: expect.objectContaining({
          isDoomsday: true,
          isWinner: false,
          totalPoints: 50,
        }),
      })
    );
  });

  it('handles table-level Time Bomb in exploded mode doubling points for all players', async () => {
    const user = userEvent.setup();
    const onSubmitRound = vi.fn();
    render(
      <HandCalculatorModal {...defaultProps} onSubmitRound={onSubmitRound} />
    );

    // Alice gets 10 pts
    const inc10 = screen.getByLabelText('Increase number 10');
    await user.click(inc10);
    expect(getPlayerTotalBanner()).toHaveTextContent('10 pts');

    // Bob gets 8 pts
    const playerSelect = screen.getByLabelText(/player name:/i);
    await user.selectOptions(playerSelect, 'p2');
    const inc8 = screen.getByLabelText('Increase number 8');
    await user.click(inc8);
    expect(getPlayerTotalBanner()).toHaveTextContent('8 pts');

    // Select Table Time Bomb Mode = exploded
    const tableSelect = screen.getByLabelText(/table time bomb mode/i);
    await user.selectOptions(tableSelect, 'exploded');

    // Bob total is now doubled: 8 * 2 = 16 pts
    expect(getPlayerTotalBanner()).toHaveTextContent('16 pts');

    // Switch back to Alice: 10 * 2 = 20 pts
    await user.selectOptions(playerSelect, 'p1');
    expect(getPlayerTotalBanner()).toHaveTextContent('20 pts');
  });

  it('handles table-level Time Bomb in defused mode with winner bonus and loser penalty', async () => {
    const user = userEvent.setup();
    const onSubmitRound = vi.fn();
    render(
      <HandCalculatorModal {...defaultProps} onSubmitRound={onSubmitRound} />
    );

    // Alice is winner
    const winnerBtn = screen.getByRole('button', { name: /round winner/i });
    await user.click(winnerBtn);

    // Bob has 10 points
    const playerSelect = screen.getByLabelText(/player name:/i);
    await user.selectOptions(playerSelect, 'p2');
    const inc10 = screen.getByLabelText('Increase number 10');
    await user.click(inc10);

    // Set Table Time Bomb Mode = defused
    const tableSelect = screen.getByLabelText(/table time bomb mode/i);
    await user.selectOptions(tableSelect, 'defused');

    // Bob (loser) gets 10 + 10 = 20 pts
    expect(getPlayerTotalBanner()).toHaveTextContent('20 pts');

    // Submit and verify modifiers
    const submitBtn = screen.getByRole('button', {
      name: /save round scores/i,
    });
    await user.click(submitBtn);

    expect(onSubmitRound).toHaveBeenCalledWith(
      expect.objectContaining({
        p1: expect.objectContaining({
          isWinner: true,
          timeBombModifier: 'winner_bonus',
          totalPoints: -10,
        }),
        p2: expect.objectContaining({
          isWinner: false,
          timeBombModifier: 'loser_penalty',
          totalPoints: 20,
        }),
      })
    );
  });

  it('resets current player scores with quick zero button while preserving Doomsday state', async () => {
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

    // When Doomsday is active, quick zero preserves Doomsday table state (50 pts)
    const doomsdayBtn = screen.getByRole('button', { name: /doomsday/i });
    await user.click(doomsdayBtn);
    expect(getPlayerTotalBanner()).toHaveTextContent('50 pts');

    await user.click(resetBtn);
    expect(getPlayerTotalBanner()).toHaveTextContent('50 pts');
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
