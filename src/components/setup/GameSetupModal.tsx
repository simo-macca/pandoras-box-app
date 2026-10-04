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
  onSaveAndStart: (players: Player[], config: GameConfig, isResetRounds: boolean) => void;
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
    currentConfig.presetName === 'custom' ? String(currentConfig.targetScore) : '150'
  );
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setDraftPlayers(currentPlayers);
      setDraftConfig(currentConfig);
      setShowConfirmReset(false);
      setCustomValue(
        currentConfig.presetName === 'custom' ? String(currentConfig.targetScore) : '150'
      );
    }
  }, [isOpen, currentPlayers, currentConfig]);

  if (!isOpen) return null;

  const handleAddPlayer = () => {
    if (draftPlayers.length >= 8) return;
    const usedColors = new Set(draftPlayers.map(p => p.color));
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
    setDraftPlayers(draftPlayers.filter(p => p.id !== id));
  };

  const handleUpdatePlayer = (id: string, updates: Partial<Player>) => {
    setDraftPlayers(draftPlayers.map(p => (p.id === id ? { ...p, ...updates } : p)));
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60">
          <div>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span>👥</span>
              <span>{t.setup.title}</span>
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              {t.setup.description}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
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
              <label className="text-sm font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
                <Target className="w-4 h-4 text-amber-500" />
                <span>{t.setup.targetScore}</span>
              </label>
              <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                Official Limits
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {scorePresets.map(preset => {
                const isSelected =
                  draftConfig.presetName !== 'custom' &&
                  draftConfig.targetScore === preset.score;

                return (
                  <button
                    key={preset.score}
                    type="button"
                    onClick={() => handleSelectScorePreset(preset.score)}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
                      isSelected
                        ? 'border-amber-500 bg-amber-500/15 text-amber-600 dark:text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)] font-bold'
                        : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/40 text-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    <span className="text-lg font-black text-neutral-900 dark:text-white">
                      {preset.score}
                    </span>
                    <span className="text-[10px] text-neutral-400 font-semibold">
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
                className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                  draftConfig.presetName === 'custom'
                    ? 'border-amber-500 bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold'
                    : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/40 text-neutral-700 dark:text-neutral-300'
                }`}
              >
                {t.setup.customGame}
              </button>

              <div className="flex-1 relative">
                <input
                  type="number"
                  min="10"
                  max="999"
                  value={customValue}
                  onChange={e => handleCustomChange(e.target.value)}
                  onFocus={() => {
                    const parsed = parseInt(customValue, 10) || 150;
                    setDraftConfig({ targetScore: parsed, presetName: 'custom' });
                  }}
                  placeholder="150"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <span className="absolute right-3 top-2 text-xs font-semibold text-neutral-400 pointer-events-none">
                  {t.setup.points}
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              {t.setup.description}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 px-6 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60">
          {!showConfirmReset ? (
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmReset(true)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-red-500/30 hover:border-red-500 bg-red-500/10 text-red-600 dark:text-red-400 text-xs sm:text-sm font-bold transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t.setup.newGame}</span>
              </button>

              <button
                type="button"
                onClick={handleSaveOnly}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-95"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{t.setup.startMatch}</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-red-600 dark:text-red-400 font-bold justify-center">
                <AlertTriangle className="w-4 h-4" />
                <span>{t.setup.confirmResetMessage}</span>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowConfirmReset(false)}
                  className="flex-1 py-2 px-3 rounded-xl bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-semibold"
                >
                  {t.setup.cancel}
                </button>
                <button
                  type="button"
                  onClick={handleResetAndStart}
                  className="flex-1 py-2 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold"
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
