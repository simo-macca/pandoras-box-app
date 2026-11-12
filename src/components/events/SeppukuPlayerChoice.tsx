import React from 'react';
import { Check, Flame, Shield, Skull, LucideIcon } from 'lucide-react';
import { Language, Player, SeppukuOutcome } from '@/types/game';
import { TRANSLATIONS } from '@/data/translations';
import { getPlayerColorTheme } from '@/utils/colors';
import { SEPPUKU_POINTS } from '@/utils/scoring';

interface SeppukuPlayerChoiceProps {
  player: Player;
  /** Position in the order of play (1-based). */
  position: number;
  choice: SeppukuOutcome;
  onSelect: (outcome: SeppukuOutcome) => void;
  language: Language;
}

const OPTION_STYLES: Record<
  SeppukuOutcome,
  {
    icon: LucideIcon;
    selected: string;
    title: string;
    iconColor: string;
    check: string;
    pill: string;
    total: string;
  }
> = {
  risk_number: {
    icon: Shield,
    selected:
      'border-emerald-500 bg-emerald-500/15 shadow-sm ring-1 ring-emerald-500/50 dark:bg-emerald-950/40',
    title: 'text-emerald-700 dark:text-emerald-300',
    iconColor: 'text-emerald-500',
    check: 'text-emerald-600 dark:text-emerald-400',
    pill: 'border-emerald-500/30 bg-emerald-500/20 text-emerald-700 dark:text-emerald-300',
    total: 'text-emerald-600 dark:text-emerald-400',
  },
  risk_special: {
    icon: Skull,
    selected:
      'border-rose-500 bg-rose-500/15 shadow-sm ring-1 ring-rose-500/50 dark:bg-rose-950/40',
    title: 'text-rose-700 dark:text-rose-300',
    iconColor: 'text-rose-500',
    check: 'text-rose-600 dark:text-rose-400',
    pill: 'border-rose-500/30 bg-rose-500/20 text-rose-700 dark:text-rose-300',
    total: 'text-rose-600 dark:text-rose-400',
  },
  no_risk: {
    icon: Flame,
    selected:
      'border-amber-500 bg-amber-500/15 shadow-sm ring-1 ring-amber-500/50 dark:bg-amber-950/40',
    title: 'text-amber-700 dark:text-amber-300',
    iconColor: 'text-amber-500',
    check: 'text-amber-600 dark:text-amber-400',
    pill: 'border-amber-500/30 bg-amber-500/20 text-amber-700 dark:text-amber-300',
    total: 'text-amber-600 dark:text-amber-400',
  },
};

const OUTCOMES: SeppukuOutcome[] = ['risk_number', 'risk_special', 'no_risk'];

const formatPoints = (points: number) =>
  `${points > 0 ? '+' : ''}${points} pts`;

/** One player's Seppuku decision (rulebook p. 16). */
export const SeppukuPlayerChoice: React.FC<SeppukuPlayerChoiceProps> = ({
  player,
  position,
  choice,
  onSelect,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const colorTheme = getPlayerColorTheme(player.color);
  const labels: Record<SeppukuOutcome, { title: string; desc: string }> = {
    risk_number: {
      title: t.events.seppukuActionRiskNumberTitle,
      desc: t.events.seppukuActionRiskNumberDesc,
    },
    risk_special: {
      title: t.events.seppukuActionRiskSpecialTitle,
      desc: t.events.seppukuActionRiskSpecialDesc,
    },
    no_risk: {
      title: t.events.seppukuActionNoRiskTitle,
      desc: t.events.seppukuActionNoRiskDesc,
    },
  };

  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-3 shadow-xs dark:border-neutral-800 dark:bg-neutral-800/40">
      <div className="mb-2.5 flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-[10px] font-bold text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300">
            {position}
          </span>
          <span
            className={`h-2.5 w-2.5 shrink-0 rounded-full ${colorTheme.accentBg}`}
          />
          <span className="truncate text-sm font-bold text-neutral-900 dark:text-white">
            {player.name}
          </span>
        </div>
        <span
          className={`font-mono text-xs font-black ${OPTION_STYLES[choice].total}`}
        >
          {formatPoints(SEPPUKU_POINTS[choice])}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {OUTCOMES.map((outcome) => {
          const styles = OPTION_STYLES[outcome];
          const Icon = styles.icon;
          const isSelected = choice === outcome;
          const points = formatPoints(SEPPUKU_POINTS[outcome]);
          return (
            <button
              key={outcome}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelect(outcome)}
              aria-label={`${player.name}: ${labels[outcome].title} (${points})`}
              className={`flex flex-col justify-between rounded-xl border p-2.5 text-left transition-all ${
                isSelected
                  ? styles.selected
                  : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
              }`}
            >
              <div className="flex items-center justify-between gap-1">
                <div
                  className={`flex items-center gap-1.5 text-xs font-bold ${styles.title}`}
                >
                  <Icon className={`h-4 w-4 shrink-0 ${styles.iconColor}`} />
                  <span>{labels[outcome].title}</span>
                </div>
                {isSelected && (
                  <Check
                    className={`h-4 w-4 shrink-0 stroke-3 ${styles.check}`}
                  />
                )}
              </div>
              <p className="my-1.5 text-[11px] leading-tight text-neutral-500 dark:text-neutral-400">
                {labels[outcome].desc}
              </p>
              <div className="mt-auto">
                <span
                  className={`inline-flex items-center rounded-lg border px-2 py-0.5 font-mono text-[11px] font-black ${styles.pill}`}
                >
                  {points}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
