import React, { useState, useEffect } from 'react';
import { Flame, Shield, Swords, Pencil } from 'lucide-react';
import { Player, Language, SeppukuOutcome } from '@/types/game';
import { TRANSLATIONS } from '@/data/translations';
import { soundEffects } from '@/utils/sound';
import { useModalA11y } from '@/hooks/useModalA11y';
import { Modal } from '@/components/common/Modal';
import { SeppukuPlayerChoice } from './SeppukuPlayerChoice';

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

  useModalA11y(isOpen, onClose);

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
    <Modal
      onClose={onClose}
      closeLabel={t.common.close}
      title={
        <span className="flex min-w-0 items-center gap-2">
          <span className="truncate">
            {isEditing ? t.events.seppukuEditTitle : t.events.seppukuTitle}
          </span>
          {isEditing && (
            <span className="badge shrink-0 bg-amber-500/15 text-amber-700 normal-case dark:text-amber-300">
              <Pencil className="h-3 w-3" />
              <span>{t.events.seppukuEditBadge}</span>
            </span>
          )}
        </span>
      }
      subtitle={
        isEditing ? t.events.seppukuEditSubtitle : t.events.seppukuSubtitle
      }
      icon={<Swords className="h-5 w-5" />}
      iconClassName="bg-rose-500/15 text-rose-600 dark:text-rose-400"
      size="lg"
      bodyClassName="space-y-4"
      footer={
        <>
          <button type="button" onClick={onClose} className="btn btn-secondary">
            {t.setup.cancel}
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-danger min-w-0 flex-1 shrink sm:flex-none"
          >
            <Swords className="h-4 w-4" />
            <span className="truncate">
              {isEditing ? t.setup.saveChanges : t.events.seppukuApply}
            </span>
          </button>
        </>
      }
    >
      {/* Rules summary */}
      <div className="callout callout-danger space-y-3">
        <div className="font-semibold">{t.events.seppukuRuleBannerTitle}</div>
        <div className="grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
          <div className="flex items-start gap-2 rounded-xl bg-white/70 p-3 text-neutral-700 dark:bg-white/[0.04] dark:text-neutral-300">
            <Shield className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <div className="min-w-0 leading-snug">
              <span className="font-semibold text-neutral-900 dark:text-white">
                {t.events.seppukuActionRiskNumberTitle}
              </span>
              : {t.events.seppukuRuleRiskText}
            </div>
          </div>
          <div className="flex items-start gap-2 rounded-xl bg-white/70 p-3 text-neutral-700 dark:bg-white/[0.04] dark:text-neutral-300">
            <Flame className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
            <div className="min-w-0 leading-snug">
              <span className="font-semibold text-neutral-900 dark:text-white">
                {t.events.seppukuActionNoRiskTitle}
              </span>
              : {t.events.seppukuRuleRefuseText}
            </div>
          </div>
        </div>
      </div>

      {/* One decision per player, in the order of play */}
      {players.map((player, index) => (
        <SeppukuPlayerChoice
          key={player.id}
          player={player}
          position={index + 1}
          choice={choices[player.id] ?? 'no_risk'}
          onSelect={(outcome) => handleSelectOutcome(player.id, outcome)}
          language={language}
        />
      ))}
    </Modal>
  );
};
