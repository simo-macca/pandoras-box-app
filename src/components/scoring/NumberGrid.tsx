import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { soundEffects } from '../../utils/sound';

interface NumberGridProps {
  counts: Record<number, number>;
  onChange: (counts: Record<number, number>) => void;
  disabled?: boolean;
}

export const NumberGrid: React.FC<NumberGridProps> = ({ counts, onChange, disabled = false }) => {
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
      {Array.from({ length: 10 }, (_, i) => i + 1).map(num => {
        const count = counts[num] || 0;
        return (
          <div
            key={num}
            className={`flex flex-col items-center justify-between p-2 rounded-2xl border transition-all ${
              count > 0
                ? 'border-amber-500 bg-amber-500/15 shadow-sm'
                : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40'
            } ${disabled ? 'opacity-40 pointer-events-none' : ''}`}
          >
            {/* Number Badge */}
            <div className="flex items-center justify-between w-full mb-1">
              <span className="w-5 h-5 rounded-md bg-neutral-900 text-white text-[11px] font-black flex items-center justify-center">
                {num}
              </span>
              <span className="text-[10px] text-neutral-400 font-bold">
                {num * count} pts
              </span>
            </div>

            {/* Stepper Buttons */}
            <div className="flex items-center justify-between w-full mt-1">
              <button
                type="button"
                onClick={() => handleDecrement(num)}
                disabled={count === 0 || disabled}
                className="w-6 h-6 rounded-lg bg-neutral-200 dark:bg-neutral-700/80 hover:bg-neutral-300 dark:hover:bg-neutral-600 disabled:opacity-30 text-neutral-800 dark:text-neutral-200 flex items-center justify-center transition-colors"
              >
                <Minus className="w-3 h-3" />
              </button>

              <span className={`text-sm font-extrabold ${count > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-neutral-400'}`}>
                {count}
              </span>

              <button
                type="button"
                onClick={() => handleIncrement(num)}
                disabled={disabled}
                className="w-6 h-6 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold flex items-center justify-center transition-colors shadow-sm"
              >
                <Plus className="w-3 h-3 stroke-[2.5]" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
