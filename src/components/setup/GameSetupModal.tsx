import React, { useState, useEffect } from 'react';
import { X, Play, RotateCcw, AlertTriangle, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import { Player, GameConfig, Language, PlayerColor } from '../../types/game';
import { TRANSLATIONS } from '../../data/translations';
import { PlayerConfig } from './PlayerConfig';
import { ScoreLimitSelector } from './ScoreLimitSelector';
import { ALL_PLAYER_COLORS } from '../../utils/colors';
import { soundEffects } from '../../utils/sound';

interface GameSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlayers: Player[];
  currentConfig: GameConfig;
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
  onSaveAndStart,
  language,
}) => {
  const t = TRANSLATIONS[language];

  const [draftPlayers, setDraftPlayers] = useState<Player[]>(currentPlayers);
  const [draftConfig, setDraftConfig] = useState<GameConfig>(currentConfig);
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
        if (
          color === ('white' as PlayerColor) ||
          color === ('black' as PlayerColor) ||
          used.has(color) ||
          !ALL_PLAYER_COLORS.includes(color)
        ) {
          const available = ALL_PLAYER_COLORS.find((c) => !used.has(c));
          color =
            available || ALL_PLAYER_COLORS[idx % ALL_PLAYER_COLORS.length];
        }
        used.add(color);
        return { ...p, color };
      });
      setDraftPlayers(sanitized);
      setDraftConfig(currentConfig);
      setShowConfirmReset(false);
      setCustomValue(
        currentConfig.presetName === 'custom'
          ? String(currentConfig.targetScore)
          : '150'
      );
    }
  }, [isOpen, currentPlayers, currentConfig]);

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
      if (
        isTaken ||
        updates.color === ('white' as PlayerColor) ||
        updates.color === ('black' as PlayerColor) ||
        !ALL_PLAYER_COLORS.includes(updates.color)
      ) {
        return;
      }
    }
    setDraftPlayers(
      draftPlayers.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const handleSelectScorePreset = (score: number) => {
    soundEffects.playClick();
    setDraftConfig({
      targetScore: score,
      presetName:
        score === 113
          ? 'short'
          : score === 137
            ? 'short'
            : score === 154
              ? 'medium'
              : 'long',
    });
  };

  const isValidTargetScore = (val: string | number): boolean => {
    if (typeof val === 'number') {
      return Number.isInteger(val) && val >= 50;
    }
    if (typeof val === 'string') {
      const trimmed = val.trim();
      if (!/^\d+$/.test(trimmed)) {
        return false;
      }
      const num = Number(trimmed);
      return Number.isSafeInteger(num) && num >= 50;
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

  const handleSaveOnly = () => {
    const validTargetScore = validateAndGetTargetScore();
    if (validTargetScore === null) {
      return;
    }
    soundEffects.playClick();
    onSaveAndStart(
      draftPlayers,
      {
        ...draftConfig,
        targetScore: validTargetScore,
      },
      false
    );
    onClose();
  };

  const handleResetAndStart = () => {
    const validTargetScore = validateAndGetTargetScore();
    if (validTargetScore === null) {
      return;
    }
    soundEffects.playClick();
    onSaveAndStart(
      draftPlayers,
      {
        ...draftConfig,
        targetScore: validTargetScore,
      },
      true
    );
    onClose();
  };

  return (
    <div className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-2 backdrop-blur-sm sm:p-4">
      <div className="relative flex max-h-[90dvh] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl dark:border-neutral-800 dark:bg-neutral-900">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-neutral-200 bg-neutral-50 px-4 py-3 sm:px-6 sm:py-4 dark:border-neutral-800 dark:bg-neutral-900/60">
          <div className="min-w-0">
            <h2 className="flex items-center gap-2 text-lg font-bold text-neutral-900 sm:text-xl dark:text-white">
              <Users className="h-5 w-5 shrink-0 text-amber-500 dark:text-amber-400" />
              <span className="truncate">{t.setup.title}</span>
            </h2>
            <p className="mt-0.5 truncate text-xs text-neutral-500 dark:text-neutral-400">
              {t.setup.description}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 rounded-xl p-1.5 text-neutral-400 transition-colors hover:bg-neutral-200 hover:text-neutral-700 sm:p-2 dark:hover:bg-neutral-800 dark:hover:text-white"
          >
            <X className="h-5 w-5 shrink-0" />
          </button>
        </div>

        {/* Body */}
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-3 sm:space-y-6 sm:p-6">
          {/* Players Config */}
          <PlayerConfig
            players={draftPlayers}
            onAddPlayer={handleAddPlayer}
            onRemovePlayer={handleRemovePlayer}
            onUpdatePlayer={handleUpdatePlayer}
            language={language}
          />

          <hr className="border-neutral-200 dark:border-neutral-800" />

          {/* Score Limit Selector */}
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
        </div>

        {/* Footer Actions */}
        <div className="shrink-0 border-t border-neutral-200 bg-neutral-50 px-4 py-3 sm:px-6 sm:py-4 dark:border-neutral-800 dark:bg-neutral-900/60">
          {!showConfirmReset ? (
            <div className="flex items-center justify-between gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmReset(true)}
                className="flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-bold text-red-600 transition-all hover:border-red-500 sm:px-4 sm:py-2.5 sm:text-sm dark:text-red-400"
              >
                <RotateCcw className="h-4 w-4 shrink-0" />
                <span className="whitespace-nowrap">{t.setup.newGame}</span>
              </button>

              <button
                type="button"
                onClick={handleSaveOnly}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 text-xs font-extrabold text-white shadow-md transition-all hover:from-amber-400 hover:to-amber-500 active:scale-95 sm:px-6 sm:py-2.5 sm:text-sm"
              >
                <Play className="h-4 w-4 shrink-0 fill-white" />
                <span className="whitespace-nowrap">{t.setup.startMatch}</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-red-600 dark:text-red-400">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>{t.setup.confirmResetMessage}</span>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowConfirmReset(false)}
                  className="flex-1 rounded-xl bg-neutral-200 px-3 py-2 text-xs font-semibold text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
                >
                  {t.setup.cancel}
                </button>
                <button
                  type="button"
                  onClick={handleResetAndStart}
                  className="flex-1 rounded-xl bg-red-600 px-3 py-2 text-xs font-bold text-white hover:bg-red-700"
                >
                  {t.setup.confirm}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
