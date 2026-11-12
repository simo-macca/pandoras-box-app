import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RuleCardDrawer } from '../RuleCardDrawer';

describe('RuleCardDrawer component', () => {
  const defaultProps = {
    activeRuleCardIds: [] as string[],
    onChangeActiveRuleCards: vi.fn(),
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
      <RuleCardDrawer {...defaultProps} onChangeActiveRuleCards={onSelect} />
    );

    // Click on the first Activate button
    const activateButtons = screen.getAllByRole('button', {
      name: /^activate rule$/i,
    });
    expect(activateButtons.length).toBeGreaterThan(0);
    await user.click(activateButtons[0]);

    // Activating adds the card to the list of active rule cards
    expect(onSelect).toHaveBeenCalledWith(['fantastic-six']);
  });

  it('keeps other active cards when activating another one (p. 21)', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <RuleCardDrawer
        {...defaultProps}
        activeRuleCardIds={['double-special']}
        onChangeActiveRuleCards={onChange}
      />
    );

    await user.click(
      screen.getAllByRole('button', { name: /^activate rule$/i })[0]
    );
    expect(onChange).toHaveBeenCalledWith(['double-special', 'fantastic-six']);
  });

  it('removes only the deactivated card', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <RuleCardDrawer
        {...defaultProps}
        activeRuleCardIds={['fantastic-six', 'double-special']}
        onChangeActiveRuleCards={onChange}
      />
    );

    await user.click(
      screen.getAllByRole('button', { name: /^deactivate rule$/i })[0]
    );
    expect(onChange).toHaveBeenCalledWith(['double-special']);
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
