import React, { useState, useEffect } from 'react';
import { X, Flame, Skull, Shield, Check, Swords, Edit2 } from 'lucide-react';
import { Player, Language, SeppukuOutcome } from '../../types/game';
import { TRANSLATIONS } from '../../data/translations';
import { soundEffects } from '../../utils/sound';
import { getPlayerColorTheme } from '../../utils/colors';

interface SeppukuModalProps {
  isOpen: boolean;
  onClose: () => void;
  players: Player[];
  onApplySeppuku: (
    choices: Record<string, SeppukuOutcome>,
    existingRoundId?: string
  ) => void;
  language: Language;
  editingRoundId?: string | null;
  initialChoices?: Record<string, SeppukuOutcome>;
}

export const SeppukuModal: React.FC<SeppukuModalProps> = ({
  isOpen,
  onClose,
  players,
  onApplySeppuku,
  language,
  editingRoundId,
  initialChoices,
}) => {
  const t = TRANSLATIONS[language];
  const isEditing = Boolean(editingRoundId);

  // Default every player to 'no_risk' (+21 pts) or use initialChoices if editing
  const [choices, setChoices] = useState<Record<string, SeppukuOutcome>>({});

  useEffect(() => {
    if (isOpen) {
      const initial: Record<string, SeppukuOutcome> = {};
      players.forEach((p) => {
        initial[p.id] = initialChoices?.[p.id] || 'no_risk';
      });
      setChoices(initial);
    }
  }, [isOpen, players, initialChoices]);

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
    onApplySeppuku(choices, editingRoundId || undefined);
    onClose();
  };

  return (
    <div className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-2 backdrop-blur-sm sm:p-4">
      <div className="relative flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl dark:border-neutral-800 dark:bg-neutral-900">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-neutral-200 bg-neutral-50 px-4 py-3 sm:px-6 sm:py-4 dark:border-neutral-800 dark:bg-neutral-900/60">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="flex items-center gap-2 text-base font-black text-neutral-900 sm:text-lg md:text-xl dark:text-white">
                <Swords className="h-5 w-5 shrink-0 text-rose-500" />
                <span className="truncate">
                  {isEditing
                    ? t.events?.seppukuEditTitle ||
                      'Edit Seppuku T – Adjust Choices'
                    : t.events?.seppukuTitle || 'Seppuku T – Point Adjustments'}
                </span>
              </h2>
              {isEditing && (
                <span className="inline-flex items-center gap-1 rounded-lg border border-amber-500/30 bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-300">
                  <Edit2 className="h-3 w-3" />
                  <span>{t.events?.seppukuEditBadge || 'Edit Mode'}</span>
                </span>
              )}
            </div>
            <p className="mt-0.5 truncate text-xs text-neutral-500 dark:text-neutral-400">
              {isEditing
                ? t.events?.seppukuEditSubtitle ||
                  'Correct previously recorded player choices and update cumulative points'
                : t.events?.seppukuSubtitle ||
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

        {/* Body Container */}
        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-3 sm:space-y-4 sm:p-6">
          {/* Rules Logic Callout Banner */}
          <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-3 sm:p-4 dark:border-rose-500/30 dark:bg-rose-950/20">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-700 dark:text-rose-400">
              <Swords className="h-4 w-4 shrink-0 text-rose-500" />
              <span>
                {t.events?.seppukuRuleBannerTitle ||
                  "Card Rules: Seppuku T (D'Sinead Conception)"}
              </span>
            </div>
            <div className="mt-2 grid grid-cols-1 gap-2 text-xs text-neutral-600 sm:grid-cols-2 dark:text-neutral-300">
              <div className="flex items-start gap-2 rounded-xl border border-emerald-500/25 bg-emerald-500/10 p-2 text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-950/40 dark:text-emerald-300">
                <Shield className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <div className="min-w-0 leading-snug">
                  <span className="font-bold">
                    {t.events?.seppukuActionRiskNumberTitle || 'Take Risk'}
                  </span>
                  :{' '}
                  {t.events?.seppukuRuleRiskText ||
                    'Number card = -21 pts | Non-number / Special = +42 pts'}
                </div>
              </div>
              <div className="flex items-start gap-2 rounded-xl border border-amber-500/25 bg-amber-500/10 p-2 text-amber-900 dark:border-amber-500/30 dark:bg-amber-950/40 dark:text-amber-300">
                <Flame className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600 dark:text-amber-400" />
                <div className="min-w-0 leading-snug">
                  <span className="font-bold">
                    {t.events?.seppukuActionNoRiskTitle || 'No Risk'}
                  </span>
                  :{' '}
                  {t.events?.seppukuRuleRefuseText || 'Refused draw = +21 pts'}
                </div>
              </div>
            </div>
          </div>

          {/* Player Choices List */}
          {players.map((player, index) => {
            const currentChoice = choices[player.id] || 'no_risk';
            const colorTheme = getPlayerColorTheme(player.color);

            return (
              <div
                key={player.id}
                className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-3 shadow-xs dark:border-neutral-800 dark:bg-neutral-800/40"
              >
                {/* Player header */}
                <div className="mb-2.5 flex items-center justify-between gap-2">
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

                {/* 3 Option Card Buttons */}
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {/* Option 1: Risk Number (-21) */}
                  <button
                    type="button"
                    onClick={() =>
                      handleSelectOutcome(player.id, 'risk_number')
                    }
                    aria-label={`Player ${player.name}: ${t.events?.seppukuActionRiskNumberTitle || 'Risk: Number Card'} (-21 pts)`}
                    className={`flex flex-col justify-between rounded-xl border p-2.5 text-left transition-all ${
                      currentChoice === 'risk_number'
                        ? 'border-emerald-500 bg-emerald-500/15 shadow-sm ring-1 ring-emerald-500/50 dark:bg-emerald-950/40'
                        : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                        <Shield className="h-4 w-4 shrink-0 text-emerald-500" />
                        <span>
                          {t.events?.seppukuActionRiskNumberTitle ||
                            'Risk: Drew Number'}
                        </span>
                      </div>
                      {currentChoice === 'risk_number' && (
                        <Check className="h-4 w-4 shrink-0 stroke-[3] text-emerald-600 dark:text-emerald-400" />
                      )}
                    </div>
                    <p className="my-1.5 text-[11px] leading-tight text-neutral-500 dark:text-neutral-400">
                      {t.events?.seppukuActionRiskNumberDesc ||
                        'Flipped a numbered card (1–10)'}
                    </p>
                    <div className="mt-auto">
                      <span className="inline-flex items-center rounded-lg border border-emerald-500/30 bg-emerald-500/20 px-2 py-0.5 font-mono text-[11px] font-black text-emerald-700 dark:text-emerald-300">
                        -21 pts
                      </span>
                    </div>
                  </button>

                  {/* Option 2: Risk Special (+42) */}
                  <button
                    type="button"
                    onClick={() =>
                      handleSelectOutcome(player.id, 'risk_special')
                    }
                    aria-label={`Player ${player.name}: ${t.events?.seppukuActionRiskSpecialTitle || 'Risk: Non-number / Special'} (+42 pts)`}
                    className={`flex flex-col justify-between rounded-xl border p-2.5 text-left transition-all ${
                      currentChoice === 'risk_special'
                        ? 'border-rose-500 bg-rose-500/15 shadow-sm ring-1 ring-rose-500/50 dark:bg-rose-950/40'
                        : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 dark:text-rose-300">
                        <Skull className="h-4 w-4 shrink-0 text-rose-500" />
                        <span>
                          {t.events?.seppukuActionRiskSpecialTitle ||
                            'Risk: Drew Special'}
                        </span>
                      </div>
                      {currentChoice === 'risk_special' && (
                        <Check className="h-4 w-4 shrink-0 stroke-[3] text-rose-600 dark:text-rose-400" />
                      )}
                    </div>
                    <p className="my-1.5 text-[11px] leading-tight text-neutral-500 dark:text-neutral-400">
                      {t.events?.seppukuActionRiskSpecialDesc ||
                        'Flipped an action or special card'}
                    </p>
                    <div className="mt-auto">
                      <span className="inline-flex items-center rounded-lg border border-rose-500/30 bg-rose-500/20 px-2 py-0.5 font-mono text-[11px] font-black text-rose-700 dark:text-rose-300">
                        +42 pts
                      </span>
                    </div>
                  </button>

                  {/* Option 3: No Risk (+21) */}
                  <button
                    type="button"
                    onClick={() => handleSelectOutcome(player.id, 'no_risk')}
                    aria-label={`Player ${player.name}: ${t.events?.seppukuActionNoRiskTitle || 'No Risk'} (+21 pts)`}
                    className={`flex flex-col justify-between rounded-xl border p-2.5 text-left transition-all ${
                      currentChoice === 'no_risk'
                        ? 'border-amber-500 bg-amber-500/15 shadow-sm ring-1 ring-amber-500/50 dark:bg-amber-950/40'
                        : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-300">
                        <Flame className="h-4 w-4 shrink-0 text-amber-500" />
                        <span>
                          {t.events?.seppukuActionNoRiskTitle ||
                            'Refuse Seppuku'}
                        </span>
                      </div>
                      {currentChoice === 'no_risk' && (
                        <Check className="h-4 w-4 shrink-0 stroke-[3] text-amber-600 dark:text-amber-400" />
                      )}
                    </div>
                    <p className="my-1.5 text-[11px] leading-tight text-neutral-500 dark:text-neutral-400">
                      {t.events?.seppukuActionNoRiskDesc ||
                        'Declined to draw a card; safe play'}
                    </p>
                    <div className="mt-auto">
                      <span className="inline-flex items-center rounded-lg border border-amber-500/30 bg-amber-500/20 px-2 py-0.5 font-mono text-[11px] font-black text-amber-700 dark:text-amber-300">
                        +21 pts
                      </span>
                    </div>
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
            <span>
              {isEditing
                ? t.setup?.saveChanges || 'Save Changes'
                : t.events?.seppukuApply || 'Apply Seppuku'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
