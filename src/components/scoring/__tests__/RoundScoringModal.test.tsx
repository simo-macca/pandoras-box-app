import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RoundScoringModal } from '../RoundScoringModal';
import { Player } from '../../../types/game';

describe('RoundScoringModal re-export', () => {
  const players: Player[] = [
    { id: 'p1', name: 'Alice', color: 'red' },
    { id: 'p2', name: 'Bob', color: 'blue' },
  ];

  it('renders correctly as an alias for HandCalculatorModal', () => {
    render(
      <RoundScoringModal
        isOpen={true}
        onClose={vi.fn()}
        players={players}
        onSubmitRound={vi.fn()}
        language="en"
        roundNumber={1}
      />
    );

    expect(screen.getByText(/round 1/i)).toBeInTheDocument();
  });
});
