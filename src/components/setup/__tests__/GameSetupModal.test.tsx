import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GameSetupModal } from '../GameSetupModal';
import { Player, GameConfig } from '../../../types/game';
import toast from 'react-hot-toast';

vi.mock('react-hot-toast', () => ({
  default: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

describe('GameSetupModal component', () => {
  const currentPlayers: Player[] = [
    { id: 'p1', name: 'Alice', color: 'red' },
    { id: 'p2', name: 'Bob', color: 'blue' },
    { id: 'p3', name: 'Charlie', color: 'green' },
  ];

  const currentConfig: GameConfig = {
    targetScore: 154,
    presetName: 'medium',
  };

  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    currentPlayers,
    currentConfig,
    onSaveAndStart: vi.fn(),
    language: 'en' as const,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <GameSetupModal {...defaultProps} isOpen={false} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders players and config when open', () => {
    render(<GameSetupModal {...defaultProps} />);

    expect(screen.getByDisplayValue('Alice')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Bob')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Charlie')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<GameSetupModal {...defaultProps} onClose={onClose} />);

    await user.click(screen.getByLabelText('Close'));
    expect(onClose).toHaveBeenCalled();
  });

  it('allows adding a new player', async () => {
    const user = userEvent.setup();
    render(<GameSetupModal {...defaultProps} />);

    const addBtn = screen.getByRole('button', { name: /add player/i });
    await user.click(addBtn);

    expect(screen.getByDisplayValue('Player 4')).toBeInTheDocument();
  });

  it('allows removing a player (down to minimum of 2)', async () => {
    const user = userEvent.setup();
    render(<GameSetupModal {...defaultProps} />);

    // Current players: 3. Find remove buttons by title.
    const removeButtons = screen.getAllByTitle(/remove player/i);
    expect(removeButtons).toHaveLength(3);

    await user.click(removeButtons[2]); // Remove Charlie
    expect(screen.queryByDisplayValue('Charlie')).not.toBeInTheDocument();

    // Now 2 players remaining, remove button should be disabled with min 2 message
    const disabledButtons = screen.getAllByTitle(/minimum 2 players required/i);
    expect(disabledButtons).toHaveLength(2);
    expect(disabledButtons[0]).toBeDisabled();
  });

  it('allows editing player names', async () => {
    const user = userEvent.setup();
    render(<GameSetupModal {...defaultProps} />);

    const aliceInput = screen.getByDisplayValue('Alice');
    await user.clear(aliceInput);
    await user.type(aliceInput, 'Alicia');

    expect(screen.getByDisplayValue('Alicia')).toBeInTheDocument();
  });

  it('saves configuration without resetting rounds on Start Match', async () => {
    const user = userEvent.setup();
    const onSaveAndStart = vi.fn();
    const onClose = vi.fn();

    render(
      <GameSetupModal
        {...defaultProps}
        onSaveAndStart={onSaveAndStart}
        onClose={onClose}
      />
    );

    const startBtn = screen.getByRole('button', { name: /start/i });
    await user.click(startBtn);

    expect(onSaveAndStart).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Alice' }),
        expect.objectContaining({ name: 'Bob' }),
        expect.objectContaining({ name: 'Charlie' }),
      ]),
      expect.objectContaining({ targetScore: 154 }),
      false // isResetRounds = false
    );
    expect(onClose).toHaveBeenCalled();
  });

  it('confirms reset when New Game is initiated', async () => {
    const user = userEvent.setup();
    const onSaveAndStart = vi.fn();
    const onClose = vi.fn();

    render(
      <GameSetupModal
        {...defaultProps}
        onSaveAndStart={onSaveAndStart}
        onClose={onClose}
      />
    );

    const newGameBtn = screen.getByRole('button', { name: /new game/i });
    await user.click(newGameBtn);

    // Confirmation UI should now be displayed
    const confirmBtn = screen.getByRole('button', { name: /confirm/i });
    expect(confirmBtn).toBeInTheDocument();

    await user.click(confirmBtn);

    expect(onSaveAndStart).toHaveBeenCalledWith(
      expect.any(Array),
      expect.any(Object),
      true // isResetRounds = true
    );
    expect(onClose).toHaveBeenCalled();
  });

  it('rejects target score below 50 with toast error', async () => {
    const user = userEvent.setup();
    const onSaveAndStart = vi.fn();

    render(
      <GameSetupModal {...defaultProps} onSaveAndStart={onSaveAndStart} />
    );

    // Switch to custom score
    const customBtn = screen.getByRole('button', { name: /custom/i });
    await user.click(customBtn);

    const customInput = screen.getByPlaceholderText('150');
    await user.clear(customInput);
    await user.type(customInput, '25'); // below 50

    const startBtn = screen.getByRole('button', { name: /start/i });
    await user.click(startBtn);

    expect(toast.error).toHaveBeenCalled();
    expect(onSaveAndStart).not.toHaveBeenCalled();
  });

  it('displays "Save Changes" button when isMatchInProgress is true', () => {
    render(<GameSetupModal {...defaultProps} isMatchInProgress={true} />);

    expect(
      screen.getByRole('button', { name: /save changes/i })
    ).toBeInTheDocument();
  });

  it('allows configuring round limit via presets and custom input', async () => {
    const user = userEvent.setup();
    const onSaveAndStart = vi.fn();

    render(
      <GameSetupModal {...defaultProps} onSaveAndStart={onSaveAndStart} />
    );

    // Click 10 rounds preset
    const tenRoundsBtn = screen.getByRole('button', { name: /10 rounds/i });
    await user.click(tenRoundsBtn);

    const startBtn = screen.getByRole('button', { name: /start/i });
    await user.click(startBtn);

    expect(onSaveAndStart).toHaveBeenCalledWith(
      expect.any(Array),
      expect.objectContaining({ roundLimit: 10 }),
      false
    );
  });
});
