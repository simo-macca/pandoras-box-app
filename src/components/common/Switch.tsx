import React from 'react';

const TONES = {
  amber: 'bg-amber-500',
  emerald: 'bg-emerald-500',
  purple: 'bg-purple-500',
} as const;

interface SwitchProps {
  checked: boolean;
  tone?: keyof typeof TONES;
}

/**
 * Visual on/off switch. It is presentational: place it inside the button
 * (with `aria-pressed`) that owns the label, so the whole row is clickable.
 */
export const Switch: React.FC<SwitchProps> = ({ checked, tone = 'amber' }) => (
  <span
    aria-hidden="true"
    className={`relative inline-flex h-6 w-10 shrink-0 items-center rounded-full transition-colors ${
      checked ? TONES[tone] : 'bg-neutral-300 dark:bg-white/15'
    }`}
  >
    <span
      className={`absolute left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
        checked ? 'translate-x-4' : 'translate-x-0'
      }`}
    />
  </span>
);
