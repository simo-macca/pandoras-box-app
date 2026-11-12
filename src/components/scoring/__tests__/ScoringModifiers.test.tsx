import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ScoringModifiers } from '../ScoringModifiers';

describe('ScoringModifiers component', () => {
  const defaultProps = {
    isDoomsday: false,
    timeBombModifier: 'none' as const,
    tableTimeBombMode: 'none' as const,
    customModifier: 0,
    onToggleDoomsday: vi.fn(),
    onChangeTimeBomb: vi.fn(),
    onChangeTableTimeBomb: vi.fn(),
    onChangeCustomModifier: vi.fn(),
    language: 'en' as const,
  };

  it('renders all sections and controls in default state', () => {
    render(<ScoringModifiers {...defaultProps} />);

    expect(
      screen.getByRole('button', { name: /doomsday/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/whole table/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/this player/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/custom/i)).toBeInTheDocument();
  });

  it('fires onToggleDoomsday when Doomsday button is clicked', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    render(<ScoringModifiers {...defaultProps} onToggleDoomsday={onToggle} />);

    const doomsdayBtn = screen.getByRole('button', { name: /doomsday/i });
    await user.click(doomsdayBtn);

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('disables Time Bomb on Doomsday but keeps the free adjustment', () => {
    render(<ScoringModifiers {...defaultProps} isDoomsday={true} />);

    expect(screen.getByLabelText(/whole table/i)).toBeDisabled();
    expect(screen.getByLabelText(/this player/i)).toBeDisabled();
    // Lucky Bastard (p. 10) must be able to cancel the 50 Doomsday points.
    expect(screen.getByLabelText(/custom/i)).toBeEnabled();
  });

  it('calls onChangeTableTimeBomb when table time bomb mode changes', async () => {
    const user = userEvent.setup();
    const onChangeTableTimeBomb = vi.fn();
    render(
      <ScoringModifiers
        {...defaultProps}
        onChangeTableTimeBomb={onChangeTableTimeBomb}
      />
    );

    const tableSelect = screen.getByLabelText(/whole table/i);
    await user.selectOptions(tableSelect, 'exploded');

    expect(onChangeTableTimeBomb).toHaveBeenCalledWith('exploded');
  });

  it('calls onChangeTimeBomb when player override changes', async () => {
    const user = userEvent.setup();
    const onChangeTimeBomb = vi.fn();
    render(
      <ScoringModifiers {...defaultProps} onChangeTimeBomb={onChangeTimeBomb} />
    );

    const playerSelect = screen.getByLabelText(/this player/i);
    await user.selectOptions(playerSelect, 'loser_penalty');

    expect(onChangeTimeBomb).toHaveBeenCalledWith('loser_penalty');
  });

  it('offers the −10 bonus only to winners and +10 only to the others', () => {
    const { rerender } = render(<ScoringModifiers {...defaultProps} />);
    const options = () =>
      Array.from(
        (screen.getByLabelText(/this player/i) as HTMLSelectElement).options
      ).map((o) => o.value);

    expect(options()).toEqual(['none', 'loser_penalty', 'expired_double']);

    rerender(<ScoringModifiers {...defaultProps} isWinner={true} />);
    expect(options()).toEqual(['none', 'winner_bonus', 'expired_double']);
  });

  it('calls onChangeCustomModifier when custom modifier input changes', async () => {
    const user = userEvent.setup();
    const onChangeCustomModifier = vi.fn();
    render(
      <ScoringModifiers
        {...defaultProps}
        onChangeCustomModifier={onChangeCustomModifier}
      />
    );

    const input = screen.getByLabelText(/custom/i);
    await user.clear(input);
    await user.type(input, '5');

    expect(onChangeCustomModifier).toHaveBeenCalledWith(5);
  });

  it('supports typing negative numbers directly into custom modifier', async () => {
    const user = userEvent.setup();
    const onChangeCustomModifier = vi.fn();
    render(
      <ScoringModifiers
        {...defaultProps}
        onChangeCustomModifier={onChangeCustomModifier}
      />
    );

    const input = screen.getByLabelText(/custom/i);
    await user.clear(input);
    await user.type(input, '-15');

    expect(onChangeCustomModifier).toHaveBeenLastCalledWith(-15);
  });

  it('supports typing positive signed numbers directly into custom modifier', async () => {
    const user = userEvent.setup();
    const onChangeCustomModifier = vi.fn();
    render(
      <ScoringModifiers
        {...defaultProps}
        onChangeCustomModifier={onChangeCustomModifier}
      />
    );

    const input = screen.getByLabelText(/custom/i);
    await user.clear(input);
    await user.type(input, '+25');

    expect(onChangeCustomModifier).toHaveBeenLastCalledWith(25);
  });
});
