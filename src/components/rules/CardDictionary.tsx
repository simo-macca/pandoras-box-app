import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Flame,
  Zap,
  Layers,
  Search,
  X,
  HelpCircle,
  BookOpen,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { CARDS_DATA } from '../../data/cardsData';
import { EVENTS_DATA } from '../../data/eventsData';
import { POWER_CARDS_DATA } from '../../data/powerCardsData';
import { RULE_CARDS_DATA } from '../../data/ruleCardsData';
import { Language } from '../../types/game';
import { OFFICIAL_PDF_LINKS } from '../../types/rules';
import { TRANSLATIONS } from '../../data/translations';
import { soundEffects } from '../../utils/sound';
import { matchesSearchQuery } from '../../utils/i18n';
import { RulesGuide } from './RulesGuide';
import { SpecialCardsSection } from './SpecialCardsSection';
import { EventCardsSection } from './EventCardsSection';
import { PowerCardsSection } from './PowerCardsSection';
import { RuleCardsSection } from './RuleCardsSection';

interface CardDictionaryProps {
  language: Language;
}

type CategoryType = 'all' | 'specials' | 'events' | 'power' | 'rules';

export const CardDictionary: React.FC<CardDictionaryProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [subTab, setSubTab] = useState<'guide' | 'dictionary'>('guide');
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCards = useMemo(() => {
    return CARDS_DATA.filter((card) => {
      if (activeCategory !== 'all' && activeCategory !== 'specials')
        return false;
      return matchesSearchQuery(
        [
          card.name[language],
          card.name.en,
          card.description[language],
          card.description.en,
          card.tip?.[language],
          card.tip?.en,
        ],
        searchQuery
      );
    });
  }, [activeCategory, searchQuery, language]);

  const filteredEvents = useMemo(() => {
    return EVENTS_DATA.filter((ev) => {
      if (activeCategory !== 'all' && activeCategory !== 'events') return false;
      return matchesSearchQuery(
        [
          ev.name[language],
          ev.name.en,
          ev.description[language],
          ev.description.en,
        ],
        searchQuery
      );
    });
  }, [activeCategory, searchQuery, language]);

  const filteredPowerCards = useMemo(() => {
    return POWER_CARDS_DATA.filter((pc) => {
      if (activeCategory !== 'all' && activeCategory !== 'power') return false;
      return matchesSearchQuery(
        [
          pc.name[language],
          pc.name.en,
          pc.description[language],
          pc.description.en,
        ],
        searchQuery
      );
    });
  }, [activeCategory, searchQuery, language]);

  const filteredRuleCards = useMemo(() => {
    return RULE_CARDS_DATA.filter((rc) => {
      if (activeCategory !== 'all' && activeCategory !== 'rules') return false;
      return matchesSearchQuery(
        [
          rc.name[language],
          rc.name.en,
          rc.description[language],
          rc.description.en,
          rc.flavor?.[language],
          rc.flavor?.en,
        ],
        searchQuery
      );
    });
  }, [activeCategory, searchQuery, language]);

  const totalResults =
    filteredCards.length +
    filteredEvents.length +
    filteredPowerCards.length +
    filteredRuleCards.length;

  const getCategoryIcon = (category: CategoryType) => {
    switch (category) {
      case 'events':
        return (
          <Flame className="h-4 w-4 shrink-0 text-rose-500 dark:text-rose-400" />
        );
      case 'power':
        return (
          <Zap className="h-4 w-4 shrink-0 text-cyan-600 dark:text-cyan-400" />
        );
      case 'rules':
        return (
          <Layers className="h-4 w-4 shrink-0 text-purple-600 dark:text-purple-400" />
        );
      case 'specials':
        return (
          <Sparkles className="h-4 w-4 shrink-0 text-amber-500 dark:text-amber-400" />
        );
      case 'all':
      default:
        return null;
    }
  };

  const categoryFilters = [
    { id: 'all' as CategoryType, label: t.rules.allCategories },
    {
      id: 'specials' as CategoryType,
      label: t.rules.specials,
      icon: Sparkles,
      colorClass: 'text-amber-500 dark:text-amber-400',
    },
    {
      id: 'events' as CategoryType,
      label: t.rules.events,
      icon: Flame,
      colorClass: 'text-rose-500 dark:text-rose-400',
    },
    {
      id: 'power' as CategoryType,
      label: t.rules.powerCards,
      icon: Zap,
      colorClass: 'text-cyan-600 dark:text-cyan-400',
    },
    {
      id: 'rules' as CategoryType,
      label: t.rules.ruleCards,
      icon: Layers,
      colorClass: 'text-purple-600 dark:text-purple-400',
    },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-20 md:pb-8">
      {/* Sub-tab Navigation (Guide vs Dictionary) */}
      <div className="flex flex-col items-stretch justify-between gap-3 rounded-3xl border border-neutral-200 bg-white p-2.5 shadow-sm sm:flex-row sm:items-center dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex items-center gap-1.5 rounded-2xl bg-neutral-100 p-1 dark:bg-neutral-800/80">
          <button
            type="button"
            onClick={() => {
              soundEffects.playClick();
              setSubTab('guide');
            }}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all sm:text-sm ${
              subTab === 'guide'
                ? 'bg-amber-500 font-black text-neutral-950 shadow-md'
                : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>{t.rules.guideTab}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundEffects.playClick();
              setSubTab('dictionary');
            }}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all sm:text-sm ${
              subTab === 'dictionary'
                ? 'bg-amber-500 font-black text-neutral-950 shadow-md'
                : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
            }`}
          >
            <Search className="h-4 w-4" />
            <span>{t.rules.dictionaryTab}</span>
          </button>
        </div>

        <a
          href={OFFICIAL_PDF_LINKS[language] || OFFICIAL_PDF_LINKS.en}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-500/15 to-indigo-500/15 px-4 py-2 text-xs font-bold text-purple-700 shadow-sm transition-all hover:border-purple-500/50 hover:from-purple-500/25 hover:to-indigo-500/25 hover:shadow-md sm:text-sm dark:border-purple-500/30 dark:text-purple-300"
          title={`View Official Rules (${language.toUpperCase()})`}
        >
          <BookOpen className="h-4 w-4 shrink-0 text-purple-600 dark:text-purple-400" />
          <span>View Official Rules ({language.toUpperCase()})</span>
          <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-70" />
        </a>
      </div>

      {subTab === 'guide' ? (
        <RulesGuide language={language} />
      ) : (
        <div className="space-y-6">
          {/* Search Header */}
          <div className="space-y-4 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-6 dark:border-neutral-800 dark:bg-neutral-900/90">
            <div>
              <h2 className="flex items-center gap-2 text-xl font-black text-neutral-900 sm:text-2xl dark:text-white">
                <Sparkles className="h-6 w-6 text-amber-500 dark:text-amber-400" />
                <span>{t.rules.title}</span>
              </h2>
              <p className="mt-1 text-xs text-neutral-500 sm:text-sm dark:text-neutral-400">
                Search cards, point values, events, and Pandora&apos;s Box
                rules.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative flex w-full items-center">
              <div className="pointer-events-none absolute left-3.5 text-neutral-400">
                <Search className="h-4 w-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.rules.searchPlaceholder}
                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 pr-9 pl-10 text-sm font-medium text-neutral-900 transition-all placeholder:text-neutral-400 focus:ring-2 focus:ring-amber-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 rounded-md p-1 text-neutral-400 transition-colors hover:text-neutral-700 dark:hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Mobile Mode: Dropdown Menu */}
            <div className="flex items-center gap-2 pt-1 sm:hidden">
              <label
                htmlFor="category-select"
                className="shrink-0 text-xs font-bold tracking-wider text-neutral-500 uppercase dark:text-neutral-400"
              >
                Category:
              </label>
              <div className="relative w-full">
                {activeCategory !== 'all' && (
                  <div className="pointer-events-none absolute top-1/2 left-3.5 flex -translate-y-1/2 items-center justify-center">
                    {getCategoryIcon(activeCategory)}
                  </div>
                )}
                <select
                  id="category-select"
                  value={activeCategory}
                  onChange={(e) => {
                    soundEffects.playClick();
                    setActiveCategory(e.target.value as CategoryType);
                  }}
                  className={`w-full appearance-none rounded-xl border border-neutral-200 bg-neutral-50 py-2 pr-8 text-xs font-bold text-neutral-900 shadow-sm transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white ${
                    activeCategory !== 'all' ? 'pl-10' : 'pl-3.5'
                  }`}
                >
                  <option value="all">{t.rules.allCategories}</option>
                  <option value="specials">{t.rules.specials}</option>
                  <option value="events">{t.rules.events}</option>
                  <option value="power">{t.rules.powerCards}</option>
                  <option value="rules">{t.rules.ruleCards}</option>
                </select>
                <div className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-neutral-400">
                  <ChevronDown className="h-4 w-4 shrink-0" />
                </div>
              </div>
            </div>

            {/* PC / Desktop Mode: Inline Labels Menu */}
            <div className="hidden flex-wrap items-center gap-2 pt-1 sm:flex">
              <span className="mr-1 shrink-0 text-xs font-bold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                Category:
              </span>
              {categoryFilters.map((cat) => {
                const isSelected = activeCategory === cat.id;
                const Icon = cat.icon;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      soundEffects.playClick();
                      setActiveCategory(cat.id);
                    }}
                    className={`flex items-center gap-1.5 rounded-xl border px-3.5 py-1.5 text-xs font-bold transition-all ${
                      isSelected
                        ? 'border-amber-500 bg-amber-500/15 text-neutral-900 shadow-sm dark:border-amber-500/60 dark:bg-amber-500/20 dark:text-white'
                        : 'border-neutral-200 bg-neutral-50 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-700/60 dark:bg-neutral-800/60 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:bg-neutral-800 dark:hover:text-white'
                    }`}
                  >
                    {Icon && (
                      <Icon
                        className={`h-3.5 w-3.5 shrink-0 ${cat.colorClass || ''}`}
                      />
                    )}
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {totalResults === 0 ? (
            <div className="space-y-2 rounded-3xl border border-neutral-200 bg-white p-8 text-center text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900">
              <HelpCircle className="mx-auto h-8 w-8 text-neutral-400 dark:text-neutral-600" />
              <p className="text-sm font-bold text-neutral-800 dark:text-neutral-300">
                {t.rules.noResults}
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              <SpecialCardsSection cards={filteredCards} language={language} />
              <EventCardsSection events={filteredEvents} language={language} />
              <PowerCardsSection
                powerCards={filteredPowerCards}
                language={language}
              />
              <RuleCardsSection
                ruleCards={filteredRuleCards}
                language={language}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
