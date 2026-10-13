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
    <div className="grid grid-cols-2 gap-1.5 min-[440px]:grid-cols-5 sm:gap-2">
      {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => {
        const count = counts[num] || 0;
        return (
          <div
            key={num}
            className={`flex flex-row items-center justify-between rounded-2xl border p-2 transition-all min-[440px]:flex-col min-[440px]:justify-between ${
              count > 0
                ? 'border-amber-500 bg-amber-500/15 shadow-sm'
                : 'border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-800/40'
            } ${disabled ? 'pointer-events-none opacity-40' : ''}`}
          >
            {/* Number Badge & Points */}
            <div className="flex items-center gap-1.5 min-[440px]:mb-1.5 min-[440px]:w-full min-[440px]:justify-between">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-neutral-900 text-xs font-black text-white dark:bg-neutral-100 dark:text-neutral-900">
                {num}
              </span>
              <span className="text-[10px] font-bold whitespace-nowrap text-neutral-400 tabular-nums">
                {num * count} pts
              </span>
            </div>

            {/* Stepper Buttons */}
            <div className="flex items-center justify-between gap-1 min-[440px]:mt-1 min-[440px]:w-full">
              <button
                type="button"
                onClick={() => handleDecrement(num)}
                disabled={count === 0 || disabled}
                aria-label={`Decrease number ${num}`}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-neutral-200 text-xs text-neutral-800 transition-colors hover:bg-neutral-300 disabled:opacity-30 sm:h-8 sm:w-8 sm:text-sm dark:bg-neutral-700/80 dark:text-neutral-200 dark:hover:bg-neutral-600"
              >
                <Minus className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />
              </button>

              <span
                className={`min-w-[1rem] text-center text-xs font-extrabold whitespace-nowrap tabular-nums sm:min-w-[1.25rem] sm:text-sm ${
                  count > 0
                    ? 'text-amber-600 dark:text-amber-400'
                    : 'text-neutral-400'
                }`}
              >
                {count}
              </span>

              <button
                type="button"
                onClick={() => handleIncrement(num)}
                disabled={disabled}
                aria-label={`Increase number ${num}`}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-500 text-xs font-bold text-neutral-950 shadow-sm transition-colors hover:bg-amber-400 sm:h-8 sm:w-8 sm:text-sm"
              >
                <Plus className="h-3 w-3 shrink-0 stroke-[2.5] sm:h-3.5 sm:w-3.5" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
