import React, { useState, useEffect } from 'react';
import { X, Play, RotateCcw, Target, AlertTriangle } from 'lucide-react';
import { Player, GameConfig, Language, PlayerColor } from '../../types/game';
import { TRANSLATIONS } from '../../data/translations';
import { PlayerConfig } from './PlayerConfig';
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

  // Inlined official score limits: 113, 137, 154, 179 pts
  const scorePresets = [
    { score: 113, label: '113 pts', note: '5–8 Short' },
    { score: 137, label: '137 pts', note: '2–4 Short / 5–8 Med' },
    { score: 154, label: '154 pts', note: '2–4 Med / 5–8 Long' },
    { score: 179, label: '179 pts', note: '2–4 Long' },
  ];

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

  const handleCustomChange = (val: string) => {
    setCustomValue(val);
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed) && parsed > 0) {
      setDraftConfig({
        targetScore: parsed,
        presetName: 'custom',
      });
    }
  };

  const handleSaveOnly = () => {
    soundEffects.playClick();
    onSaveAndStart(draftPlayers, draftConfig, false);
    onClose();
  };

  const handleResetAndStart = () => {
    soundEffects.playClick();
    onSaveAndStart(draftPlayers, draftConfig, true);
    onClose();
  };

  return (
    <div className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-2 backdrop-blur-sm sm:p-4">
      <div className="relative flex max-h-[90dvh] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl dark:border-neutral-800 dark:bg-neutral-900">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-900/60 sm:px-6 sm:py-4">
          <div className="min-w-0">
            <h2 className="flex items-center gap-2 text-lg font-bold text-neutral-900 dark:text-white sm:text-xl">
              <span className="shrink-0">👥</span>
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
            className="shrink-0 rounded-xl p-1.5 text-neutral-400 transition-colors hover:bg-neutral-200 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-white sm:p-2"
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

          {/* Inlined score limit buttons (113, 137, 154, 179 pts + Custom) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm font-bold text-neutral-800 dark:text-neutral-200">
                <Target className="h-4 w-4 text-amber-500" />
                <span>{t.setup.targetScore}</span>
              </label>
              <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                Official Limits
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {scorePresets.map((preset) => {
                const isSelected =
                  draftConfig.presetName !== 'custom' &&
                  draftConfig.targetScore === preset.score;

                return (
                  <button
                    key={preset.score}
                    type="button"
                    onClick={() => handleSelectScorePreset(preset.score)}
                    className={`flex flex-col items-center justify-center rounded-2xl border p-3 transition-all ${
                      isSelected
                        ? 'border-amber-500 bg-amber-500/15 font-bold text-amber-600 shadow-[0_0_15px_rgba(245,158,11,0.2)] dark:text-amber-400'
                        : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-800/40 dark:text-neutral-300 dark:hover:border-neutral-700'
                    }`}
                  >
                    <span className="text-lg font-black text-neutral-900 dark:text-white">
                      {preset.score}
                    </span>
                    <span className="text-[10px] font-semibold text-neutral-400">
                      {preset.note}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Custom Limit */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  const parsed = parseInt(customValue, 10) || 150;
                  setDraftConfig({ targetScore: parsed, presetName: 'custom' });
                }}
                className={`rounded-xl border px-3 py-2 text-xs font-bold transition-all ${
                  draftConfig.presetName === 'custom'
                    ? 'border-amber-500 bg-amber-500/15 font-bold text-amber-600 dark:text-amber-400'
                    : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-800/40 dark:text-neutral-300 dark:hover:border-neutral-700'
                }`}
              >
                {t.setup.customGame}
              </button>

              <div className="relative flex-1">
                <input
                  type="number"
                  min="10"
                  max="999"
                  value={customValue}
                  onChange={(e) => handleCustomChange(e.target.value)}
                  onFocus={() => {
                    const parsed = parseInt(customValue, 10) || 150;
                    setDraftConfig({
                      targetScore: parsed,
                      presetName: 'custom',
                    });
                  }}
                  placeholder="150"
                  className="w-full rounded-xl border border-neutral-300 bg-neutral-100 px-3 py-2 text-sm font-semibold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                />
                <span className="pointer-events-none absolute right-3 top-2 text-xs font-semibold text-neutral-400">
                  {t.setup.points}
                </span>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
              {t.setup.description}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="shrink-0 border-t border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-900/60 sm:px-6 sm:py-4">
          {!showConfirmReset ? (
            <div className="flex items-center justify-between gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmReset(true)}
                className="flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-bold text-red-600 transition-all hover:border-red-500 dark:text-red-400 sm:px-4 sm:py-2.5 sm:text-sm"
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
