import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { soundEffects } from '../../utils/sound';

interface NumberGridProps {
  counts: Record<number, number>;
  onChange: (counts: Record<number, number>) => void;
  disabled?: boolean;
}

export const NumberGrid: React.FC<NumberGridProps> = ({
  counts,
  onChange,
  disabled = false,
}) => {
  const handleIncrement = (num: number) => {
    if (disabled) return;
    soundEffects.playClick();
    onChange({
      ...counts,
      [num]: (counts[num] || 0) + 1,
    });
  };

  const handleDecrement = (num: number) => {
    if (disabled) return;
    const current = counts[num] || 0;
    if (current <= 0) return;
    soundEffects.playClick();
    onChange({
      ...counts,
      [num]: current - 1,
    });
  };

  return (
    <div className="grid grid-cols-5 gap-2">
      {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => {
        const count = counts[num] || 0;
        return (
          <div
            key={num}
            className={`flex flex-col items-center justify-between rounded-2xl border p-2 transition-all ${
              count > 0
                ? 'border-amber-500 bg-amber-500/15 shadow-sm'
                : 'border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-800/40'
            } ${disabled ? 'pointer-events-none opacity-40' : ''}`}
          >
            {/* Number Badge */}
            <div className="mb-1 flex w-full items-center justify-between">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-neutral-900 text-[11px] font-black text-white">
                {num}
              </span>
              <span className="text-[10px] font-bold text-neutral-400">
                {num * count} pts
              </span>
            </div>

            {/* Stepper Buttons */}
            <div className="mt-1 flex w-full items-center justify-between">
              <button
                type="button"
                onClick={() => handleDecrement(num)}
                disabled={count === 0 || disabled}
                className="flex h-6 w-6 items-center justify-center rounded-lg bg-neutral-200 text-neutral-800 transition-colors hover:bg-neutral-300 disabled:opacity-30 dark:bg-neutral-700/80 dark:text-neutral-200 dark:hover:bg-neutral-600"
              >
                <Minus className="h-3 w-3" />
              </button>

              <span
                className={`text-sm font-extrabold ${count > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-neutral-400'}`}
              >
                {count}
              </span>

              <button
                type="button"
                onClick={() => handleIncrement(num)}
                disabled={disabled}
                className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500 font-bold text-neutral-950 shadow-sm transition-colors hover:bg-amber-400"
              >
                <Plus className="h-3 w-3 stroke-[2.5]" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
