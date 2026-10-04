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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-lg bg-game-surface border-2 border-amber-500/60 rounded-3xl shadow-[0_0_50px_rgba(245,158,11,0.3)] overflow-hidden flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="game-over-title"
      >
        <div className="relative p-6 text-center bg-gradient-to-b from-amber-500/20 via-slate-900/40 to-transparent border-b border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center mx-auto mb-3 shadow-[0_0_30px_rgba(245,158,11,0.5)]">
            <Trophy className="w-9 h-9 text-neutral-950 stroke-[2.2]" />
          </div>

          <h2 id="game-over-title" className="text-2xl sm:text-3xl font-black text-white tracking-wide">
            {t.gameOver.title}
          </h2>

          <div className="mt-2 flex items-center justify-center gap-2">
            <Crown className="w-5 h-5 text-amber-400 fill-amber-400 animate-bounce" />
            <span
              className="text-xl sm:text-2xl font-black"
              style={{ color: winnerTheme.hex }}
            >
              {winner.name}
            </span>
            <Crown className="w-5 h-5 text-amber-400 fill-amber-400 animate-bounce" />
          </div>

          <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">
            {t.gameOver.winnerSubtitle}
          </p>

          <div className="mt-4 inline-flex items-center gap-4 px-4 py-2 rounded-xl bg-slate-900/80 border border-amber-500/30">
            <div>
              <span className="text-[10px] uppercase text-slate-400 block font-bold">
                {t.gameOver.lowestPoints}
              </span>
              <span className="text-xl font-black text-amber-400 font-mono">
                {winner.totalScore} pts
              </span>
            </div>
            <div className="w-px h-8 bg-slate-700" />
            <div>
              <span className="text-[10px] uppercase text-slate-400 block font-bold">
                {t.gameOver.roundsPlayed}
              </span>
              <span className="text-xl font-black text-slate-200 font-mono">
                {roundsCount}
              </span>
            </div>
            <div className="w-px h-8 bg-slate-700" />
            <div>
              <span className="text-[10px] uppercase text-slate-400 block font-bold">
                Threshold
              </span>
              <span className="text-xl font-black text-rose-400 font-mono">
                {targetScore}
              </span>
            </div>
          </div>
        </div>

        <div className="p-5 overflow-y-auto flex-1 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            {t.gameOver.finalStandings}
          </h3>

          {standings.map((player) => {
            const theme = PAWN_COLORS[player.color];
            const isWinner = player.id === winner.id;

            return (
              <div
                key={player.id}
                className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                  isWinner
                    ? 'bg-amber-500/15 border-amber-500/60 shadow-md ring-1 ring-amber-500/40'
                    : 'bg-slate-900/60 border-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs bg-slate-800 text-slate-200">
                    {isWinner ? (
                      <Award className="w-4 h-4 text-amber-400" />
                    ) : (
                      <span>#{player.rank}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: theme.hex }}
                    />
                    <span className="font-bold text-white text-sm">
                      {player.name}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`font-mono font-black text-base ${
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

        <div className="p-4 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            Review Board
          </button>

          <button
            type="button"
            onClick={() => {
              soundEffects.playClick();
              onPlayAgain();
            }}
            className="flex-1 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-neutral-950 font-black text-sm shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4 stroke-[2.5]" />
            <span>{t.gameOver.playAgain}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
