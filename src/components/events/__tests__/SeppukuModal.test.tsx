import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SeppukuModal } from '../SeppukuModal';
import { Player } from '../../../types/game';

describe('SeppukuModal component', () => {
  const players: Player[] = [
    { id: 'p1', name: 'Alice', color: 'red' },
    { id: 'p2', name: 'Bob', color: 'blue' },
  ];

  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    players,
    onApplySeppuku: vi.fn(),
    language: 'en' as const,
  };

  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <SeppukuModal {...defaultProps} isOpen={false} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders all players and default choices', () => {
    render(<SeppukuModal {...defaultProps} />);

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText(/Seppuku T/i)).toBeInTheDocument();
  });

  it('allows selecting different outcomes and submitting choices', async () => {
    const user = userEvent.setup();
    const onApplySeppuku = vi.fn();
    const onClose = vi.fn();

    render(
      <SeppukuModal
        {...defaultProps}
        onApplySeppuku={onApplySeppuku}
        onClose={onClose}
      />
    );

    // Alice selects Risk (Non-Number) -> +42 pts
    const nonNumberButtons = screen.getAllByRole('button', {
      name: /non-number/i,
    });
    await user.click(nonNumberButtons[0]);

    // Bob selects Risk (Number) -> -21 pts
    const numberButtons = screen.getAllByRole('button', {
      name: /number card/i,
    });
    await user.click(numberButtons[1]);

    // Click Apply Seppuku
    const submitBtn = screen.getByRole('button', {
      name: /apply seppuku/i,
    });
    await user.click(submitBtn);

    expect(onApplySeppuku).toHaveBeenCalledWith({
      p1: 'risk_special',
      p2: 'risk_number',
    });
    expect(onClose).toHaveBeenCalled();
  });
});
