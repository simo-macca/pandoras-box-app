import React, { useState, useMemo } from 'react';
import {
  Search,
  SearchX,
  X,
  BookOpen,
  ExternalLink,
  FileText,
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

  const selectSubTab = (tab: SubTab) => {
    soundEffects.playClick();
    setSubTab(tab);
  };

  const subTabs = [
    { id: 'guide' as SubTab, label: t.rules.guideTab, icon: BookOpen },
    { id: 'dictionary' as SubTab, label: t.rules.dictionaryTab, icon: Search },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Guide / dictionary switch + official rulebook link */}
      <div className="flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center">
        <div className="segmented grid grid-cols-2 sm:inline-flex">
          {subTabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              aria-pressed={subTab === id}
              onClick={() => selectSubTab(id)}
              className={`segmented-item h-9 px-4 text-sm ${
                subTab === id ? 'segmented-item-active' : ''
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        <a
          href={OFFICIAL_PDF_LINKS[language]}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
          title={`${t.rules.viewOfficialRules} (${language.toUpperCase()})`}
        >
          <FileText className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          <span className="truncate">
            {t.rules.viewOfficialRules} ({language.toUpperCase()})
          </span>
          <ExternalLink className="h-3.5 w-3.5 opacity-60" />
        </a>
      </div>

      {subTab === 'guide' ? (
        <RulesGuide language={language} />
      ) : (
        <div className="space-y-8">
          {/* Search header */}
          <section className="card space-y-4 p-5 sm:p-6">
            <div>
              <h2 className="section-title">{t.rules.title}</h2>
              <p className="section-subtitle mt-1">{t.rules.searchSubtitle}</p>
            </div>

            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.rules.searchPlaceholder}
                aria-label={t.rules.searchPlaceholder}
                className="input h-11 pr-10 pl-10 [&::-webkit-search-cancel-button]:hidden"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label={t.common.clearSearch}
                  className="btn-icon btn-icon-sm absolute top-1/2 right-1.5 -translate-y-1/2"
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
          </section>

          {results.total === 0 ? (
            <div className="card flex flex-col items-center gap-2 border-dashed px-6 py-12 text-center">
              <div className="icon-tile bg-neutral-100 text-neutral-400 dark:bg-white/[0.06]">
                <SearchX className="h-5 w-5" />
              </div>
              <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                {t.rules.noResults}
              </p>
            </div>
          ) : (
            <div className="space-y-10">
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
