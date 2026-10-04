import React from 'react';
import { Trophy, Sparkles, BookOpen, RotateCcw } from 'lucide-react';
import { Language } from '../../types/game';
import { TRANSLATIONS } from '../../data/translations';
import { soundEffects } from '../../utils/sound';

export type ActiveTab = 'scoreboard' | 'rulecards' | 'rules';

interface TabNavigationProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  language: Language;
  onStartNewGame?: () => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onSelectTab,
  language,
  onStartNewGame,
}) => {
  const t = TRANSLATIONS[language];

  const handleTabClick = (tab: ActiveTab) => {
    soundEffects.playClick();
    onSelectTab(tab);
  };

  const handleNewGame = () => {
    soundEffects.playClick();
    if (onStartNewGame) {
      onStartNewGame();
    }
  };

  const navItems = [
    {
      id: 'scoreboard' as ActiveTab,
      label: t.nav.scoreboard,
      icon: Trophy,
    },
    {
      id: 'rulecards' as ActiveTab,
      label: t.nav.ruleCards,
      icon: Sparkles,
    },
    {
      id: 'rules' as ActiveTab,
      label: t.nav.directory,
      icon: BookOpen,
    },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        aria-label="Desktop tabs"
        className="hidden w-full border-b border-neutral-200 bg-neutral-100/80 px-4 py-2.5 transition-colors dark:border-neutral-800 dark:bg-neutral-900/60 md:block"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-bold transition-all ${
                    isActive
                      ? 'border border-amber-500/30 bg-amber-500/15 text-amber-600 shadow-sm dark:text-amber-400'
                      : 'text-neutral-600 hover:bg-neutral-200/60 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800/60 dark:hover:text-white'
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 ${
                      isActive
                        ? 'text-amber-500 dark:text-amber-400'
                        : 'text-neutral-500 dark:text-neutral-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {onStartNewGame && (
            <button
              type="button"
              onClick={handleNewGame}
              className="flex items-center gap-2 rounded-2xl bg-amber-500 px-4 py-2 text-xs font-black uppercase tracking-wider text-neutral-950 shadow-sm transition-all hover:bg-amber-400 hover:shadow-md active:scale-95"
              title={t.nav.newGame}
            >
              <RotateCcw className="h-4 w-4 stroke-[2.5]" />
              <span>{t.nav.newGame}</span>
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Bottom Bar */}
      <div className="pb-safe fixed bottom-0 left-0 right-0 z-40 border-t border-neutral-200 bg-white/95 px-3 pt-1 shadow-[0_-4px_25px_rgba(0,0,0,0.15)] backdrop-blur-lg dark:border-neutral-800 dark:bg-neutral-900/95 dark:shadow-[0_-4px_25px_rgba(0,0,0,0.5)] md:hidden">
        <div className="mx-auto grid h-16 max-w-lg grid-cols-4 items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleTabClick(item.id)}
                className={`flex h-full flex-col items-center justify-center rounded-xl py-1 transition-colors ${
                  isActive
                    ? 'font-bold text-amber-600 dark:text-amber-400'
                    : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200'
                }`}
              >
                <Icon
                  className={`mb-1 h-5 w-5 ${
                    isActive
                      ? 'scale-110 text-amber-600 dark:text-amber-400'
                      : 'text-neutral-500 dark:text-neutral-400'
                  }`}
                />
                <span className="max-w-[70px] truncate text-[10px]">
                  {item.label}
                </span>
              </button>
            );
          })}

          {/* New Game Button for Mobile */}
          <button
            type="button"
            onClick={handleNewGame}
            className="flex h-full flex-col items-center justify-center rounded-xl py-1 text-neutral-500 transition-colors hover:text-amber-600 dark:text-neutral-400 dark:hover:text-amber-400"
            title={t.nav.newGame}
          >
            <RotateCcw className="mb-1 h-5 w-5 text-amber-500" />
            <span className="max-w-[70px] truncate text-[10px] font-bold text-amber-600 dark:text-amber-400">
              {t.nav.newGame}
            </span>
          </button>
        </div>
      </div>
    </>
  );
};
