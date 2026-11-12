import React from 'react';
import { X, Check, Sparkles, Calculator, Hash } from 'lucide-react';
import { Player, HandScore, Language } from '@/types/game';
import { TRANSLATIONS } from '@/data/translations';
import { PlayerStats } from '@/utils/stats';
import { soundEffects } from '@/utils/sound';
import { useModalA11y } from '@/hooks/useModalA11y';
import { useHandScores } from '@/hooks/useHandScores';
import { NumberGrid } from './NumberGrid';
import { SpecialCounters } from './SpecialCounters';
import { ScoringPlayerPicker } from './ScoringPlayerPicker';
import { ScoringModifiers } from './ScoringModifiers';
import { ActivePlayerBanner } from './ActivePlayerBanner';
import { WinnerToggle } from './WinnerToggle';

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
  /** Rule cards active for the round being scored. */
  activeRuleCardIds?: string[];
}

/** End-of-round calculator: enter every player's remaining hand cards. */
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
  activeRuleCardIds,
}) => {
  const t = TRANSLATIONS[language];
  const {
    scores,
    selectedPlayerId,
    setSelectedPlayerId,
    currentScore,
    isDoubleSpecial,
    isTableDoomsday,
    tableTimeBombMode,
    updateCurrentScore,
    toggleWinner,
    toggleDoomsday,
    setTableTimeBomb,
    resetCurrentPlayer,
  } = useHandScores({ isOpen, players, initialScores, activeRuleCardIds });

  useModalA11y(isOpen, onClose);

  if (!isOpen || players.length === 0) return null;

  const activePlayer =
    players.find((p) => p.id === selectedPlayerId) ?? players[0];
  const handLocked = currentScore.isWinner || Boolean(currentScore.isDoomsday);

  const handleSubmit = () => {
    soundEffects.playClick();
    onSubmitRound(scores);
    onClose();
  };

  return (
    <div
      className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2 backdrop-blur-sm sm:p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative flex max-h-[90dvh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl sm:rounded-3xl dark:border-neutral-800 dark:bg-neutral-900">
        {/* Header */}
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
            aria-label={t.common.close}
            className="shrink-0 rounded-xl p-1.5 text-neutral-400 transition-colors hover:bg-neutral-200 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-white"
          >
            <X className="h-5 w-5 shrink-0" />
          </button>
        </div>

        <ScoringPlayerPicker
          players={players}
          playerStats={playerStats}
          selectedPlayerId={selectedPlayerId}
          onSelectPlayer={setSelectedPlayerId}
          language={language}
        />

        {/* Scrollable body */}
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-3">
          <ActivePlayerBanner
            player={activePlayer}
            totalPoints={currentScore.totalPoints}
            onReset={resetCurrentPlayer}
            language={language}
          />

          {isDoubleSpecial && (
            <div
              role="status"
              className="rounded-2xl border border-purple-500/30 bg-purple-500/10 px-3.5 py-2.5 text-xs font-semibold text-purple-700 dark:text-purple-300"
            >
              {t.common.doubleSpecialActive}
            </div>
          )}

          <WinnerToggle
            isWinner={currentScore.isWinner}
            disabled={isTableDoomsday}
            onToggle={toggleWinner}
            language={language}
          />

          {/* Number cards (1–10) */}
          <section>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="flex items-center gap-1.5 text-xs font-bold text-neutral-700 dark:text-neutral-300">
                <Hash className="h-3.5 w-3.5 shrink-0 text-amber-500 dark:text-amber-400" />
                <span>{t.scoring.numberCardsTitle}</span>
              </h3>
              <span className="text-[11px] text-neutral-400">
                {t.scoring.numberCardsHint}
              </span>
            </div>
            <NumberGrid
              counts={currentScore.numberCards ?? {}}
              onChange={(numberCards) => updateCurrentScore({ numberCards })}
              disabled={handLocked}
            />
          </section>

          {/* Special and unique cards */}
          <section>
            <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold text-neutral-700 dark:text-neutral-300">
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-purple-400" />
              <span>{t.scoring.specialCardsTitle}</span>
            </h3>
            <SpecialCounters
              specialCardsCount={currentScore.specialCardsCount ?? 0}
              curseCount={currentScore.curseCount ?? 0}
              theEndCount={currentScore.theEndCount ?? 0}
              fuckYouCount={currentScore.fuckYouCount ?? 0}
              mimicryCount={currentScore.mimicryCount ?? 0}
              onChange={updateCurrentScore}
              language={language}
              disabled={handLocked}
            />
          </section>

          <ScoringModifiers
            isDoomsday={isTableDoomsday}
            isWinner={currentScore.isWinner}
            timeBombModifier={currentScore.timeBombModifier ?? 'none'}
            tableTimeBombMode={tableTimeBombMode}
            customModifier={currentScore.customModifier ?? 0}
            onToggleDoomsday={toggleDoomsday}
            onChangeTableTimeBomb={setTableTimeBomb}
            onChangeTimeBomb={(timeBombModifier) =>
              updateCurrentScore({ timeBombModifier })
            }
            onChangeCustomModifier={(customModifier) =>
              updateCurrentScore({ customModifier })
            }
            language={language}
          />
        </div>

        {/* Footer */}
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
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-amber-500 via-rose-500 to-amber-600 px-4 py-2.5 text-xs font-extrabold text-white shadow-md transition-all hover:from-amber-400 hover:to-amber-500 active:scale-95 sm:px-6 sm:text-sm"
          >
            <Check className="h-4 w-4 shrink-0 stroke-3" />
            <span>
              {isEditing ? t.scoring.saveChanges : t.scoring.submitRound}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
