import React, { useState, useEffect } from 'react';
import { X, Trophy, Check, Sparkles, RefreshCw, Bomb } from 'lucide-react';
import { Player, HandScore, Language, TimeBombModifier } from '../../types/game';
import { TRANSLATIONS } from '../../data/translations';
import { calculateHandPoints } from '../../hooks/useGameState';
import { getPlayerColorTheme } from '../../utils/colors';
import { soundEffects } from '../../utils/sound';
import { NumberGrid } from './NumberGrid';
import { SpecialCounters } from './SpecialCounters';

interface HandCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  players: Player[];
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
  onSubmitRound,
  language,
  roundNumber,
  initialScores,
  isEditing = false,
}) => {
  const t = TRANSLATIONS[language];
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>(players[0]?.id || '');

  // Map of playerId -> HandScore
  const [scores, setScores] = useState<Record<string, HandScore>>({});

  useEffect(() => {
    if (!isOpen) return;

    if (players.length > 0 && !players.some(p => p.id === selectedPlayerId)) {
      setSelectedPlayerId(players[0].id);
    }

    const initial: Record<string, HandScore> = {};
    players.forEach(p => {
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

  const updateCurrentScore = (updates: Partial<Omit<HandScore, 'totalPoints'>>) => {
    setScores(prev => {
      const existing = prev[selectedPlayerId] || { ...DEFAULT_HAND_SCORE, totalPoints: 0 };
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
    setScores(prev => {
      const updated = { ...prev };
      if (nextIsWinner) {
        // optionally reset other winners
        players.forEach(p => {
          if (p.id !== selectedPlayerId && updated[p.id]?.isWinner) {
            const cleared = { ...updated[p.id], isWinner: false };
            updated[p.id] = { ...cleared, totalPoints: calculateHandPoints(cleared) };
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
    setScores(prev => {
      const updated = { ...prev };
      players.forEach(p => {
        const pScore = updated[p.id] || { ...DEFAULT_HAND_SCORE, totalPoints: 0 };
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
    setScores(prev => ({
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

  const activePlayer = players.find(p => p.id === selectedPlayerId) || players[0];
  const activeColorTheme = getPlayerColorTheme(activePlayer.color);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60">
          <div className="flex items-center gap-2">
            <span className="text-xl">🧮</span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white leading-tight">
                {isEditing ? t.scoring.editModalTitle : t.scoring.modalTitle}
              </h2>
              <span className="text-xs font-semibold text-amber-500">
                {t.scoring.roundNumber} {roundNumber}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Player Tabs Bar */}
        <div className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100/60 dark:bg-neutral-900/40 overflow-x-auto no-scrollbar flex items-center gap-2">
          {players.map(p => {
            const isSelected = p.id === selectedPlayerId;
            const pTheme = getPlayerColorTheme(p.color);
            const pScore = scores[p.id];
            const pts = pScore ? pScore.totalPoints : 0;
            const isPWinner = pScore?.isWinner;

            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedPlayerId(p.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border ${
                  isSelected
                    ? 'border-amber-500 bg-white dark:bg-neutral-800 shadow-sm text-neutral-900 dark:text-white'
                    : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                }`}
              >
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: pTheme.hex }}
                />
                <span className="truncate max-w-[90px]">{p.name}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-md text-[10px] font-black ${
                    isPWinner
                      ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                      : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  {isPWinner ? 'WIN' : `${pts} pt`}
                </span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Form Body */}
        <div className="p-4 sm:p-6 space-y-5 overflow-y-auto flex-1">
          {/* Active Player Banner & Total */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/80">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center font-black text-white text-base shadow-sm shrink-0"
                style={{ backgroundColor: activeColorTheme.hex }}
              >
                {activePlayer.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="text-sm font-black text-neutral-900 dark:text-white">
                  {activePlayer.name}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleResetCurrentPlayer}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors text-xs flex items-center gap-1 font-semibold"
                title={t.scoring.quickZero}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.scoring.quickZero}</span>
              </button>

              <div className="text-right">
                <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  {t.scoring.playerTotal}
                </div>
                <div className="text-2xl font-black text-amber-500">
                  {currentScore.totalPoints}{' '}
                  <span className="text-xs font-semibold text-neutral-400">pts</span>
                </div>
              </div>
            </div>
          </div>

          {/* Winner Toggle */}
          <button
            type="button"
            onClick={handleWinnerToggle}
            className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
              currentScore.isWinner
                ? 'border-emerald-500 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 shadow-md font-bold'
                : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/40 text-neutral-700 dark:text-neutral-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  currentScore.isWinner
                    ? 'bg-emerald-500 text-white'
                    : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-400'
                }`}
              >
                <Trophy className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-xs font-black">{t.scoring.isWinner}</div>
                <div className="text-[11px] opacity-75">{t.scoring.isWinnerHint}</div>
              </div>
            </div>

            <div
              className={`w-6 h-6 rounded-lg flex items-center justify-center border ${
                currentScore.isWinner
                  ? 'bg-emerald-500 border-emerald-500 text-white'
                  : 'border-neutral-300 dark:border-neutral-700'
              }`}
            >
              {currentScore.isWinner && <Check className="w-4 h-4 stroke-[3]" />}
            </div>
          </button>

          {/* Number Cards (1 to 10) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                <span>🔢</span>
                <span>{t.scoring.numberCardsTitle}</span>
              </label>
              <span className="text-[11px] text-neutral-400">{t.scoring.numberCardsHint}</span>
            </div>
            <NumberGrid
              counts={currentScore.numberCards || {}}
              onChange={newCounts => updateCurrentScore({ numberCards: newCounts })}
              disabled={currentScore.isWinner || currentScore.isDoomsday}
            />
          </div>

          {/* Special & Unique Cards */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>{t.scoring.specialCardsTitle}</span>
              </label>
            </div>
            <SpecialCounters
              specialCardsCount={currentScore.specialCardsCount || 0}
              curseCount={currentScore.curseCount || 0}
              theEndCount={currentScore.theEndCount || 0}
              fuckYouCount={currentScore.fuckYouCount || 0}
              mimicryCount={currentScore.mimicryCount || 0}
              onChange={updates => updateCurrentScore(updates)}
              language={language}
              disabled={currentScore.isWinner || currentScore.isDoomsday}
            />
          </div>

          {/* Event Modifiers Section */}
          <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/30 space-y-3">
            <h4 className="text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider flex items-center gap-2">
              <span>⚡</span>
              <span>{t.scoring.eventsAndModifiers}</span>
            </h4>

            {/* Doomsday Switch */}
            <button
              type="button"
              onClick={handleDoomsdayToggle}
              className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                currentScore.isDoomsday
                  ? 'border-purple-500 bg-purple-500/15 text-purple-600 dark:text-purple-400 font-bold'
                  : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300'
              }`}
            >
              <div className="text-left">
                <div className="text-xs font-bold">{t.scoring.doomsdayToggle}</div>
                <div className="text-[10px] opacity-75">{t.scoring.doomsdayHint}</div>
              </div>
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                  currentScore.isDoomsday
                    ? 'bg-purple-600 border-purple-600 text-white'
                    : 'border-neutral-400 dark:border-neutral-600'
                }`}
              >
                {currentScore.isDoomsday && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </button>

            {/* Time Bomb Selector */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-neutral-600 dark:text-neutral-400 flex items-center gap-1">
                <Bomb className="w-3.5 h-3.5 text-amber-500" />
                <span>{t.scoring.timeBombModifier}</span>
              </label>
              <select
                value={currentScore.timeBombModifier}
                onChange={e =>
                  updateCurrentScore({ timeBombModifier: e.target.value as TimeBombModifier })
                }
                disabled={currentScore.isDoomsday}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-xs font-semibold text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="none">{t.scoring.timeBombNone}</option>
                <option value="winner_bonus">{t.scoring.timeBombWinner}</option>
                <option value="loser_penalty">{t.scoring.timeBombLoser}</option>
                <option value="expired_double">{t.scoring.timeBombExpired}</option>
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
                  onChange={e =>
                    updateCurrentScore({ customModifier: parseInt(e.target.value, 10) || 0 })
                  }
                  disabled={currentScore.isDoomsday}
                  className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-xs font-semibold text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div className="text-[10px] text-neutral-400 flex-1 pt-4">
                {t.scoring.customModifierHint}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 px-6 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs sm:text-sm font-semibold hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
          >
            {t.scoring.cancel}
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-95"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>{isEditing ? t.scoring.saveChanges : t.scoring.submitRound}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Aliases for compatibility
export const RoundScoringModal = HandCalculatorModal;
