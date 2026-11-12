import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Search,
  X,
  HelpCircle,
  BookOpen,
  ExternalLink,
} from 'lucide-react';
import { Language } from '@/types/game';
import { OFFICIAL_PDF_LINKS } from '@/data/rulebookLinks';
import { TRANSLATIONS } from '@/data/translations';
import { soundEffects } from '@/utils/sound';
import { DictionaryCategory, searchDictionary } from '@/utils/cardSearch';
import { RulesGuide } from './RulesGuide';
import { CategoryFilter } from './CategoryFilter';
import { SpecialCardsSection } from './SpecialCardsSection';
import { EventCardsSection } from './EventCardsSection';
import { PowerCardsSection } from './PowerCardsSection';
import { RuleCardsSection } from './RuleCardsSection';

interface CardDictionaryProps {
  language: Language;
}

type SubTab = 'guide' | 'dictionary';

/** Rules tab: the rules summary and the searchable card dictionary. */
export const CardDictionary: React.FC<CardDictionaryProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [subTab, setSubTab] = useState<SubTab>('guide');
  const [activeCategory, setActiveCategory] =
    useState<DictionaryCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const results = useMemo(
    () => searchDictionary(activeCategory, searchQuery, language),
    [activeCategory, searchQuery, language]
  );

  const subTabClass = (tab: SubTab) =>
    `flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all sm:text-sm ${
      subTab === tab
        ? 'bg-amber-500 font-black text-neutral-950 shadow-md'
        : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
    }`;

  const selectSubTab = (tab: SubTab) => {
    soundEffects.playClick();
    setSubTab(tab);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-20 md:pb-8">
      {/* Sub-tab Navigation (Guide vs Dictionary) */}
      <div className="flex flex-col items-stretch justify-between gap-3 rounded-3xl border border-neutral-200 bg-white p-2.5 shadow-sm sm:flex-row sm:items-center dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex items-center gap-1.5 rounded-2xl bg-neutral-100 p-1 dark:bg-neutral-800/80">
          <button
            type="button"
            aria-pressed={subTab === 'guide'}
            onClick={() => selectSubTab('guide')}
            className={subTabClass('guide')}
          >
            <BookOpen className="h-4 w-4" />
            <span>{t.rules.guideTab}</span>
          </button>

          <button
            type="button"
            aria-pressed={subTab === 'dictionary'}
            onClick={() => selectSubTab('dictionary')}
            className={subTabClass('dictionary')}
          >
            <Search className="h-4 w-4" />
            <span>{t.rules.dictionaryTab}</span>
          </button>
        </div>

        <a
          href={OFFICIAL_PDF_LINKS[language]}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-purple-500/30 bg-linear-to-r from-purple-500/15 to-indigo-500/15 px-4 py-2 text-xs font-bold text-purple-700 shadow-sm transition-all hover:border-purple-500/50 hover:from-purple-500/25 hover:to-indigo-500/25 hover:shadow-md sm:text-sm dark:border-purple-500/30 dark:text-purple-300"
          title={`${t.rules.viewOfficialRules} (${language.toUpperCase()})`}
        >
          <BookOpen className="h-4 w-4 shrink-0 text-purple-600 dark:text-purple-400" />
          <span>
            {t.rules.viewOfficialRules} ({language.toUpperCase()})
          </span>
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
                {t.rules.searchSubtitle}
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
                aria-label={t.rules.searchPlaceholder}
                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 pr-9 pl-10 text-sm font-medium text-neutral-900 transition-all placeholder:text-neutral-400 focus:ring-2 focus:ring-amber-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label={t.common.clearSearch}
                  className="absolute right-3 rounded-md p-1 text-neutral-400 transition-colors hover:text-neutral-700 dark:hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <CategoryFilter
              value={activeCategory}
              onChange={(category) => {
                soundEffects.playClick();
                setActiveCategory(category);
              }}
              language={language}
            />
          </div>

          {results.total === 0 ? (
            <div className="space-y-2 rounded-3xl border border-neutral-200 bg-white p-8 text-center text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900">
              <HelpCircle className="mx-auto h-8 w-8 text-neutral-400 dark:text-neutral-600" />
              <p className="text-sm font-bold text-neutral-800 dark:text-neutral-300">
                {t.rules.noResults}
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              <SpecialCardsSection
                cards={results.specials}
                language={language}
              />
              <EventCardsSection events={results.events} language={language} />
              <PowerCardsSection
                powerCards={results.power}
                language={language}
              />
              <RuleCardsSection ruleCards={results.rules} language={language} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
