import React, { useState, useEffect } from 'react';
import { X, Flame, Skull, Shield, Check, Swords } from 'lucide-react';
import { Player, Language, SeppukuOutcome } from '../../types/game';
import { TRANSLATIONS } from '../../data/translations';
import { soundEffects } from '../../utils/sound';
import { getPlayerColorTheme } from '../../utils/colors';

interface SeppukuModalProps {
  isOpen: boolean;
  onClose: () => void;
  players: Player[];
  onApplySeppuku: (choices: Record<string, SeppukuOutcome>) => void;
  language: Language;
}

export const SeppukuModal: React.FC<SeppukuModalProps> = ({
  isOpen,
  onClose,
  players,
  onApplySeppuku,
  language,
}) => {
  const t = TRANSLATIONS[language];

  // Default every player to 'no_risk' (+21 pts)
  const [choices, setChoices] = useState<Record<string, SeppukuOutcome>>({});

  useEffect(() => {
    if (isOpen) {
      const initial: Record<string, SeppukuOutcome> = {};
      players.forEach((p) => {
        initial[p.id] = 'no_risk';
      });
      setChoices(initial);
    }
  }, [isOpen, players]);

  if (!isOpen || players.length === 0) return null;

  const handleSelectOutcome = (playerId: string, outcome: SeppukuOutcome) => {
    soundEffects.playClick();
    setChoices((prev) => ({
      ...prev,
      [playerId]: outcome,
    }));
  };

  const handleSubmit = () => {
    soundEffects.playClick();
    onApplySeppuku(choices);
    onClose();
  };

  return (
    <div className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-2 backdrop-blur-sm sm:p-4">
      <div className="relative flex max-h-[90dvh] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl dark:border-neutral-800 dark:bg-neutral-900">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-neutral-200 bg-neutral-50 px-4 py-3 sm:px-6 sm:py-4 dark:border-neutral-800 dark:bg-neutral-900/60">
          <div className="min-w-0">
            <h2 className="flex items-center gap-2 text-base font-black text-neutral-900 sm:text-lg md:text-xl dark:text-white">
              <Swords className="h-5 w-5 shrink-0 text-rose-500" />
              <span className="truncate">
                {t.events?.seppukuTitle || 'Seppuku T – Point Adjustments'}
              </span>
            </h2>
            <p className="mt-0.5 truncate text-xs text-neutral-500 dark:text-neutral-400">
              {t.events?.seppukuSubtitle ||
                'In turn order, choose whether each player takes the risk or refuses'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 rounded-xl p-1.5 text-neutral-400 transition-colors hover:bg-neutral-200 hover:text-neutral-700 sm:p-2 dark:hover:bg-neutral-800 dark:hover:text-white"
          >
            <X className="h-5 w-5 shrink-0" />
          </button>
        </div>

        {/* Player Choices List */}
        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-3 sm:space-y-4 sm:p-6">
          {players.map((player, index) => {
            const currentChoice = choices[player.id] || 'no_risk';
            const colorTheme = getPlayerColorTheme(player.color);

            return (
              <div
                key={player.id}
                className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-3 shadow-xs dark:border-neutral-800 dark:bg-neutral-800/40"
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-[10px] font-bold text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300">
                      {index + 1}
                    </span>
                    <span
                      className={`h-2.5 w-2.5 shrink-0 rounded-full ${colorTheme.accentBg}`}
                    />
                    <span className="truncate text-sm font-bold text-neutral-900 dark:text-white">
                      {player.name}
                    </span>
                  </div>

                  <span
                    className={`font-mono text-xs font-black ${
                      currentChoice === 'risk_number'
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : currentChoice === 'risk_special'
                          ? 'text-rose-600 dark:text-rose-400'
                          : 'text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    {currentChoice === 'risk_number'
                      ? '-21 pts'
                      : currentChoice === 'risk_special'
                        ? '+42 pts'
                        : '+21 pts'}
                  </span>
                </div>

                {/* 3 Option Buttons */}
                <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-3 sm:gap-2">
                  {/* Option 1: Risk Number (-21) */}
                  <button
                    type="button"
                    onClick={() =>
                      handleSelectOutcome(player.id, 'risk_number')
                    }
                    className={`flex items-center justify-between gap-1 rounded-xl border p-2 text-left text-xs font-semibold transition-all ${
                      currentChoice === 'risk_number'
                        ? 'border-emerald-500 bg-emerald-500/15 text-emerald-700 shadow-xs dark:text-emerald-300'
                        : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-1.5">
                      <Shield className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                      <span className="truncate">
                        {t.events?.seppukuRiskNumber || 'Number (-21)'}
                      </span>
                    </div>
                    {currentChoice === 'risk_number' && (
                      <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    )}
                  </button>

                  {/* Option 2: Risk Special (+42) */}
                  <button
                    type="button"
                    onClick={() =>
                      handleSelectOutcome(player.id, 'risk_special')
                    }
                    className={`flex items-center justify-between gap-1 rounded-xl border p-2 text-left text-xs font-semibold transition-all ${
                      currentChoice === 'risk_special'
                        ? 'border-rose-500 bg-rose-500/15 text-rose-700 shadow-xs dark:text-rose-300'
                        : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-1.5">
                      <Skull className="h-3.5 w-3.5 shrink-0 text-rose-500" />
                      <span className="truncate">
                        {t.events?.seppukuRiskSpecial || 'Special (+42)'}
                      </span>
                    </div>
                    {currentChoice === 'risk_special' && (
                      <Check className="h-3.5 w-3.5 shrink-0 text-rose-600 dark:text-rose-400" />
                    )}
                  </button>

                  {/* Option 3: No Risk (+21) */}
                  <button
                    type="button"
                    onClick={() => handleSelectOutcome(player.id, 'no_risk')}
                    className={`flex items-center justify-between gap-1 rounded-xl border p-2 text-left text-xs font-semibold transition-all ${
                      currentChoice === 'no_risk'
                        ? 'border-amber-500 bg-amber-500/15 text-amber-700 shadow-xs dark:text-amber-300'
                        : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-1.5">
                      <Flame className="h-3.5 w-3.5 shrink-0 text-amber-500" />
                      <span className="truncate">
                        {t.events?.seppukuNoRisk || 'No Risk (+21)'}
                      </span>
                    </div>
                    {currentChoice === 'no_risk' && (
                      <Check className="h-3.5 w-3.5 shrink-0 text-amber-600 dark:text-amber-400" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="flex shrink-0 items-center justify-end gap-2 border-t border-neutral-200 bg-neutral-50 px-4 py-3 sm:gap-3 sm:px-6 sm:py-4 dark:border-neutral-800 dark:bg-neutral-900/60">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 sm:px-4 sm:py-2.5 sm:text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
          >
            {t.setup?.cancel || 'Cancel'}
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 px-4 py-2 text-xs font-extrabold text-white shadow-md transition-all hover:from-rose-400 hover:to-rose-500 active:scale-95 sm:px-6 sm:py-2.5 sm:text-sm"
          >
            <Swords className="h-4 w-4 shrink-0" />
            <span>{t.events?.seppukuApply || 'Apply Seppuku'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
