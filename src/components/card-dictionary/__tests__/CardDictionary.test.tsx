import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CardDictionary } from '../CardDictionary';

describe('CardDictionary component', () => {
  it('renders guide sub-tab by default', () => {
    render(<CardDictionary language="en" />);

    expect(screen.getByRole('button', { name: /guide/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /card dictionary/i })
    ).toBeInTheDocument();
  });

  it('switches to dictionary tab and filters by search query', async () => {
    const user = userEvent.setup();
    render(<CardDictionary language="en" />);

    // Switch to Card Dictionary tab
    const dictTab = screen.getByRole('button', { name: /card dictionary/i });
    await user.click(dictTab);

    // Search input should now be visible
    const searchInput = screen.getByPlaceholderText(/search/i);
    expect(searchInput).toBeInTheDocument();

    // Type "Doomsday" into search
    await user.type(searchInput, 'Doomsday');

    // Doomsday event should be present
    expect(screen.getByText('Doomsday')).toBeInTheDocument();

    // Clear search
    const clearBtn = screen.getByRole('button', { name: /clear search/i });
    await user.click(clearBtn);

    expect(searchInput).toHaveValue('');
  });

  it('filters by category buttons', async () => {
    const user = userEvent.setup();
    render(<CardDictionary language="en" />);

    const dictTab = screen.getByRole('button', { name: /card dictionary/i });
    await user.click(dictTab);

    // Click "Power Cards" category filter
    const powerCategoryBtn = screen.getByRole('button', {
      name: /power cards/i,
    });
    await user.click(powerCategoryBtn);

    // A power card should be rendered
    const powerCardElements = screen.getAllByText(/All Draw One/i);
    expect(powerCardElements.length).toBeGreaterThan(0);
    expect(powerCardElements[0]).toBeInTheDocument();
  });
});
