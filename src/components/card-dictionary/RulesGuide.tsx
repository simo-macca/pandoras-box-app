import React from 'react';
import {
  Trophy,
  AlertTriangle,
  Sparkles,
  Flame,
  Zap,
  RotateCcw,
  Info,
} from 'lucide-react';
import { Language } from '@/types/game';
import { TRANSLATIONS } from '@/data/translations';
import { RULES_GUIDE } from '@/data/rulesGuideContent';
import { CARD_POINTS, SCORE_PRESETS } from '@/utils/scoring';
import { RichText } from '@/components/common/RichText';
import { OfficialPdfBanner } from './OfficialPdfBanner';
import { GuideSection } from './GuideSection';

interface RulesGuideProps {
  language: Language;
}

const ICON_CLASS = 'h-5 w-5 stroke-[2.2]';

interface PresetGroupProps {
  title: string;
  presets: { short: number; medium: number; long: number };
  language: Language;
}

const PresetGroup: React.FC<PresetGroupProps> = ({
  title,
  presets,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const columns = [
    { value: presets.short, label: t.setup.shortGame },
    { value: presets.medium, label: t.setup.mediumGame },
    { value: presets.long, label: t.setup.longGame },
  ];
  return (
    <div className="space-y-2 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700/80 dark:bg-neutral-800/50">
      <span className="text-[11px] font-bold tracking-wider text-neutral-900 uppercase dark:text-white">
        {title}
      </span>
      <div className="grid grid-cols-3 gap-2 pt-1 text-center">
        {columns.map(({ value, label }) => (
          <div
            key={label}
            className="rounded-xl border border-neutral-200 bg-white p-2 dark:border-neutral-700 dark:bg-neutral-900"
          >
            <div className="text-sm font-extrabold text-amber-500">
              {value} pts
            </div>
            <div className="text-[10px] font-semibold text-neutral-400">
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface PointTileProps {
  points: string;
  pointsClass: string;
  cardName?: string;
  description: string;
  highlight?: boolean;
}

const PointTile: React.FC<PointTileProps> = ({
  points,
  pointsClass,
  cardName,
  description,
  highlight = false,
}) => (
  <div
    className={`rounded-2xl border p-3 ${
      highlight
        ? 'border-red-500/30 bg-red-500/10'
        : 'border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800/50'
    }`}
  >
    <span className={`font-mono text-base font-black ${pointsClass}`}>
      {points}
    </span>
    <p className="mt-0.5 text-[11px] text-neutral-500 dark:text-neutral-400">
      {cardName ? (
        <>
          <strong>{cardName}</strong> ({description})
        </>
      ) : (
        description
      )}
    </p>
  </div>
);

interface TimingCardProps {
  badge: string;
  label: string;
  text: string;
  tone: 'cyan' | 'amber';
}

const TIMING_TONES = {
  cyan: {
    box: 'border-cyan-500/25 bg-cyan-500/10',
    title: 'text-cyan-600 dark:text-cyan-400',
    badge: 'bg-cyan-500',
  },
  amber: {
    box: 'border-amber-500/25 bg-amber-500/10',
    title: 'text-amber-600 dark:text-amber-400',
    badge: 'bg-amber-500',
  },
} as const;

const TimingCard: React.FC<TimingCardProps> = ({
  badge,
  label,
  text,
  tone,
}) => {
  const styles = TIMING_TONES[tone];
  return (
    <div className={`space-y-1 rounded-2xl border p-3.5 ${styles.box}`}>
      <span className={`flex items-center gap-1.5 font-black ${styles.title}`}>
        <span
          className={`flex h-5 w-5 items-center justify-center rounded-md font-mono text-[10px] text-white ${styles.badge}`}
        >
          {badge}
        </span>
        <span>{label}</span>
      </span>
      <p className="text-[11px] text-neutral-600 dark:text-neutral-300">
        {text}
      </p>
    </div>
  );
};

/** Short, localized summary of the official rules (Rules tab). */
export const RulesGuide: React.FC<RulesGuideProps> = ({ language }) => {
  const { goal, preparation, turns, points, blackCards, powerCards } =
    RULES_GUIDE;
  const l = (map: Record<Language, string>) => map[language];

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <OfficialPdfBanner language={language} />

      <GuideSection
        icon={<Trophy className={ICON_CLASS} />}
        accentClass="text-amber-500"
        title={l(goal.title)}
      >
        <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          <RichText text={l(goal.body)} />
        </p>
      </GuideSection>

      <GuideSection
        icon={<AlertTriangle className={ICON_CLASS} />}
        accentClass="text-rose-500"
        title={l(preparation.title)}
      >
        <div className="grid grid-cols-1 gap-3 text-xs sm:grid-cols-2">
          <PresetGroup
            title={l(preparation.fewPlayers)}
            presets={SCORE_PRESETS.few}
            language={language}
          />
          <PresetGroup
            title={l(preparation.manyPlayers)}
            presets={SCORE_PRESETS.many}
            language={language}
          />
        </div>
        <ul className="list-inside list-disc space-y-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
          {preparation.items.map((item) => (
            <li key={item.label.en}>
              <strong>{l(item.label)}</strong> {l(item.text)}
            </li>
          ))}
        </ul>
      </GuideSection>

      <GuideSection
        icon={<RotateCcw className={ICON_CLASS} />}
        accentClass="text-blue-500"
        title={l(turns.title)}
      >
        <div className="space-y-2 text-xs leading-relaxed text-neutral-700 sm:text-sm dark:text-neutral-300">
          <p>{l(turns.body)}</p>
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-3.5 text-xs font-medium text-amber-700 dark:text-amber-300">
            <strong>{l(turns.endTitle)}</strong>
            <ul className="mt-1 list-inside list-disc space-y-1">
              {turns.endConditions.map((condition) => (
                <li key={condition.en}>{l(condition)}</li>
              ))}
            </ul>
          </div>
        </div>
      </GuideSection>

      <GuideSection
        icon={<Sparkles className={ICON_CLASS} />}
        accentClass="text-purple-500"
        title={l(points.title)}
      >
        <div className="grid grid-cols-2 gap-2.5 text-xs sm:grid-cols-3">
          <PointTile
            points="1 – 10 pts"
            pointsClass="text-neutral-900 dark:text-white"
            description={l(points.numberCards)}
          />
          <PointTile
            points={`${CARD_POINTS.SPECIAL} pts`}
            pointsClass="text-purple-600 dark:text-purple-400"
            description={l(points.specialCards)}
          />
          <PointTile
            points={`${CARD_POINTS.CURSE} pts`}
            pointsClass="text-indigo-500"
            cardName="Curse"
            description={l(points.curse)}
          />
          <PointTile
            points={`${CARD_POINTS.THE_END} pts`}
            pointsClass="text-red-500"
            cardName="The End"
            description={l(points.theEnd)}
          />
          <PointTile
            points={`${CARD_POINTS.MIMICRY} pts`}
            pointsClass="text-teal-500"
            cardName="Mimicry"
            description={l(points.mimicry)}
          />
          <PointTile
            points={`${CARD_POINTS.FUCK_YOU} pts!`}
            pointsClass="text-red-600 dark:text-red-400"
            cardName="Fuck You"
            description={l(points.fuckYou)}
            highlight
          />
        </div>
        <p className="text-[11px] text-neutral-500 italic dark:text-neutral-400">
          * {l(points.powerCardsNote)}
        </p>
      </GuideSection>

      <GuideSection
        icon={<Flame className={ICON_CLASS} />}
        accentClass="text-amber-500 dark:text-amber-400"
        title={l(blackCards.title)}
      >
        <div className="space-y-2.5 text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
          <p>
            <RichText text={l(blackCards.body)} />
          </p>
          <div className="space-y-1.5 rounded-2xl border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-700/80 dark:bg-neutral-800/80">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
              <Info className="h-4 w-4" />
              <span>{l(blackCards.ruleTitle)}</span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-300">
              <RichText text={l(blackCards.rule)} />
            </p>
          </div>
        </div>
      </GuideSection>

      <GuideSection
        icon={<Zap className={ICON_CLASS} />}
        accentClass="text-cyan-500"
        title={l(powerCards.title)}
      >
        <p className="text-xs leading-relaxed text-neutral-700 sm:text-sm dark:text-neutral-300">
          <RichText text={l(powerCards.body)} />
        </p>
        <div className="grid grid-cols-1 gap-3 pt-1 text-xs sm:grid-cols-2">
          <TimingCard
            badge="1ST"
            label={l(powerCards.firstLabel)}
            text={l(powerCards.first)}
            tone="cyan"
          />
          <TimingCard
            badge="2ND"
            label={l(powerCards.secondLabel)}
            text={l(powerCards.second)}
            tone="amber"
          />
        </div>
      </GuideSection>
    </div>
  );
};
