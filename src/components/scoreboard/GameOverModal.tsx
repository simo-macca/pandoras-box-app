import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Crown, RotateCcw, X, Play, Eye } from 'lucide-react';
import { PlayerStats } from '@/utils/stats';
import { PAWN_COLORS } from '@/utils/colors';
import { Language } from '@/types/game';
import { TRANSLATIONS } from '@/data/translations';
import { soundEffects } from '@/utils/sound';
import { useModalA11y } from '@/hooks/useModalA11y';
import { Modal } from '@/components/common/Modal';

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
  const t = TRANSLATIONS[language];

  useEffect(() => {
    if (isOpen) {
      soundEffects.playChime(true);

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

  useModalA11y(isOpen, onClose);

  if (!isOpen || !winner) return null;

  const winnerTheme = PAWN_COLORS[winner.color];

  const stats = [
    {
      label: t.gameOver.lowestPoints,
      value: `${winner.totalScore} ${t.scoreboard.pts}`,
      className: 'text-amber-600 dark:text-amber-400',
    },
    {
      label: t.gameOver.roundsPlayed,
      value: String(roundsCount),
      className: '',
    },
    { label: t.gameOver.limit, value: String(targetScore), className: '' },
  ];

  const hero = (
    <div className="relative shrink-0 overflow-hidden px-5 pt-6 pb-5 text-center sm:pt-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-56 w-[28rem] max-w-full rounded-full bg-amber-400/25 blur-3xl"
      />
      <button
        type="button"
        onClick={onClose}
        aria-label={t.common.close}
        className="btn-icon btn-icon-sm absolute top-3 right-3"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="relative mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 to-amber-500 text-neutral-950 shadow-(--shadow-glow)">
        <Trophy className="h-8 w-8" />
      </div>
      <p className="eyebrow relative">{t.gameOver.title}</p>
      <h2
        id="game-over-title"
        className="relative mt-1 flex items-center justify-center gap-2 truncate text-2xl font-bold tracking-tight sm:text-3xl"
        style={{ color: winnerTheme.hex }}
      >
        <Crown className="h-6 w-6 shrink-0 fill-amber-400 text-amber-400" />
        <span className="truncate">{winner.name}</span>
      </h2>
      <p className="relative mx-auto mt-1 max-w-sm text-sm text-neutral-500 dark:text-neutral-400">
        {t.gameOver.winnerSubtitle}
      </p>

      <dl className="card-muted relative mx-auto mt-5 grid max-w-sm grid-cols-3 divide-x divide-neutral-200/80 dark:divide-white/[0.06]">
        {stats.map((stat) => (
          <div key={stat.label} className="px-2 py-3">
            <dt className="eyebrow truncate text-[10px]">{stat.label}</dt>
            <dd
              className={`score-number mt-0.5 text-lg whitespace-nowrap text-neutral-900 dark:text-white ${stat.className}`}
            >
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );

  return (
    <Modal
      onClose={onClose}
      closeLabel={t.common.close}
      title={t.gameOver.title}
      customHeader={hero}
      labelledBy="game-over-title"
      size="md"
      bodyClassName="space-y-2 border-t border-neutral-200/80 dark:border-white/[0.07]"
      footer={
        <div className="flex w-full flex-col gap-2">
          <button
            type="button"
            onClick={() => {
              soundEffects.playClick();
              onPlayAgain();
            }}
            className="btn btn-primary btn-lg btn-block"
          >
            <RotateCcw className="h-4 w-4" />
            <span>{t.gameOver.newMatch}</span>
          </button>
          <div
            className={`grid w-full gap-2 ${onContinue ? 'grid-cols-2' : 'grid-cols-1'}`}
          >
            <button
              type="button"
              onClick={() => {
                soundEffects.playClick();
                onClose();
              }}
              className="btn btn-secondary min-w-0"
            >
              <Eye className="h-4 w-4" />
              <span className="truncate">{t.gameOver.viewScoreboard}</span>
            </button>
            {onContinue && (
              <button
                type="button"
                onClick={() => {
                  soundEffects.playClick();
                  onContinue();
                }}
                className="btn btn-secondary min-w-0"
              >
                <Play className="h-4 w-4" />
                <span className="truncate">{t.gameOver.continueGame}</span>
              </button>
            )}
          </div>
        </div>
      }
    >
      <h3 className="eyebrow mb-2">{t.gameOver.finalStandings}</h3>
      <ol className="space-y-2">
        {standings.map((player) => {
          const isWinner = player.id === winner.id;
          const theme = PAWN_COLORS[player.color];
          return (
            <li
              key={player.id}
              className={`flex items-center justify-between gap-3 rounded-xl border px-3 py-2.5 ${
                isWinner
                  ? 'border-amber-400/60 bg-amber-500/10'
                  : 'border-neutral-200/80 dark:border-white/[0.07]'
              }`}
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="w-6 shrink-0 text-center text-sm font-bold text-neutral-400 tabular-nums">
                  {isWinner ? (
                    <Crown className="mx-auto h-4 w-4 fill-amber-400 text-amber-400" />
                  ) : (
                    player.rank
                  )}
                </span>
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: theme.hex }}
                />
                <span className="truncate text-sm font-semibold text-neutral-900 dark:text-white">
                  {player.name}
                </span>
              </div>
              <span
                className={`score-number shrink-0 text-base whitespace-nowrap ${
                  isWinner
                    ? 'text-amber-600 dark:text-amber-400'
                    : 'text-neutral-700 dark:text-neutral-300'
                }`}
              >
                {player.totalScore} {t.scoreboard.pts}
              </span>
            </li>
          );
        })}
      </ol>
    </Modal>
  );
};
