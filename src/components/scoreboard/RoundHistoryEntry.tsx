import React, { useState } from 'react';
import {
  Edit3,
  Trash2,
  Trophy,
  Sparkles,
  Skull,
  Bomb,
  UserCheck,
  Swords,
  UserPlus,
  X,
} from 'lucide-react';
import {
  HandScore,
  Language,
  Player,
  RoundEntry,
  SeppukuEventMetadata,
} from '@/types/game';
import { TRANSLATIONS } from '@/data/translations';
import { RULE_CARDS_DATA } from '@/data/ruleCardsData';
import { SEPPUKU_POINTS } from '@/utils/scoring';
import { HistoryScoreCell, ScoreCellTone } from './HistoryScoreCell';

interface RoundHistoryEntryProps {
  round: RoundEntry;
  players: Player[];
  onEditRound?: (roundNumber: number) => void;
  onDeleteRound?: (roundNumber: number, entryId?: string) => void;
  onEditSeppuku?: (roundId: string) => void;
  language: Language;
}

const ENTRY_STYLES: Record<string, string> = {
  round:
    'border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900',
  seppuku:
    'border-rose-500/30 bg-rose-500/3 dark:border-rose-500/20 dark:bg-rose-950/20',
  'late-joiner':
    'border-emerald-500/30 bg-emerald-500/3 dark:border-emerald-500/20 dark:bg-emerald-950/20',
  'identity-theft':
    'border-indigo-500/30 bg-indigo-500/3 dark:border-indigo-500/20 dark:bg-indigo-950/20',
};

const BADGE_STYLES = {
  round:
    'border-amber-500/30 bg-amber-500/15 text-amber-600 dark:text-amber-400',
  seppuku: 'border-rose-500/30 bg-rose-500/15 text-rose-600 dark:text-rose-400',
  'late-joiner':
    'border-emerald-500/30 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
  'identity-theft':
    'border-indigo-500/30 bg-indigo-500/15 text-indigo-600 dark:text-indigo-400',
} as const;

type EntryKind = keyof typeof BADGE_STYLES;

function getEntryKind(round: RoundEntry): EntryKind {
  if (!round.isEvent) return 'round';
  if (round.eventType === 'seppuku') return 'seppuku';
  if (round.eventType === 'late-joiner') return 'late-joiner';
  return 'identity-theft';
}

/** Rule cards that were active when the round was scored. */
function getRoundRuleCards(round: RoundEntry) {
  const ids =
    round.activeRuleCardIds && round.activeRuleCardIds.length > 0
      ? round.activeRuleCardIds
      : round.activeRuleCardId
        ? [round.activeRuleCardId]
        : [];
  return RULE_CARDS_DATA.filter((c) => ids.includes(c.id));
}

/** One round or event in the match history, with its per-player results. */
export const RoundHistoryEntry: React.FC<RoundHistoryEntryProps> = ({
  round,
  players,
  onEditRound,
  onDeleteRound,
  onEditSeppuku,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const kind = getEntryKind(round);

  const renderTitle = () => {
    if (kind === 'round') {
      return (
        <>
          <span
            className={`shrink-0 rounded-xl border px-2.5 py-1 text-xs font-black whitespace-nowrap tabular-nums ${BADGE_STYLES.round}`}
          >
            {t.scoreboard.round} {round.roundNumber}
          </span>
          {getRoundRuleCards(round).map((card) => (
            <span
              key={card.id}
              className="flex max-w-40 items-center gap-1 truncate rounded-xl border border-purple-500/30 bg-purple-500/15 px-2 py-1 text-xs font-bold text-purple-600 sm:max-w-50 sm:px-2.5 dark:text-purple-400"
            >
              <Sparkles className="h-3 w-3 shrink-0" />
              <span className="truncate">{card.name[language]}</span>
            </span>
          ))}
        </>
      );
    }

    const meta = {
      seppuku: { icon: Swords, label: t.events.seppuku },
      'late-joiner': { icon: UserPlus, label: t.events.lateJoiner },
      'identity-theft': { icon: UserCheck, label: t.events.identityTheft },
    }[kind];
    const Icon = meta.icon;
    const metadata = round.eventMetadata;
    const detail =
      kind === 'identity-theft' && metadata && 'lowPlayerName' in metadata
        ? `${metadata.lowPlayerName} (${metadata.lowScoreBefore} pts) ⇄ ${metadata.highPlayerName} (${metadata.highScoreBefore} pts)`
        : round.notes;

    return (
      <>
        <span
          className={`flex shrink-0 items-center gap-1 rounded-xl border px-2.5 py-1 text-xs font-black whitespace-nowrap tabular-nums ${BADGE_STYLES[kind]}`}
        >
          <Icon className="h-3.5 w-3.5 shrink-0" />
          <span>{meta.label}</span>
        </span>
        {detail && (
          <span className="hidden truncate text-xs font-semibold text-neutral-500 sm:inline dark:text-neutral-400">
            {detail}
          </span>
        )}
      </>
    );
  };

  const renderCell = (player: Player, score: HandScore) => {
    if (kind === 'seppuku') {
      const metadata = round.eventMetadata as SeppukuEventMetadata | undefined;
      const outcome = metadata?.choices?.[player.id]?.outcome;
      const isRiskNumber =
        outcome === 'risk_number' ||
        score.totalPoints === SEPPUKU_POINTS.risk_number;
      const isRiskSpecial =
        outcome === 'risk_special' ||
        score.totalPoints === SEPPUKU_POINTS.risk_special;
      const [tone, badge]: [ScoreCellTone, string] = isRiskNumber
        ? ['emerald', t.events.seppukuBadgeNumber]
        : isRiskSpecial
          ? ['rose', t.events.seppukuBadgeSpecial]
          : ['amber', t.events.seppukuBadgeNoRisk];
      return (
        <HistoryScoreCell
          playerName={player.name}
          points={score.totalPoints}
          signed
          tone={tone}
          badge={badge}
        />
      );
    }

    if (kind === 'late-joiner') {
      return (
        <HistoryScoreCell
          playerName={player.name}
          points={score.totalPoints}
          signed
          tone="emerald"
          badge={t.events.lateJoiner}
        />
      );
    }

    if (kind === 'identity-theft') {
      const swapped = score.totalPoints !== 0;
      return (
        <HistoryScoreCell
          playerName={player.name}
          points={score.totalPoints}
          signed
          tone={swapped ? 'indigo' : 'neutral'}
          badge={swapped ? t.events.swappedPoints : undefined}
        />
      );
    }

    const hasTimeBomb =
      Boolean(score.timeBombModifier) && score.timeBombModifier !== 'none';
    return (
      <HistoryScoreCell
        playerName={player.name}
        points={score.totalPoints}
        tone={score.isWinner ? 'winner' : 'neutral'}
        badge={
          score.isWinner ? (
            <Trophy className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
          ) : undefined
        }
        markers={
          <>
            {score.isDoomsday && (
              <span className="flex items-center gap-0.5 text-[10px] font-bold text-purple-500 tabular-nums">
                <Skull className="h-3 w-3 shrink-0" />
                50
              </span>
            )}
            {hasTimeBomb && (
              <Bomb className="h-3 w-3 shrink-0 text-amber-500" />
            )}
          </>
        }
      />
    );
  };

  return (
    <div
      className={`rounded-3xl border p-3 shadow-sm transition-all sm:p-4 ${ENTRY_STYLES[kind]}`}
    >
      {/* Header: title and actions */}
      <div className="mb-3 flex items-center justify-between gap-2 border-b border-neutral-100 pb-3 dark:border-neutral-800">
        <div className="flex min-w-0 items-center gap-2">{renderTitle()}</div>

        <div className="flex shrink-0 items-center gap-1">
          {kind === 'round' && onEditRound && (
            <button
              type="button"
              onClick={() => onEditRound(round.roundNumber)}
              className="rounded-lg p-1.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-amber-500 dark:hover:bg-neutral-800"
              title={t.scoreboard.editRound}
              aria-label={t.scoreboard.editRound}
            >
              <Edit3 className="h-3.5 w-3.5 shrink-0" />
            </button>
          )}

          {kind === 'seppuku' && onEditSeppuku && round.id && (
            <button
              type="button"
              onClick={() => onEditSeppuku(round.id!)}
              className="rounded-lg p-1.5 text-neutral-400 transition-colors hover:bg-rose-500/10 hover:text-rose-500 dark:hover:bg-neutral-800"
              title={t.events.editSeppukuTooltip}
              aria-label={t.events.editSeppukuTooltip}
            >
              <Edit3 className="h-3.5 w-3.5 shrink-0" />
            </button>
          )}

          {onDeleteRound &&
            (isConfirmingDelete ? (
              <div className="flex items-center gap-1 text-[11px]">
                <button
                  type="button"
                  onClick={() => {
                    if (round.id) onDeleteRound(round.roundNumber, round.id);
                    else onDeleteRound(round.roundNumber);
                    setIsConfirmingDelete(false);
                  }}
                  className="rounded-lg bg-red-600 px-2 py-0.5 font-bold text-white"
                >
                  {t.setup.confirm}
                </button>
                <button
                  type="button"
                  onClick={() => setIsConfirmingDelete(false)}
                  className="rounded-lg p-1 text-neutral-400 hover:text-neutral-200"
                  aria-label={t.setup.cancel}
                >
                  <X className="h-3.5 w-3.5 shrink-0" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsConfirmingDelete(true)}
                className="rounded-lg p-1.5 text-neutral-400 transition-colors hover:bg-red-500/10 hover:text-red-500"
                title={t.scoreboard.deleteRound}
                aria-label={t.scoreboard.deleteRound}
              >
                <Trash2 className="h-3.5 w-3.5 shrink-0" />
              </button>
            ))}
        </div>
      </div>

      {/* Per-player results */}
      <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4 sm:gap-2">
        {players.map((player) => {
          const score = round.scores[player.id];
          return score ? (
            <React.Fragment key={player.id}>
              {renderCell(player, score)}
            </React.Fragment>
          ) : null;
        })}
      </div>
    </div>
  );
};
