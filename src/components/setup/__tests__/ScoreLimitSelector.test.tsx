import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ScoreLimitSelector } from '../ScoreLimitSelector';

describe('ScoreLimitSelector component', () => {
  const defaultProps = {
    targetScore: 154,
    presetName: 'medium' as const,
    customValue: '150',
    onSelectPreset: vi.fn(),
    onSelectCustom: vi.fn(),
    onCustomChange: vi.fn(),
    onSubmitCustom: vi.fn(),
    language: 'en' as const,
  };

  it('renders official score preset options', () => {
    render(<ScoreLimitSelector {...defaultProps} />);

    expect(screen.getByText('113')).toBeInTheDocument();
    expect(screen.getByText('137')).toBeInTheDocument();
    expect(screen.getByText('154')).toBeInTheDocument();
    expect(screen.getByText('179')).toBeInTheDocument();
  });

  it('calls onSelectPreset with the clicked preset score', async () => {
    const user = userEvent.setup();
    const onSelectPreset = vi.fn();
    render(
      <ScoreLimitSelector {...defaultProps} onSelectPreset={onSelectPreset} />
    );

    await user.click(screen.getByText('179'));
    expect(onSelectPreset).toHaveBeenCalledWith(179);
  });

  it('calls onSelectCustom when clicking the Custom button or focusing input', async () => {
    const user = userEvent.setup();
    const onSelectCustom = vi.fn();
    render(
      <ScoreLimitSelector {...defaultProps} onSelectCustom={onSelectCustom} />
    );

    const customBtn = screen.getByRole('button', { name: /custom/i });
    await user.click(customBtn);
    expect(onSelectCustom).toHaveBeenCalled();
  });

  it('calls onCustomChange when typing into custom score input', async () => {
    const user = userEvent.setup();
    const onCustomChange = vi.fn();
    render(
      <ScoreLimitSelector {...defaultProps} onCustomChange={onCustomChange} />
    );

    const input = screen.getByPlaceholderText('150');
    await user.clear(input);
    await user.type(input, '120');

    expect(onCustomChange).toHaveBeenCalled();
  });

  it('calls onSubmitCustom when pressing Enter in the custom input', async () => {
    const user = userEvent.setup();
    const onSubmitCustom = vi.fn();
    render(
      <ScoreLimitSelector {...defaultProps} onSubmitCustom={onSubmitCustom} />
    );

    const input = screen.getByPlaceholderText('150');
    await user.type(input, '{Enter}');
    expect(onSubmitCustom).toHaveBeenCalled();
  });
});
