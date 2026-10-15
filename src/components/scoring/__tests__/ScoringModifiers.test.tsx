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
    expect(screen.getByLabelText(/table time bomb mode/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/player override/i)).toBeInTheDocument();
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

  it('disables other controls when isDoomsday is true', () => {
    render(<ScoringModifiers {...defaultProps} isDoomsday={true} />);

    expect(screen.getByLabelText(/table time bomb mode/i)).toBeDisabled();
    expect(screen.getByLabelText(/player override/i)).toBeDisabled();
    expect(screen.getByLabelText(/custom/i)).toBeDisabled();
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

    const tableSelect = screen.getByLabelText(/table time bomb mode/i);
    await user.selectOptions(tableSelect, 'exploded');

    expect(onChangeTableTimeBomb).toHaveBeenCalledWith('exploded');
  });

  it('calls onChangeTimeBomb when player override changes', async () => {
    const user = userEvent.setup();
    const onChangeTimeBomb = vi.fn();
    render(
      <ScoringModifiers {...defaultProps} onChangeTimeBomb={onChangeTimeBomb} />
    );

    const playerSelect = screen.getByLabelText(/player override/i);
    await user.selectOptions(playerSelect, 'winner_bonus');

    expect(onChangeTimeBomb).toHaveBeenCalledWith('winner_bonus');
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
});
