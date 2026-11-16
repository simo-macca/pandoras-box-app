import React from 'react';
import { Check, Calculator } from 'lucide-react';
import { Player, HandScore, Language } from '@/types/game';
import { TRANSLATIONS } from '@/data/translations';
import { PlayerStats } from '@/utils/stats';
import { soundEffects } from '@/utils/sound';
import { useModalA11y } from '@/hooks/useModalA11y';
import { Modal } from '@/components/common/Modal';
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
    <Modal
      onClose={onClose}
      closeLabel={t.common.close}
      title={isEditing ? t.scoring.editModalTitle : t.scoring.modalTitle}
      subtitle={
        <span className="tabular-nums">
          {t.scoring.roundNumber} {roundNumber}
        </span>
      }
      icon={<Calculator className="h-5 w-5" />}
      size="lg"
      headerExtra={
        <ScoringPlayerPicker
          players={players}
          playerStats={playerStats}
          selectedPlayerId={selectedPlayerId}
          onSelectPlayer={setSelectedPlayerId}
          language={language}
        />
      }
      bodyClassName="space-y-6"
      footer={
        <>
          <button type="button" onClick={onClose} className="btn btn-secondary">
            {t.scoring.cancel}
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-primary min-w-0 flex-1 shrink sm:flex-none"
          >
            <Check className="h-4 w-4 stroke-[2.5]" />
            <span className="truncate">
              {isEditing ? t.scoring.saveChanges : t.scoring.submitRound}
            </span>
          </button>
        </>
      }
    >
      <ActivePlayerBanner
        player={activePlayer}
        totalPoints={currentScore.totalPoints}
        onReset={resetCurrentPlayer}
        language={language}
      />

      {isDoubleSpecial && (
        <div role="status" className="callout callout-magic font-medium">
          {t.common.doubleSpecialActive}
        </div>
      )}

      <WinnerToggle
        isWinner={currentScore.isWinner}
        disabled={isTableDoomsday}
        onToggle={toggleWinner}
        language={language}
      />

      <section>
        <div className="mb-3 flex items-baseline justify-between gap-3">
          <h3 className="eyebrow">{t.scoring.numberCardsTitle}</h3>
          <span className="hidden text-xs text-neutral-400 sm:inline">
            {t.scoring.numberCardsHint}
          </span>
        </div>
        <NumberGrid
          counts={currentScore.numberCards ?? {}}
          onChange={(numberCards) => updateCurrentScore({ numberCards })}
          disabled={handLocked}
        />
      </section>

      <section>
        <h3 className="eyebrow mb-3">{t.scoring.specialCardsTitle}</h3>
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
    </Modal>
  );
};
