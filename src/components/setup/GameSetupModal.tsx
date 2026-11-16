import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, AlertTriangle, Users, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { Player, GameConfig, Language, PlayerColor } from '@/types/game';
import { TRANSLATIONS } from '@/data/translations';
import { PlayerConfig } from './PlayerConfig';
import { ScoreLimitSelector } from './ScoreLimitSelector';
import { RoundLimitSelector } from './RoundLimitSelector';
import { ALL_PLAYER_COLORS } from '@/utils/colors';
import { soundEffects } from '@/utils/sound';
import { getRecommendedPresets } from '@/utils/scoring';
import { useModalA11y } from '@/hooks/useModalA11y';
import { Modal } from '@/components/common/Modal';
import { MIN_TARGET_SCORE } from '@/utils/storage';

interface GameSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlayers: Player[];
  currentConfig: GameConfig;
  isMatchInProgress?: boolean;
  onSaveAndStart: (
    players: Player[],
    config: GameConfig,
    isResetRounds: boolean
  ) => void;
  language: Language;
}

export const GameSetupModal: React.FC<GameSetupModalProps> = ({
  isOpen,
  onClose,
  currentPlayers,
  currentConfig,
  isMatchInProgress = false,
  onSaveAndStart,
  language,
}) => {
  const t = TRANSLATIONS[language];

  const [draftPlayers, setDraftPlayers] = useState<Player[]>(currentPlayers);
  const [draftConfig, setDraftConfig] = useState<GameConfig>(currentConfig);
  const [draftRoundLimit, setDraftRoundLimit] = useState<string>(
    currentConfig.roundLimit ? String(currentConfig.roundLimit) : ''
  );
  const [customValue, setCustomValue] = useState<string>(
    currentConfig.presetName === 'custom'
      ? String(currentConfig.targetScore)
      : '150'
  );
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const used = new Set<PlayerColor>();
      const sanitized = currentPlayers.map((p, idx) => {
        let color = p.color;
        // White and black are not offered (black cards are not a colour).
        if (used.has(color) || !ALL_PLAYER_COLORS.includes(color)) {
          const available = ALL_PLAYER_COLORS.find((c) => !used.has(c));
          color =
            available || ALL_PLAYER_COLORS[idx % ALL_PLAYER_COLORS.length];
        }
        used.add(color);
        return { ...p, color };
      });
      setDraftPlayers(sanitized);
      setDraftConfig(currentConfig);
      setDraftRoundLimit(
        currentConfig.roundLimit ? String(currentConfig.roundLimit) : ''
      );
      setShowConfirmReset(false);
      setCustomValue(
        currentConfig.presetName === 'custom'
          ? String(currentConfig.targetScore)
          : '150'
      );
    }
  }, [isOpen, currentPlayers, currentConfig]);

  useModalA11y(isOpen, onClose);

  if (!isOpen) return null;

  const handleAddPlayer = () => {
    if (draftPlayers.length >= 8) return;
    const usedColors = new Set(draftPlayers.map((p) => p.color));
    const nextColor: PlayerColor =
      ALL_PLAYER_COLORS.find((c: PlayerColor) => !usedColors.has(c)) ||
      ALL_PLAYER_COLORS[draftPlayers.length % ALL_PLAYER_COLORS.length];

    const newPlayer: Player = {
      id: `p_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: `Player ${draftPlayers.length + 1}`,
      color: nextColor,
    };
    setDraftPlayers([...draftPlayers, newPlayer]);
  };

  const handleRemovePlayer = (id: string) => {
    if (draftPlayers.length <= 2) return;
    setDraftPlayers(draftPlayers.filter((p) => p.id !== id));
  };

  const handleUpdatePlayer = (id: string, updates: Partial<Player>) => {
    if (updates.color) {
      const isTaken = draftPlayers.some(
        (p) => p.id !== id && p.color === updates.color
      );
      if (isTaken || !ALL_PLAYER_COLORS.includes(updates.color)) return;
    }
    setDraftPlayers(
      draftPlayers.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const handleSelectScorePreset = (score: number) => {
    soundEffects.playClick();
    const recommended = getRecommendedPresets(draftPlayers.length);
    const presetName: GameConfig['presetName'] =
      score === recommended.short
        ? 'short'
        : score === recommended.medium
          ? 'medium'
          : score === recommended.long
            ? 'long'
            : score > recommended.long
              ? 'long'
              : 'short';
    setDraftConfig({ targetScore: score, presetName });
  };

  const isValidTargetScore = (val: string | number): boolean => {
    if (typeof val === 'number') {
      return Number.isInteger(val) && val >= MIN_TARGET_SCORE;
    }
    if (typeof val === 'string') {
      const trimmed = val.trim();
      if (!/^\d+$/.test(trimmed)) {
        return false;
      }
      const num = Number(trimmed);
      return Number.isSafeInteger(num) && num >= MIN_TARGET_SCORE;
    }
    return false;
  };

  const handleCustomChange = (val: string) => {
    setCustomValue(val);
    setDraftConfig((prev) => ({
      ...prev,
      presetName: 'custom',
    }));
  };

  const handleSelectCustom = () => {
    soundEffects.playClick();
    setDraftConfig((prev) => ({
      ...prev,
      presetName: 'custom',
    }));
  };

  const validateAndGetTargetScore = (): number | null => {
    if (draftConfig.presetName === 'custom') {
      if (!isValidTargetScore(customValue)) {
        toast.error(t.setup.minScoreError);
        soundEffects.playWarning();
        return null;
      }
      return parseInt(customValue.trim(), 10);
    } else {
      if (!isValidTargetScore(draftConfig.targetScore)) {
        toast.error(t.setup.minScoreError);
        soundEffects.playWarning();
        return null;
      }
      return draftConfig.targetScore;
    }
  };

  const getValidRoundLimit = (): number | null => {
    if (!draftRoundLimit.trim()) return null;
    const parsed = parseInt(draftRoundLimit.trim(), 10);
    return !isNaN(parsed) && parsed > 0 ? parsed : null;
  };

  // Never persist blank player names.
  const getNormalizedPlayers = (): Player[] =>
    draftPlayers.map((p, idx) => ({
      ...p,
      name: p.name.trim() || `Player ${idx + 1}`,
    }));

  /** Validates the draft and hands it over; `isResetRounds` starts a new match. */
  const submit = (isResetRounds: boolean) => {
    const validTargetScore = validateAndGetTargetScore();
    if (validTargetScore === null) return;
    soundEffects.playClick();
    onSaveAndStart(
      getNormalizedPlayers(),
      {
        ...draftConfig,
        targetScore: validTargetScore,
        roundLimit: getValidRoundLimit(),
      },
      isResetRounds
    );
    onClose();
  };
  const handleSaveOnly = () => submit(false);
  const handleResetAndStart = () => submit(true);

  const footer = !showConfirmReset ? (
    <div className="flex w-full items-center justify-between gap-2">
      <button
        type="button"
        onClick={() => setShowConfirmReset(true)}
        className="btn btn-danger-soft"
      >
        <RotateCcw className="h-4 w-4" />
        <span>{t.setup.newGame}</span>
      </button>
      <button
        type="button"
        onClick={handleSaveOnly}
        className="btn btn-primary flex-1 sm:flex-none"
      >
        {isMatchInProgress ? (
          <Check className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4 fill-current" />
        )}
        <span>
          {isMatchInProgress ? t.setup.saveChanges : t.setup.startMatch}
        </span>
      </button>
    </div>
  ) : (
    <div className="w-full space-y-3">
      <div
        role="alert"
        className="flex items-center justify-center gap-2 text-sm font-semibold text-rose-600 dark:text-rose-400"
      >
        <AlertTriangle className="h-4 w-4 shrink-0" />
        <span>{t.setup.confirmResetMessage}</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setShowConfirmReset(false)}
          className="btn btn-secondary"
        >
          {t.setup.cancel}
        </button>
        <button
          type="button"
          onClick={handleResetAndStart}
          className="btn btn-danger"
        >
          {t.setup.confirm}
        </button>
      </div>
    </div>
  );

  return (
    <Modal
      onClose={onClose}
      closeLabel={t.common.close}
      title={t.setup.title}
      subtitle={t.setup.description}
      icon={<Users className="h-5 w-5" />}
      size="lg"
      bodyClassName="space-y-8"
      footer={footer}
    >
      <PlayerConfig
        players={draftPlayers}
        onAddPlayer={handleAddPlayer}
        onRemovePlayer={handleRemovePlayer}
        onUpdatePlayer={handleUpdatePlayer}
        language={language}
      />

      <ScoreLimitSelector
        targetScore={draftConfig.targetScore}
        presetName={draftConfig.presetName}
        customValue={customValue}
        onSelectPreset={handleSelectScorePreset}
        onSelectCustom={handleSelectCustom}
        onCustomChange={handleCustomChange}
        onSubmitCustom={handleSaveOnly}
        language={language}
      />

      <RoundLimitSelector
        value={draftRoundLimit}
        onChange={setDraftRoundLimit}
        language={language}
      />
    </Modal>
  );
};
