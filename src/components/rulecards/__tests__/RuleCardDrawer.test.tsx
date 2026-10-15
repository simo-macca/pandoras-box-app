import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RuleCardDrawer } from '../RuleCardDrawer';

describe('RuleCardDrawer component', () => {
  const defaultProps = {
    activeRuleCardIds: [] as string[],
    onSelectActiveRuleCard: vi.fn(),
    language: 'en' as const,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders draw random button and rule cards grid', () => {
    render(<RuleCardDrawer {...defaultProps} />);

    expect(
      screen.getByRole('button', { name: /draw random/i })
    ).toBeInTheDocument();
    expect(screen.getByText('Fantastic Six')).toBeInTheDocument();
    expect(screen.getByText('Double Trouble')).toBeInTheDocument();
  });

  it('toggles rule card activation when activate button is clicked', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <RuleCardDrawer {...defaultProps} onSelectActiveRuleCard={onSelect} />
    );

    // Click on the first Activate button
    const activateButtons = screen.getAllByRole('button', {
      name: /activate/i,
    });
    expect(activateButtons.length).toBeGreaterThan(0);
    await user.click(activateButtons[0]);

    // Should call onSelectActiveRuleCard with the first card ID
    expect(onSelect).toHaveBeenCalledWith('fantastic-six');
  });

  it('draws a random card using timer', () => {
    vi.useFakeTimers();
    render(<RuleCardDrawer {...defaultProps} />);

    const drawBtn = screen.getByRole('button', { name: /draw random/i });
    act(() => {
      drawBtn.click();
    });

    // Advance timers through rolling sequence
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    vi.useRealTimers();
  });
});
