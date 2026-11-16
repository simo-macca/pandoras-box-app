import React from 'react';
import { Trophy, Layers, BookOpen } from 'lucide-react';
import { Language } from '@/types/game';
import { TRANSLATIONS } from '@/data/translations';
import { soundEffects } from '@/utils/sound';

export type ActiveTab = 'scoreboard' | 'rulecards' | 'rules';

interface TabNavigationProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  language: Language;
  /** `desktop` renders inline tabs for the header, `mobile` a bottom tab bar. */
  variant: 'desktop' | 'mobile';
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onSelectTab,
  language,
  variant,
}) => {
  const t = TRANSLATIONS[language];

  const handleTabClick = (tab: ActiveTab) => {
    soundEffects.playClick();
    onSelectTab(tab);
  };

  // Icons: trophy = standings, layered cards = rule card deck, book = rules.
  const navItems = [
    { id: 'scoreboard' as ActiveTab, label: t.nav.scoreboard, icon: Trophy },
    { id: 'rulecards' as ActiveTab, label: t.nav.ruleCards, icon: Layers },
    { id: 'rules' as ActiveTab, label: t.nav.directory, icon: BookOpen },
  ];

  if (variant === 'desktop') {
    return (
      <nav aria-label={t.nav.scoreboard} className="segmented">
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => handleTabClick(id)}
              aria-current={isActive ? 'page' : undefined}
              className={`segmented-item h-9 px-4 text-sm ${
                isActive ? 'segmented-item-active' : ''
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? 'text-amber-500' : ''}`} />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>
    );
  }

  return (
    <nav
      aria-label={t.nav.scoreboard}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200/70 bg-white/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl backdrop-saturate-150 lg:hidden dark:border-white/[0.06] dark:bg-neutral-950/85"
    >
      <div className="mx-auto grid h-16 max-w-md grid-cols-3 px-2">
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => handleTabClick(id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center gap-1 text-[11px] font-semibold transition-colors ${
                isActive
                  ? 'text-neutral-900 dark:text-white'
                  : 'text-neutral-500 dark:text-neutral-400'
              }`}
            >
              <span
                className={`flex h-7 w-14 items-center justify-center rounded-full transition-colors ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                    : ''
                }`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span className="w-full truncate px-1 text-center">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
