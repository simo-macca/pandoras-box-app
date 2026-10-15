import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EventCardsSection } from '../EventCardsSection';
import { EventItem } from '../../../types/rules';

describe('EventCardsSection component', () => {
  const mockEvents: EventItem[] = [
    {
      id: 'doomsday',
      name: {
        en: 'Doomsday',
        de: 'Weltuntergang',
        it: 'Giorno del Giudizio',
        fr: 'Fin du Monde',
      },
      severity: 'chaos',
      scope: 'global',
      description: {
        en: 'The round ends immediately! Everyone scores 50 points.',
        de: 'Die Runde endet sofort! Alle erhalten 50 Punkte.',
        it: 'Il round termina immediatamente! Tutti segnano 50 punti.',
        fr: 'La manche prend fin immédiatement ! Tout le monde marque 50 points.',
      },
    },
    {
      id: 'seppuku',
      name: {
        en: 'Seppuku',
        de: 'Seppuku',
        it: 'Seppuku',
        fr: 'Seppuku',
      },
      severity: 'chaos',
      scope: 'targeted',
      description: {
        en: 'Flip top card from draw pile to take the risk.',
        de: 'Oberste Karte aufdecken für Risiko.',
        it: 'Gira la prima carta del mazzo per rischiare.',
        fr: 'Retournez la première carte pour prendre le risque.',
      },
    },
  ];

  it('renders nothing when events list is empty', () => {
    const { container } = render(
      <EventCardsSection events={[]} language="en" />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders event names, descriptions, severity, and scope badges', () => {
    render(<EventCardsSection events={mockEvents} language="en" />);

    expect(screen.getByText('Doomsday')).toBeInTheDocument();
    expect(
      screen.getByText('The round ends immediately! Everyone scores 50 points.')
    ).toBeInTheDocument();

    expect(screen.getByText('Seppuku')).toBeInTheDocument();
    expect(
      screen.getByText('Flip top card from draw pile to take the risk.')
    ).toBeInTheDocument();

    // Scope badges
    expect(screen.getByText('Global')).toBeInTheDocument();
    expect(screen.getByText('Targeted')).toBeInTheDocument();

    // Severity badges
    const chaosBadges = screen.getAllByText('chaos');
    expect(chaosBadges).toHaveLength(2);
  });

  it('renders in German correctly', () => {
    render(<EventCardsSection events={mockEvents} language="de" />);

    expect(screen.getByText('Weltuntergang')).toBeInTheDocument();
    expect(
      screen.getByText('Die Runde endet sofort! Alle erhalten 50 Punkte.')
    ).toBeInTheDocument();
  });
});
