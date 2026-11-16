import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { soundEffects } from '@/utils/sound';

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
    <div className="grid grid-cols-2 gap-2 min-[480px]:grid-cols-5">
      {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => {
        const count = counts[num] || 0;
        const isActive = count > 0;
        return (
          <div
            key={num}
            className={`flex min-w-0 items-center justify-between gap-2 rounded-xl border p-2 transition-colors min-[480px]:flex-col min-[480px]:items-stretch ${
              isActive
                ? 'border-amber-500/60 bg-amber-500/10'
                : 'border-neutral-200/80 bg-white dark:border-white/[0.07] dark:bg-white/[0.03]'
            } ${disabled ? 'pointer-events-none opacity-40' : ''}`}
          >
            <div className="flex items-center justify-between gap-1.5">
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                  isActive
                    ? 'bg-amber-500 text-neutral-950'
                    : 'bg-neutral-900 text-white dark:bg-white/[0.12]'
                }`}
              >
                {num}
              </span>
              {/* Hidden on very narrow phones; the player total is shown above. */}
              <span className="text-[11px] font-medium whitespace-nowrap text-neutral-400 tabular-nums max-[359px]:hidden">
                {num * count} pts
              </span>
            </div>

            <div className="flex items-center justify-between gap-1">
              <button
                type="button"
                onClick={() => handleDecrement(num)}
                disabled={count === 0 || disabled}
                aria-label={`Decrease number ${num}`}
                className="stepper-btn h-8 w-8"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span
                className={`min-w-5 text-center text-sm font-bold tabular-nums ${
                  isActive
                    ? 'text-amber-700 dark:text-amber-300'
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
                className="stepper-btn stepper-btn-primary h-8 w-8"
              >
                <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
