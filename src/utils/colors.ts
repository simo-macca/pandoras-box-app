import { PlayerColor } from '../types/game';

export interface PawnTheme {
  name: string;
  label: Record<string, string>;
  hex: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  pillBg: string;
  ringColor: string;
  accentBg: string;
  avatarBg: string;
  avatarText: string;
  borderGlow: string;
}

export const PAWN_COLORS: Record<PlayerColor, PawnTheme> = {
  red: {
    name: 'Red',
    label: { en: 'Red', de: 'Rot', it: 'Rosso', fr: 'Rouge' },
    hex: '#ef4444',
    badgeBg: 'bg-red-500/15',
    badgeText: 'text-red-400',
    badgeBorder: 'border-red-500/40',
    pillBg: 'bg-red-600',
    ringColor: 'ring-red-500',
    accentBg: 'bg-red-500',
    avatarBg: 'bg-red-600 text-white',
    avatarText: 'text-white',
    borderGlow: 'shadow-[0_0_15px_rgba(239,68,68,0.35)]',
  },
  blue: {
    name: 'Blue',
    label: { en: 'Blue', de: 'Blau', it: 'Blu', fr: 'Bleu' },
    hex: '#3b82f6',
    badgeBg: 'bg-blue-500/15',
    badgeText: 'text-blue-400',
    badgeBorder: 'border-blue-500/40',
    pillBg: 'bg-blue-600',
    ringColor: 'ring-blue-500',
    accentBg: 'bg-blue-500',
    avatarBg: 'bg-blue-600 text-white',
    avatarText: 'text-white',
    borderGlow: 'shadow-[0_0_15px_rgba(59,130,246,0.35)]',
  },
  green: {
    name: 'Green',
    label: { en: 'Green', de: 'Grün', it: 'Verde', fr: 'Vert' },
    hex: '#10b981',
    badgeBg: 'bg-emerald-500/15',
    badgeText: 'text-emerald-400',
    badgeBorder: 'border-emerald-500/40',
    pillBg: 'bg-emerald-600',
    ringColor: 'ring-emerald-500',
    accentBg: 'bg-emerald-500',
    avatarBg: 'bg-emerald-600 text-white',
    avatarText: 'text-white',
    borderGlow: 'shadow-[0_0_15px_rgba(16,185,129,0.35)]',
  },
  yellow: {
    name: 'Yellow',
    label: { en: 'Yellow', de: 'Gelb', it: 'Giallo', fr: 'Jaune' },
    hex: '#facc15',
    badgeBg: 'bg-amber-400/15',
    badgeText: 'text-amber-300',
    badgeBorder: 'border-amber-400/40',
    pillBg: 'bg-yellow-500',
    ringColor: 'ring-yellow-400',
    accentBg: 'bg-yellow-400',
    avatarBg: 'bg-yellow-400 text-neutral-950 font-bold',
    avatarText: 'text-neutral-950',
    borderGlow: 'shadow-[0_0_15px_rgba(250,204,21,0.35)]',
  },
  purple: {
    name: 'Purple',
    label: { en: 'Purple', de: 'Lila', it: 'Viola', fr: 'Violet' },
    hex: '#a855f7',
    badgeBg: 'bg-purple-500/15',
    badgeText: 'text-purple-400',
    badgeBorder: 'border-purple-500/40',
    pillBg: 'bg-purple-600',
    ringColor: 'ring-purple-500',
    accentBg: 'bg-purple-500',
    avatarBg: 'bg-purple-600 text-white',
    avatarText: 'text-white',
    borderGlow: 'shadow-[0_0_15px_rgba(168,85,247,0.35)]',
  },
  orange: {
    name: 'Orange',
    label: { en: 'Orange', de: 'Orange', it: 'Arancione', fr: 'Orange' },
    hex: '#f97316',
    badgeBg: 'bg-orange-500/15',
    badgeText: 'text-orange-400',
    badgeBorder: 'border-orange-500/40',
    pillBg: 'bg-orange-600',
    ringColor: 'ring-orange-500',
    accentBg: 'bg-orange-500',
    avatarBg: 'bg-orange-600 text-white',
    avatarText: 'text-white',
    borderGlow: 'shadow-[0_0_15px_rgba(249,115,22,0.35)]',
  },
  white: {
    name: 'White',
    label: { en: 'White', de: 'Weiß', it: 'Bianco', fr: 'Blanc' },
    hex: '#f8fafc',
    badgeBg: 'bg-slate-100/15',
    badgeText: 'text-slate-100',
    badgeBorder: 'border-slate-300/60',
    pillBg: 'bg-slate-100',
    ringColor: 'ring-slate-200',
    accentBg: 'bg-slate-200',
    avatarBg: 'bg-slate-100 text-neutral-950 font-bold border border-slate-300',
    avatarText: 'text-neutral-950',
    borderGlow: 'shadow-[0_0_15px_rgba(248,250,252,0.35)]',
  },
  black: {
    name: 'Black',
    label: { en: 'Black', de: 'Schwarz', it: 'Nero', fr: 'Noir' },
    hex: '#18181b',
    badgeBg: 'bg-zinc-800/80',
    badgeText: 'text-zinc-200',
    badgeBorder: 'border-zinc-500/70',
    pillBg: 'bg-zinc-900 border border-zinc-500',
    ringColor: 'ring-zinc-400',
    accentBg: 'bg-zinc-800',
    avatarBg: 'bg-zinc-900 text-zinc-100 border-2 border-zinc-500',
    avatarText: 'text-zinc-100',
    borderGlow: 'shadow-[0_0_15px_rgba(113,113,122,0.35)]',
  },
  cyan: {
    name: 'Cyan',
    label: { en: 'Cyan', de: 'Türkis', it: 'Turchese', fr: 'Cyan' },
    hex: '#06b6d4',
    badgeBg: 'bg-cyan-500/15',
    badgeText: 'text-cyan-400',
    badgeBorder: 'border-cyan-500/40',
    pillBg: 'bg-cyan-600',
    ringColor: 'ring-cyan-500',
    accentBg: 'bg-cyan-500',
    avatarBg: 'bg-cyan-600 text-white',
    avatarText: 'text-white',
    borderGlow: 'shadow-[0_0_15px_rgba(6,182,212,0.35)]',
  },
  pink: {
    name: 'Pink',
    label: { en: 'Pink', de: 'Rosa', it: 'Rosa', fr: 'Rose' },
    hex: '#ec4899',
    badgeBg: 'bg-pink-500/15',
    badgeText: 'text-pink-400',
    badgeBorder: 'border-pink-500/40',
    pillBg: 'bg-pink-600',
    ringColor: 'ring-pink-500',
    accentBg: 'bg-pink-500',
    avatarBg: 'bg-pink-600 text-white',
    avatarText: 'text-white',
    borderGlow: 'shadow-[0_0_15px_rgba(236,72,153,0.35)]',
  },
};

export const PLAYER_COLORS = PAWN_COLORS;

export const ALL_PLAYER_COLORS: PlayerColor[] = [
  'red',
  'blue',
  'green',
  'yellow',
  'purple',
  'orange',
  'cyan',
  'pink',
];

export const ALL_PAWN_COLORS: PlayerColor[] = ALL_PLAYER_COLORS;

export function getPlayerColorTheme(color: PlayerColor): PawnTheme {
  return PAWN_COLORS[color] || PAWN_COLORS.red;
}

export const DEFAULT_PLAYERS: { name: string; color: PlayerColor }[] = [
  { name: 'Player 1', color: 'red' },
  { name: 'Player 2', color: 'blue' },
  { name: 'Player 3', color: 'green' },
  { name: 'Player 4', color: 'yellow' },
];
