import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Crown, RotateCcw, X, Award } from 'lucide-react';
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
    <div className="animate-fadeIn fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 backdrop-blur-md sm:p-4">
      <div
        className="flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl border-2 border-amber-500/60 bg-game-surface shadow-[0_0_50px_rgba(245,158,11,0.3)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="game-over-title"
      >
        <div className="relative border-b border-slate-800 bg-gradient-to-b from-amber-500/20 via-slate-900/40 to-transparent p-6 text-center">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 shadow-[0_0_30px_rgba(245,158,11,0.5)]">
            <Trophy className="h-9 w-9 stroke-[2.2] text-neutral-950" />
          </div>

          <h2
            id="game-over-title"
            className="text-2xl font-black tracking-wide text-white sm:text-3xl"
          >
            {t.gameOver.title}
          </h2>

          <div className="mt-2 flex items-center justify-center gap-2">
            <Crown className="h-5 w-5 animate-bounce fill-amber-400 text-amber-400" />
            <span
              className="text-xl font-black sm:text-2xl"
              style={{ color: winnerTheme.hex }}
            >
              {winner.name}
            </span>
            <Crown className="h-5 w-5 animate-bounce fill-amber-400 text-amber-400" />
          </div>

          <p className="mx-auto mt-1 max-w-sm text-xs text-slate-300">
            {t.gameOver.winnerSubtitle}
          </p>

          <div className="mt-4 inline-flex items-center gap-4 rounded-xl border border-amber-500/30 bg-slate-900/80 px-4 py-2">
            <div>
              <span className="block text-[10px] font-bold uppercase text-slate-400">
                {t.gameOver.lowestPoints}
              </span>
              <span className="font-mono text-xl font-black text-amber-400">
                {winner.totalScore} pts
              </span>
            </div>
            <div className="h-8 w-px bg-slate-700" />
            <div>
              <span className="block text-[10px] font-bold uppercase text-slate-400">
                {t.gameOver.roundsPlayed}
              </span>
              <span className="font-mono text-xl font-black text-slate-200">
                {roundsCount}
              </span>
            </div>
            <div className="h-8 w-px bg-slate-700" />
            <div>
              <span className="block text-[10px] font-bold uppercase text-slate-400">
                Threshold
              </span>
              <span className="font-mono text-xl font-black text-rose-400">
                {targetScore}
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-2 overflow-y-auto p-5">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            {t.gameOver.finalStandings}
          </h3>

          {standings.map((player) => {
            const theme = PAWN_COLORS[player.color];
            const isWinner = player.id === winner.id;

            return (
              <div
                key={player.id}
                className={`flex items-center justify-between rounded-xl border p-3 transition-all ${
                  isWinner
                    ? 'border-amber-500/60 bg-amber-500/15 shadow-md ring-1 ring-amber-500/40'
                    : 'border-slate-800 bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-xs font-bold text-slate-200">
                    {isWinner ? (
                      <Award className="h-4 w-4 text-amber-400" />
                    ) : (
                      <span>#{player.rank}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: theme.hex }}
                    />
                    <span className="text-sm font-bold text-white">
                      {player.name}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`font-mono text-base font-black ${
                      isWinner ? 'text-amber-400' : 'text-slate-300'
                    }`}
                  >
                    {player.totalScore} pts
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-slate-800 bg-slate-900/90 p-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
          >
            Review Board
          </button>

          <button
            type="button"
            onClick={() => {
              soundEffects.playClick();
              onPlayAgain();
            }}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-2.5 text-sm font-black text-neutral-950 shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all hover:from-amber-400 active:scale-95"
          >
            <RotateCcw className="h-4 w-4 stroke-[2.5]" />
            <span>{t.gameOver.playAgain}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
