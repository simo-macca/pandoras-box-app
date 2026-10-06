import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Crown, RotateCcw, X, Award, Play, Eye } from 'lucide-react';
import { PlayerStats } from '../../hooks/useGameState';
import { PAWN_COLORS } from '../../utils/colors';
import { Language } from '../../types/game';
import { UI_TRANSLATIONS } from '../../data/translations';
import { soundEffects } from '../../utils/sound';

interface GameOverModalProps {
  isOpen: boolean;
  onClose: () => void;
  winner: PlayerStats | null;
  standings: PlayerStats[];
  targetScore: number;
  roundsCount: number;
  onPlayAgain: () => void;
  onContinue?: () => void;
  language: Language;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  isOpen,
  onClose,
  winner,
  standings,
  targetScore,
  roundsCount,
  onPlayAgain,
  onContinue,
  language,
}) => {
  const t = UI_TRANSLATIONS[language];

  useEffect(() => {
    if (isOpen) {
      soundEffects.playDiceFinish(true);

      const count = 200;
      const defaults = {
        origin: { y: 0.7 },
      };

      const fire = (particleRatio: number, opts: confetti.Options) => {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      };

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      });
      fire(0.2, {
        spread: 60,
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
    }
  }, [isOpen]);

  if (!isOpen || !winner) return null;

  const winnerTheme = PAWN_COLORS[winner.color];

  return (
    <div className="animate-fadeIn fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-2 backdrop-blur-md sm:p-4">
      <div
        className="flex max-h-[90dvh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border-2 border-amber-500/60 bg-white shadow-2xl dark:border-amber-500/60 dark:bg-neutral-900 dark:shadow-[0_0_50px_rgba(245,158,11,0.3)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="game-over-title"
      >
        <div className="relative shrink-0 border-b border-neutral-200 bg-gradient-to-b from-amber-500/15 via-amber-500/5 to-transparent p-4 text-center sm:p-6 dark:border-neutral-800 dark:from-amber-500/20 dark:via-neutral-900/40">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3 right-3 rounded-lg p-1.5 text-neutral-400 transition-colors hover:bg-neutral-200 hover:text-neutral-700 sm:top-4 sm:right-4 dark:hover:bg-neutral-800 dark:hover:text-white"
          >
            <X className="h-5 w-5 shrink-0" />
          </button>

          <div className="mx-auto mb-2 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 shadow-[0_0_30px_rgba(245,158,11,0.5)] sm:mb-3 sm:h-16 sm:w-16">
            <Trophy className="h-8 w-8 shrink-0 stroke-[2.2] text-neutral-950 sm:h-9 sm:w-9" />
          </div>

          <h2
            id="game-over-title"
            className="text-xl font-black tracking-wide text-neutral-900 sm:text-2xl md:text-3xl dark:text-white"
          >
            {t.gameOver.title}
          </h2>

          <div className="mt-1.5 flex items-center justify-center gap-1.5 sm:mt-2 sm:gap-2">
            <Crown className="h-4 w-4 shrink-0 animate-bounce fill-amber-400 text-amber-400 sm:h-5 sm:w-5" />
            <span
              className="truncate text-lg font-black sm:text-xl md:text-2xl"
              style={{ color: winnerTheme.hex }}
            >
              {winner.name}
            </span>
            <Crown className="h-4 w-4 shrink-0 animate-bounce fill-amber-400 text-amber-400 sm:h-5 sm:w-5" />
          </div>

          <p className="mx-auto mt-1 max-w-sm truncate text-xs text-neutral-600 dark:text-slate-300">
            {t.gameOver.winnerSubtitle}
          </p>

          <div className="mt-3 inline-flex items-center gap-3 rounded-xl border border-amber-500/30 bg-neutral-100 px-3 py-1.5 sm:mt-4 sm:gap-4 sm:px-4 sm:py-2 dark:bg-neutral-950/80">
            <div>
              <span className="block text-[10px] font-bold text-neutral-500 uppercase dark:text-slate-400">
                {t.gameOver.lowestPoints}
              </span>
              <span className="font-mono text-base font-black whitespace-nowrap text-amber-500 tabular-nums sm:text-xl dark:text-amber-400">
                {winner.totalScore} pts
              </span>
            </div>
            <div className="h-7 w-px bg-neutral-200 sm:h-8 dark:bg-slate-700" />
            <div>
              <span className="block text-[10px] font-bold text-neutral-500 uppercase dark:text-slate-400">
                {t.gameOver.roundsPlayed}
              </span>
              <span className="font-mono text-base font-black whitespace-nowrap text-neutral-800 tabular-nums sm:text-xl dark:text-slate-200">
                {roundsCount}
              </span>
            </div>
            <div className="h-7 w-px bg-neutral-200 sm:h-8 dark:bg-slate-700" />
            <div>
              <span className="block text-[10px] font-bold text-neutral-500 uppercase dark:text-slate-400">
                Threshold
              </span>
              <span className="font-mono text-base font-black whitespace-nowrap text-rose-500 tabular-nums sm:text-xl dark:text-rose-400">
                {targetScore}
              </span>
            </div>
          </div>
        </div>

        <div className="min-h-0 flex-1 space-y-2 overflow-y-auto px-4 py-3 sm:p-5">
          <h3 className="mb-2 text-xs font-bold tracking-wider text-neutral-500 uppercase dark:text-slate-400">
            {t.gameOver.finalStandings}
          </h3>

          {standings.map((player) => {
            const isWinner = player.id === winner.id;

            return (
              <div
                key={player.id}
                className={`flex items-center justify-between gap-2 rounded-xl border p-2.5 transition-all sm:p-3 ${
                  isWinner
                    ? 'border-amber-500/60 bg-amber-500/15 shadow-md ring-1 ring-amber-500/40'
                    : 'border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-800/40'
                }`}
              >
                <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-neutral-200 text-xs font-bold text-neutral-700 tabular-nums dark:bg-slate-800 dark:text-slate-200">
                    {isWinner ? (
                      <Award className="h-4 w-4 shrink-0 text-amber-500 dark:text-amber-400" />
                    ) : (
                      <span>#{player.rank}</span>
                    )}
                  </div>

                  <div className="flex min-w-0 items-center gap-2">
                    <span className="truncate text-sm font-bold text-neutral-900 dark:text-white">
                      {player.name}
                    </span>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <span
                    className={`font-mono text-base font-black whitespace-nowrap tabular-nums ${
                      isWinner
                        ? 'text-amber-500 dark:text-amber-400'
                        : 'text-neutral-700 dark:text-slate-300'
                    }`}
                  >
                    {player.totalScore} pts
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex shrink-0 flex-col gap-2.5 border-t border-neutral-200 bg-neutral-50 p-4 sm:p-5 dark:border-neutral-800 dark:bg-neutral-900/90">
          {/* Tier 1: Primary Action (New Match) */}
          <button
            type="button"
            onClick={() => {
              soundEffects.playClick();
              onPlayAgain();
            }}
            className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2.5 text-xs font-black text-neutral-950 shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all hover:from-amber-400 active:scale-95 sm:text-sm"
          >
            <RotateCcw className="h-4 w-4 shrink-0 stroke-[2.5]" />
            <span className="whitespace-nowrap">{t.gameOver.newMatch}</span>
          </button>

          {/* Tier 2: Secondary / Tertiary Actions */}
          <div
            className={`grid w-full gap-2 sm:gap-3 ${onContinue ? 'grid-cols-2' : 'grid-cols-1'}`}
          >
            <button
              type="button"
              onClick={() => {
                soundEffects.playClick();
                onClose();
              }}
              className="flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs font-bold text-neutral-700 shadow-sm transition-all hover:bg-neutral-100 hover:text-neutral-900 active:scale-[0.98] sm:text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:hover:text-white"
            >
              <Eye className="h-4 w-4 shrink-0 stroke-[2.2]" />
              <span className="truncate">{t.gameOver.viewScoreboard}</span>
            </button>

            {onContinue && (
              <button
                type="button"
                onClick={() => {
                  soundEffects.playClick();
                  onContinue();
                }}
                className="flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs font-bold text-neutral-700 shadow-sm transition-all hover:bg-neutral-100 hover:text-neutral-900 active:scale-[0.98] sm:text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:hover:text-white"
              >
                <Play className="h-4 w-4 shrink-0 stroke-[2.2]" />
                <span className="truncate">{t.gameOver.continueGame}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
