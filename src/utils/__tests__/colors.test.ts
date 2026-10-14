import { describe, it, expect } from 'vitest';
import {
  PAWN_COLORS,
  ALL_PLAYER_COLORS,
  ALL_PAWN_COLORS,
  getPlayerColorTheme,
  DEFAULT_PLAYERS,
} from '../colors';
import { PlayerColor } from '../../types/game';

describe('colors utils', () => {
  it('defines theme properties for all standard pawn colors', () => {
    const expectedColors: PlayerColor[] = [
      'red',
      'blue',
      'green',
      'yellow',
      'purple',
      'orange',
      'white',
      'black',
      'cyan',
      'pink',
    ];

    expectedColors.forEach((color) => {
      const theme = PAWN_COLORS[color];
      expect(theme).toBeDefined();
      expect(theme.name).toBeTruthy();
      expect(theme.hex).toMatch(/^#[0-9a-fA-F]{6}$/);
      expect(theme.badgeBg).toBeTruthy();
      expect(theme.badgeText).toBeTruthy();
      expect(theme.badgeBorder).toBeTruthy();
      expect(theme.label.en).toBeTruthy();
      expect(theme.label.de).toBeTruthy();
      expect(theme.label.it).toBeTruthy();
      expect(theme.label.fr).toBeTruthy();
    });
  });

  it('provides the 8 selectable player colors excluding monochrome referee/special colors', () => {
    expect(ALL_PLAYER_COLORS).toHaveLength(8);
    expect(ALL_PLAYER_COLORS).toEqual([
      'red',
      'blue',
      'green',
      'yellow',
      'purple',
      'orange',
      'cyan',
      'pink',
    ]);
    expect(ALL_PAWN_COLORS).toEqual(ALL_PLAYER_COLORS);
    expect(ALL_PLAYER_COLORS).not.toContain('white');
    expect(ALL_PLAYER_COLORS).not.toContain('black');
  });

  it('getPlayerColorTheme returns the correct theme or falls back to red', () => {
    expect(getPlayerColorTheme('blue').name).toBe('Blue');
    expect(getPlayerColorTheme('yellow').name).toBe('Yellow');

    // Invalid color fallback
    expect(getPlayerColorTheme('non-existent' as PlayerColor).name).toBe('Red');
  });

  it('provides 4 distinct default players with valid player colors', () => {
    expect(DEFAULT_PLAYERS).toHaveLength(4);
    const colors = DEFAULT_PLAYERS.map((p) => p.color);
    const uniqueColors = new Set(colors);
    expect(uniqueColors.size).toBe(4);
    colors.forEach((c) => {
      expect(ALL_PLAYER_COLORS).toContain(c);
    });
  });
});
