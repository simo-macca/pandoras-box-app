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
        className="hidden md:block w-full bg-neutral-100/80 dark:bg-neutral-900/60 border-b border-neutral-200 dark:border-neutral-800 py-2.5 px-4 transition-colors"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
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
              className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-xs uppercase tracking-wider shadow-sm hover:shadow-md transition-all active:scale-95"
              title={t.nav.newGame}
            >
              <RotateCcw className="w-4 h-4 stroke-[2.5]" />
              <span>{t.nav.newGame}</span>
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-lg border-t border-neutral-200 dark:border-neutral-800 pb-safe pt-1 px-3 shadow-[0_-4px_25px_rgba(0,0,0,0.15)] dark:shadow-[0_-4px_25px_rgba(0,0,0,0.5)]">
        <div className="grid grid-cols-4 items-center h-16 max-w-lg mx-auto">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleTabClick(item.id)}
                className={`flex flex-col items-center justify-center h-full py-1 rounded-xl transition-colors ${
                  isActive
                    ? 'text-amber-600 dark:text-amber-400 font-bold'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
                }`}
              >
                <Icon
                  className={`w-5 h-5 mb-1 ${
                    isActive ? 'text-amber-600 dark:text-amber-400 scale-110' : 'text-neutral-500 dark:text-neutral-400'
                  }`}
                />
                <span className="text-[10px] truncate max-w-[70px]">
                  {item.label}
                </span>
              </button>
            );
          })}

          {/* New Game Button for Mobile */}
          <button
            type="button"
            onClick={handleNewGame}
            className="flex flex-col items-center justify-center h-full py-1 rounded-xl text-neutral-500 dark:text-neutral-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            title={t.nav.newGame}
          >
            <RotateCcw className="w-5 h-5 mb-1 text-amber-500" />
            <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 truncate max-w-[70px]">
              {t.nav.newGame}
            </span>
          </button>
        </div>
      </div>
    </>
  );
};
