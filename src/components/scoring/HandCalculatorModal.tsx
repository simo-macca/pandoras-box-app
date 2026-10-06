import React, { useState, useEffect } from 'react';
import {
  X,
  Trophy,
  Check,
  Sparkles,
  RefreshCw,
  Bomb,
  ChevronDown,
  Calculator,
  Hash,
  Zap,
} from 'lucide-react';
import {
  Player,
  HandScore,
  Language,
  TimeBombModifier,
} from '../../types/game';
import { TRANSLATIONS } from '../../data/translations';
import { calculateHandPoints, PlayerStats } from '../../hooks/useGameState';
import { getPlayerColorTheme } from '../../utils/colors';
import { soundEffects } from '../../utils/sound';
import { NumberGrid } from './NumberGrid';
import { SpecialCounters } from './SpecialCounters';

interface HandCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  players: Player[];
  playerStats?: PlayerStats[];
  onSubmitRound: (scores: Record<string, HandScore>) => void;
  language: Language;
  roundNumber: number;
  initialScores?: Record<string, HandScore>;
  isEditing?: boolean;
}

const DEFAULT_HAND_SCORE: Omit<HandScore, 'totalPoints'> = {
  isWinner: false,
  numberCards: {},
  specialCardsCount: 0,
  curseCount: 0,
  theEndCount: 0,
  fuckYouCount: 0,
  mimicryCount: 0,
  isDoomsday: false,
  timeBombModifier: 'none',
  customModifier: 0,
};

export const HandCalculatorModal: React.FC<HandCalculatorModalProps> = ({
  isOpen,
  onClose,
  players,
  playerStats,
  onSubmitRound,
  language,
  roundNumber,
  initialScores,
  isEditing = false,
}) => {
  const t = TRANSLATIONS[language];
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>(
    players[0]?.id || ''
  );

  // Map of playerId -> HandScore
  const [scores, setScores] = useState<Record<string, HandScore>>({});

  useEffect(() => {
    if (!isOpen) return;

    setSelectedPlayerId((prev) =>
      players.length > 0 && !players.some((p) => p.id === prev)
        ? players[0].id
        : prev
    );

    const initial: Record<string, HandScore> = {};
    players.forEach((p) => {
      if (initialScores && initialScores[p.id]) {
        initial[p.id] = initialScores[p.id];
      } else {
        const raw = { ...DEFAULT_HAND_SCORE };
        initial[p.id] = {
          ...raw,
          totalPoints: calculateHandPoints(raw),
        };
      }
    });

    setScores(initial);
  }, [isOpen, players, initialScores]);

  if (!isOpen || players.length === 0) return null;

  const currentScore: HandScore = scores[selectedPlayerId] || {
    ...DEFAULT_HAND_SCORE,
    totalPoints: 0,
  };

  const updateCurrentScore = (
    updates: Partial<Omit<HandScore, 'totalPoints'>>
  ) => {
    setScores((prev) => {
      const existing = prev[selectedPlayerId] || {
        ...DEFAULT_HAND_SCORE,
        totalPoints: 0,
      };
      const merged: Omit<HandScore, 'totalPoints'> = {
        ...existing,
        ...updates,
      };

      // Recalculate points
      const totalPoints = calculateHandPoints(merged);

      return {
        ...prev,
        [selectedPlayerId]: {
          ...merged,
          totalPoints,
        },
      };
    });
  };

  const handleWinnerToggle = () => {
    const nextIsWinner = !currentScore.isWinner;
    soundEffects.playClick();

    // If setting as winner, clear other winner marks if desired, or allow multiple if simultaneous
    setScores((prev) => {
      const updated = { ...prev };
      if (nextIsWinner) {
        // optionally reset other winners
        players.forEach((p) => {
          if (p.id !== selectedPlayerId && updated[p.id]?.isWinner) {
            const cleared = { ...updated[p.id], isWinner: false };
            updated[p.id] = {
              ...cleared,
              totalPoints: calculateHandPoints(cleared),
            };
          }
        });
      }

      const merged: Omit<HandScore, 'totalPoints'> = {
        ...currentScore,
        isWinner: nextIsWinner,
        // If winner, reset cards to 0
        ...(nextIsWinner
          ? {
              numberCards: {},
              specialCardsCount: 0,
              curseCount: 0,
              theEndCount: 0,
              fuckYouCount: 0,
              mimicryCount: 0,
            }
          : {}),
      };

      updated[selectedPlayerId] = {
        ...merged,
        totalPoints: calculateHandPoints(merged),
      };

      return updated;
    });
  };

  const handleDoomsdayToggle = () => {
    const next = !currentScore.isDoomsday;
    soundEffects.playClick();
    // Doomsday usually affects ALL players in round!
    setScores((prev) => {
      const updated = { ...prev };
      players.forEach((p) => {
        const pScore = updated[p.id] || {
          ...DEFAULT_HAND_SCORE,
          totalPoints: 0,
        };
        const merged = { ...pScore, isDoomsday: next };
        updated[p.id] = {
          ...merged,
          totalPoints: calculateHandPoints(merged),
        };
      });
      return updated;
    });
  };

  const handleResetCurrentPlayer = () => {
    soundEffects.playClick();
    const raw = { ...DEFAULT_HAND_SCORE };
    setScores((prev) => ({
      ...prev,
      [selectedPlayerId]: {
        ...raw,
        totalPoints: calculateHandPoints(raw),
      },
    }));
  };

  const handleSubmit = () => {
    soundEffects.playClick();
    onSubmitRound(scores);
    onClose();
  };

  const activePlayer =
    players.find((p) => p.id === selectedPlayerId) || players[0];
  const activeColorTheme = getPlayerColorTheme(activePlayer.color);

  return (
    <div className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2 backdrop-blur-sm sm:p-4">
      <div className="relative flex max-h-[90dvh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl sm:rounded-3xl dark:border-neutral-800 dark:bg-neutral-900">
        {/* Modal Header */}
        <div className="flex shrink-0 items-center justify-between gap-2 border-b border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-900/60">
          <div className="flex min-w-0 items-center gap-2">
            <Calculator className="h-5 w-5 shrink-0 text-amber-500 dark:text-amber-400" />
            <div className="min-w-0">
              <h2 className="truncate text-base leading-tight font-bold text-neutral-900 sm:text-lg dark:text-white">
                {isEditing ? t.scoring.editModalTitle : t.scoring.modalTitle}
              </h2>
              <span className="truncate text-xs font-semibold whitespace-nowrap text-amber-500 tabular-nums">
                {t.scoring.roundNumber} {roundNumber}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 rounded-xl p-1.5 text-neutral-400 transition-colors hover:bg-neutral-200 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-white"
          >
            <X className="h-5 w-5 shrink-0" />
          </button>
        </div>

        {/* Player Selection (Inline on PC, Dropdown on Mobile) */}
        <div className="shrink-0 border-b border-neutral-200 bg-neutral-100/60 px-3 py-2.5 sm:px-4 dark:border-neutral-800 dark:bg-neutral-900/40">
          {/* Mobile Mode: Dropdown Menu */}
          <div className="flex items-center gap-2 sm:hidden">
            <label
              htmlFor="scoring-player-select"
              className="shrink-0 text-xs font-bold tracking-wider text-neutral-500 uppercase dark:text-neutral-400"
            >
              {t.setup.playerName}:
            </label>
            <div className="relative flex-1">
              <div className="pointer-events-none absolute top-1/2 left-3 flex -translate-y-1/2 items-center justify-center">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: activeColorTheme.hex }}
                />
              </div>
              <select
                id="scoring-player-select"
                value={selectedPlayerId}
                onChange={(e) => {
                  soundEffects.playClick();
                  setSelectedPlayerId(e.target.value);
                }}
                className="w-full appearance-none rounded-xl border border-neutral-300 bg-white py-2 pr-8 pl-8 text-xs font-bold text-neutral-800 shadow-sm transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
              >
                {players.map((p) => {
                  const stat = playerStats?.find((s) => s.id === p.id);
                  const totalScore = stat ? stat.totalScore : 0;
                  return (
                    <option key={p.id} value={p.id}>
                      {p.name} ({totalScore} {t.rules.pts})
                    </option>
                  );
                })}
              </select>
              <div className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-neutral-400">
                <ChevronDown className="h-4 w-4 shrink-0" />
              </div>
            </div>
          </div>

          {/* PC / Desktop Mode: Inline Labels Menu */}
          <div className="hidden flex-wrap items-center gap-1.5 sm:flex sm:gap-2">
            <span className="mr-1 shrink-0 text-xs font-bold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
              {t.setup.playerName}:
            </span>
            {players.map((p) => {
              const isSelected = p.id === selectedPlayerId;
              const stat = playerStats?.find((s) => s.id === p.id);
              const totalScore = stat ? stat.totalScore : 0;
              const pColorTheme = getPlayerColorTheme(p.color);

              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    soundEffects.playClick();
                    setSelectedPlayerId(p.id);
                  }}
                  className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition-all ${
                    isSelected
                      ? 'border-amber-500 bg-amber-500/15 text-neutral-900 shadow-sm dark:border-amber-500/60 dark:bg-amber-500/20 dark:text-white'
                      : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900 dark:border-neutral-700/60 dark:bg-neutral-800/60 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:bg-neutral-800 dark:hover:text-white'
                  }`}
                >
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: pColorTheme.hex }}
                  />
                  <span>{p.name}</span>
                  <span
                    className={`text-[11px] tabular-nums ${
                      isSelected
                        ? 'font-extrabold text-amber-600 dark:text-amber-400'
                        : 'font-normal text-neutral-500 dark:text-neutral-400'
                    }`}
                  >
                    ({totalScore} {t.rules.pts})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Form Body */}
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-3">
          {/* Active Player Banner & Total */}
          <div className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-neutral-50 p-3 sm:p-3.5 dark:border-neutral-700/80 dark:bg-neutral-800/60">
            <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl text-sm font-black text-white shadow-sm sm:h-10 sm:w-10 sm:text-base"
                style={{ backgroundColor: activeColorTheme.hex }}
              >
                {activePlayer.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-black text-neutral-900 sm:text-base dark:text-white">
                  {activePlayer.name}
                </div>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={handleResetCurrentPlayer}
                className="flex items-center gap-1 rounded-lg p-1.5 text-xs font-semibold text-neutral-400 transition-colors hover:bg-neutral-200 hover:text-neutral-700 dark:hover:bg-neutral-700 dark:hover:text-white"
                title={t.scoring.quickZero}
              >
                <RefreshCw className="h-3.5 w-3.5 shrink-0" />
                <span className="hidden sm:inline">{t.scoring.quickZero}</span>
              </button>

              <div className="text-right">
                <div className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase">
                  {t.scoring.playerTotal}
                </div>
                <div className="text-xl font-black whitespace-nowrap text-amber-500 tabular-nums sm:text-2xl">
                  {currentScore.totalPoints}{' '}
                  <span className="text-xs font-semibold text-neutral-400">
                    pts
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Winner Toggle */}
          <button
            type="button"
            onClick={handleWinnerToggle}
            className={`flex w-full items-center justify-between rounded-2xl border p-3.5 transition-all ${
              currentScore.isWinner
                ? 'border-emerald-500 bg-emerald-500/15 font-bold text-emerald-600 shadow-md dark:text-emerald-400'
                : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-800/40 dark:text-neutral-300 dark:hover:border-neutral-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
                  currentScore.isWinner
                    ? 'bg-emerald-500 text-white'
                    : 'bg-neutral-200 text-neutral-400 dark:bg-neutral-700'
                }`}
              >
                <Trophy className="h-4 w-4 shrink-0" />
              </div>
              <div className="text-left">
                <div className="text-xs font-black">{t.scoring.isWinner}</div>
                <div className="text-[11px] opacity-75">
                  {t.scoring.isWinnerHint}
                </div>
              </div>
            </div>

            <div
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border ${
                currentScore.isWinner
                  ? 'border-emerald-500 bg-emerald-500 text-white'
                  : 'border-neutral-300 dark:border-neutral-700'
              }`}
            >
              {currentScore.isWinner && (
                <Check className="h-4 w-4 shrink-0 stroke-[3]" />
              )}
            </div>
          </button>

          {/* Number Cards (1 to 10) */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="flex items-center gap-1.5 text-xs font-bold text-neutral-700 dark:text-neutral-300">
                <Hash className="h-3.5 w-3.5 shrink-0 text-amber-500 dark:text-amber-400" />
                <span>{t.scoring.numberCardsTitle}</span>
              </label>
              <span className="text-[11px] text-neutral-400">
                {t.scoring.numberCardsHint}
              </span>
            </div>
            <NumberGrid
              counts={currentScore.numberCards || {}}
              onChange={(newCounts) =>
                updateCurrentScore({ numberCards: newCounts })
              }
              disabled={currentScore.isWinner || currentScore.isDoomsday}
            />
          </div>

          {/* Special & Unique Cards */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="flex items-center gap-1.5 text-xs font-bold text-neutral-700 dark:text-neutral-300">
                <Sparkles className="h-3.5 w-3.5 shrink-0 text-purple-400" />
                <span>{t.scoring.specialCardsTitle}</span>
              </label>
            </div>
            <SpecialCounters
              specialCardsCount={currentScore.specialCardsCount || 0}
              curseCount={currentScore.curseCount || 0}
              theEndCount={currentScore.theEndCount || 0}
              fuckYouCount={currentScore.fuckYouCount || 0}
              mimicryCount={currentScore.mimicryCount || 0}
              onChange={(updates) => updateCurrentScore(updates)}
              language={language}
              disabled={currentScore.isWinner || currentScore.isDoomsday}
            />
          </div>

          {/* Event Modifiers Section */}
          <div className="space-y-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-3 sm:p-4 dark:border-neutral-800 dark:bg-neutral-800/30">
            <h4 className="flex items-center gap-2 text-xs font-bold tracking-wider text-neutral-700 uppercase dark:text-neutral-300">
              <Zap className="h-3.5 w-3.5 shrink-0 text-amber-500 dark:text-amber-400" />
              <span>{t.scoring.eventsAndModifiers}</span>
            </h4>

            {/* Doomsday Switch */}
            <button
              type="button"
              onClick={handleDoomsdayToggle}
              className={`flex w-full items-center justify-between rounded-xl border p-3 transition-all ${
                currentScore.isDoomsday
                  ? 'border-purple-500 bg-purple-500/15 font-bold text-purple-600 dark:text-purple-400'
                  : 'border-neutral-200 bg-white text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800/80 dark:text-neutral-300'
              }`}
            >
              <div className="text-left">
                <div className="text-xs font-bold">
                  {t.scoring.doomsdayToggle}
                </div>
                <div className="text-[10px] opacity-75">
                  {t.scoring.doomsdayHint}
                </div>
              </div>
              <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                  currentScore.isDoomsday
                    ? 'border-purple-600 bg-purple-600 text-white'
                    : 'border-neutral-400 dark:border-neutral-600'
                }`}
              >
                {currentScore.isDoomsday && (
                  <Check className="h-3.5 w-3.5 shrink-0 stroke-[3]" />
                )}
              </div>
            </button>

            {/* Time Bomb Selector */}
            <div className="space-y-1">
              <label className="flex items-center gap-1 text-[11px] font-bold text-neutral-600 dark:text-neutral-400">
                <Bomb className="h-3.5 w-3.5 shrink-0 text-amber-500" />
                <span>{t.scoring.timeBombModifier}</span>
              </label>
              <select
                value={currentScore.timeBombModifier}
                onChange={(e) =>
                  updateCurrentScore({
                    timeBombModifier: e.target.value as TimeBombModifier,
                  })
                }
                disabled={currentScore.isDoomsday}
                className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs font-semibold text-neutral-900 focus:ring-2 focus:ring-amber-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
              >
                <option value="none">{t.scoring.timeBombNone}</option>
                <option value="winner_bonus">{t.scoring.timeBombWinner}</option>
                <option value="loser_penalty">{t.scoring.timeBombLoser}</option>
                <option value="expired_double">
                  {t.scoring.timeBombExpired}
                </option>
              </select>
            </div>

            {/* Custom +/- modifier */}
            <div className="flex items-center gap-2 pt-1">
              <div className="flex-1">
                <label className="text-[11px] font-bold text-neutral-600 dark:text-neutral-400">
                  {t.scoring.customModifier}
                </label>
                <input
                  type="number"
                  value={currentScore.customModifier || 0}
                  onChange={(e) =>
                    updateCurrentScore({
                      customModifier: parseInt(e.target.value, 10) || 0,
                    })
                  }
                  disabled={currentScore.isDoomsday}
                  className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-900 focus:ring-2 focus:ring-amber-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                />
              </div>
              <div className="flex-1 pt-4 text-[10px] text-neutral-400">
                {t.scoring.customModifierHint}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex shrink-0 items-center justify-between gap-2 border-t border-neutral-200 bg-neutral-50 px-4 py-3 sm:gap-3 dark:border-neutral-800 dark:bg-neutral-900/60">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-neutral-200 px-4 py-2.5 text-xs font-semibold text-neutral-700 transition-colors hover:bg-neutral-300 sm:px-5 sm:text-sm dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
          >
            {t.scoring.cancel}
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 px-4 py-2.5 text-xs font-extrabold text-white shadow-md transition-all hover:from-amber-400 hover:to-amber-500 active:scale-95 sm:px-6 sm:text-sm"
          >
            <Check className="h-4 w-4 shrink-0 stroke-[3]" />
            <span>
              {isEditing ? t.scoring.saveChanges : t.scoring.submitRound}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Aliases for compatibility
export const RoundScoringModal = HandCalculatorModal;
