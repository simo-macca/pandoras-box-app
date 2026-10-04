import React from 'react';
import { Trophy, Sparkles, BookOpen } from 'lucide-react';
import { Language } from '../../types/game';
import { TRANSLATIONS } from '../../data/translations';
import { soundEffects } from '../../utils/sound';

export type ActiveTab = 'scoreboard' | 'rulecards' | 'rules';

interface TabNavigationProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  language: Language;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onSelectTab,
  language,
}) => {
  const t = TRANSLATIONS[language];

  const handleTabClick = (tab: ActiveTab) => {
    soundEffects.playClick();
    onSelectTab(tab);
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
                    className={`h-4 w-4 shrink-0 ${
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
        </div>
      </nav>

      {/* Mobile Bottom Bar */}
      <div className="pb-safe fixed bottom-0 left-0 right-0 z-40 border-t border-neutral-200 bg-white/95 px-2 pb-2 pt-1 shadow-[0_-4px_25px_rgba(0,0,0,0.15)] backdrop-blur-lg dark:border-neutral-800 dark:bg-neutral-900/95 dark:shadow-[0_-4px_25px_rgba(0,0,0,0.5)] sm:pb-0 md:hidden">
        <div className="mx-auto grid h-16 max-w-lg grid-cols-3 items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleTabClick(item.id)}
                className={`flex h-full flex-col items-center justify-center rounded-xl px-1 py-1 transition-colors ${
                  isActive
                    ? 'font-bold text-amber-600 dark:text-amber-400'
                    : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200'
                }`}
              >
                <Icon
                  className={`mb-1 h-5 w-5 shrink-0 transition-transform ${
                    isActive
                      ? 'scale-110 text-amber-600 dark:text-amber-400'
                      : 'text-neutral-500 dark:text-neutral-400'
                  }`}
                />
                <span className="w-full truncate px-0.5 text-center text-xs sm:text-sm">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
