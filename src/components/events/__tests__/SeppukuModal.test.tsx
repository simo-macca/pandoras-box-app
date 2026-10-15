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

  it('renders all players, rules banner, and default choices', () => {
    render(<SeppukuModal {...defaultProps} />);

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(
      screen.getByText(/Seppuku T – Point Adjustments/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Card Rules: Seppuku T/i)).toBeInTheDocument();
  });

  it('allows selecting different outcomes and submitting choices in create mode', async () => {
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

    // Alice selects Risk (Special / Non-number) -> +42 pts
    const nonNumberButtons = screen.getAllByRole('button', {
      name: /special/i,
    });
    await user.click(nonNumberButtons[0]);

    // Bob selects Risk (Number) -> -21 pts
    const numberButtons = screen.getAllByRole('button', {
      name: /number/i,
    });
    await user.click(numberButtons[1]);

    // Click Apply Seppuku
    const submitBtn = screen.getByRole('button', {
      name: /apply seppuku/i,
    });
    await user.click(submitBtn);

    expect(onApplySeppuku).toHaveBeenCalledWith(
      {
        p1: 'risk_special',
        p2: 'risk_number',
      },
      undefined
    );
    expect(onClose).toHaveBeenCalled();
  });

  it('renders in edit mode and updates existing choices with Save Changes', async () => {
    const user = userEvent.setup();
    const onApplySeppuku = vi.fn();
    const onClose = vi.fn();

    render(
      <SeppukuModal
        {...defaultProps}
        editingRoundId="event-seppuku-999"
        initialChoices={{
          p1: 'risk_number',
          p2: 'no_risk',
        }}
        onApplySeppuku={onApplySeppuku}
        onClose={onClose}
      />
    );

    expect(screen.getByText(/edit mode/i)).toBeInTheDocument();
    expect(screen.getByText(/edit seppuku t/i)).toBeInTheDocument();

    // Change Alice from risk_number to no_risk
    const refuseButtons = screen.getAllByRole('button', {
      name: /no risk/i,
    });
    await user.click(refuseButtons[0]);

    const saveBtn = screen.getByRole('button', {
      name: /save changes/i,
    });
    await user.click(saveBtn);

    expect(onApplySeppuku).toHaveBeenCalledWith(
      {
        p1: 'no_risk',
        p2: 'no_risk',
      },
      'event-seppuku-999'
    );
    expect(onClose).toHaveBeenCalled();
  });
});
