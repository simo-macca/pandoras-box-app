import React, { useState } from 'react';
import {
  Pencil,
  Trash2,
  Trophy,
  Layers,
  Skull,
  Bomb,
  ArrowLeftRight,
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
import { RULE_CARDS_DATA } from '@/data/ruleCards';
import { SEPPUKU_POINTS } from '@/utils/scoring';
import { PAWN_COLORS } from '@/utils/colors';
import { HistoryScoreCell, ScoreCellTone } from './HistoryScoreCell';

interface RoundHistoryEntryProps {
  round: RoundEntry;
  players: Player[];
  onEditRound?: (roundNumber: number) => void;
  onDeleteRound?: (roundNumber: number, entryId?: string) => void;
  onEditSeppuku?: (roundId: string) => void;
  language: Language;
}

/** Left accent for events; rounds use their winners' colours instead. */
const ENTRY_ACCENTS: Record<string, string> = {
  round: 'bg-neutral-300 dark:bg-neutral-600',
  seppuku: 'bg-rose-500',
  'late-joiner': 'bg-emerald-500',
  'identity-theft': 'bg-indigo-500',
};

const BADGE_STYLES = {
  round: 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
  seppuku: 'bg-rose-500/15 text-rose-700 dark:text-rose-300',
  'late-joiner': 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
  'identity-theft': 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300',
} as const;

type EntryKind = keyof typeof BADGE_STYLES;

function getEntryKind(round: RoundEntry): EntryKind {
  if (!round.isEvent) return 'round';
  if (round.eventType === 'seppuku') return 'seppuku';
  if (round.eventType === 'late-joiner') return 'late-joiner';
  return 'identity-theft';
}

/**
 * Accent for a scored round: the winner's colour; several winners share the
 * stripe in equal segments (seating order); no winner (e.g. Doomsday) keeps
 * the neutral default.
 */
function getWinnerAccentStyle(
  round: RoundEntry,
  players: Player[]
): React.CSSProperties | undefined {
  const colors = players
    .filter((p) => round.scores[p.id]?.isWinner)
    .map((p) => PAWN_COLORS[p.color]?.hex)
    .filter(Boolean);
  if (colors.length === 0) return undefined;
  if (colors.length === 1) return { backgroundColor: colors[0] };
  const step = 100 / colors.length;
  const stops = colors.map(
    (c, i) => `${c} ${(i * step).toFixed(2)}% ${((i + 1) * step).toFixed(2)}%`
  );
  return { backgroundImage: `linear-gradient(to bottom, ${stops.join(', ')})` };
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
            className={`shrink-0 rounded-lg px-2.5 py-1 text-xs font-bold whitespace-nowrap tabular-nums ${BADGE_STYLES.round}`}
          >
            {t.scoreboard.round} {round.roundNumber}
          </span>
          {getRoundRuleCards(round).map((card) => (
            <span
              key={card.id}
              className="flex max-w-40 items-center gap-1 truncate rounded-lg bg-purple-500/12 px-2 py-1 text-xs font-semibold text-purple-700 sm:max-w-56 dark:text-purple-300"
            >
              <Layers className="h-3 w-3 shrink-0" />
              <span className="truncate">{card.name[language]}</span>
            </span>
          ))}
        </>
      );
    }

    const meta = {
      seppuku: { icon: Swords, label: t.events.seppuku },
      'late-joiner': { icon: UserPlus, label: t.events.lateJoiner },
      'identity-theft': { icon: ArrowLeftRight, label: t.events.identityTheft },
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
          className={`flex shrink-0 items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold whitespace-nowrap tabular-nums ${BADGE_STYLES[kind]}`}
        >
          <Icon className="h-3.5 w-3.5 shrink-0" />
          <span>{meta.label}</span>
        </span>
        {detail && (
          <span className="hidden truncate text-xs text-neutral-500 sm:inline dark:text-neutral-400">
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
    <article className="card relative overflow-hidden p-4">
      <span
        aria-hidden="true"
        className={`absolute inset-y-0 left-0 w-1 ${ENTRY_ACCENTS[kind]}`}
        style={
          kind === 'round' ? getWinnerAccentStyle(round, players) : undefined
        }
      />
      {/* Header: title and actions */}
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">{renderTitle()}</div>

        <div className="flex shrink-0 items-center gap-1">
          {kind === 'round' && onEditRound && (
            <button
              type="button"
              onClick={() => onEditRound(round.roundNumber)}
              className="btn-icon btn-icon-sm"
              title={t.scoreboard.editRound}
              aria-label={t.scoreboard.editRound}
            >
              <Pencil className="h-4 w-4" />
            </button>
          )}

          {kind === 'seppuku' && onEditSeppuku && round.id && (
            <button
              type="button"
              onClick={() => onEditSeppuku(round.id!)}
              className="btn-icon btn-icon-sm"
              title={t.events.editSeppukuTooltip}
              aria-label={t.events.editSeppukuTooltip}
            >
              <Pencil className="h-4 w-4" />
            </button>
          )}

          {onDeleteRound &&
            (isConfirmingDelete ? (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    if (round.id) onDeleteRound(round.roundNumber, round.id);
                    else onDeleteRound(round.roundNumber);
                    setIsConfirmingDelete(false);
                  }}
                  className="btn btn-danger btn-sm h-7 px-2.5"
                >
                  {t.setup.confirm}
                </button>
                <button
                  type="button"
                  onClick={() => setIsConfirmingDelete(false)}
                  className="btn-icon btn-icon-sm h-7 w-7"
                  aria-label={t.setup.cancel}
                >
                  <X className="h-3.5 w-3.5 shrink-0" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsConfirmingDelete(true)}
                className="btn-icon btn-icon-sm hover:bg-rose-500/10 hover:text-rose-600 dark:hover:bg-rose-500/15 dark:hover:text-rose-400"
                title={t.scoreboard.deleteRound}
                aria-label={t.scoreboard.deleteRound}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            ))}
        </div>
      </div>

      {/* Per-player results */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {players.map((player) => {
          const score = round.scores[player.id];
          return score ? (
            <React.Fragment key={player.id}>
              {renderCell(player, score)}
            </React.Fragment>
          ) : null;
        })}
      </div>
    </article>
  );
};
