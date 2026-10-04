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
import { RulesGuide } from './RulesGuide';

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
    const q = searchQuery.toLowerCase().trim();

    return CARDS_DATA.filter((card) => {
      if (activeCategory !== 'all' && activeCategory !== 'specials')
        return false;
      if (!q) return true;
      const name = (card.name[language] || card.name.en).toLowerCase();
      const desc = (
        card.description[language] || card.description.en
      ).toLowerCase();
      const tip = (card.tip?.[language] || card.tip?.en || '').toLowerCase();
      return name.includes(q) || desc.includes(q) || tip.includes(q);
    });
  }, [activeCategory, searchQuery, language]);

  const filteredEvents = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return EVENTS_DATA.filter((ev) => {
      if (activeCategory !== 'all' && activeCategory !== 'events') return false;
      if (!q) return true;
      const name = (ev.name[language] || ev.name.en).toLowerCase();
      const desc = (
        ev.description[language] || ev.description.en
      ).toLowerCase();
      return name.includes(q) || desc.includes(q);
    });
  }, [activeCategory, searchQuery, language]);

  const filteredPowerCards = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return POWER_CARDS_DATA.filter((pc) => {
      if (activeCategory !== 'all' && activeCategory !== 'power') return false;
      if (!q) return true;
      const name = (pc.name[language] || pc.name.en).toLowerCase();
      const desc = (
        pc.description[language] || pc.description.en
      ).toLowerCase();
      return name.includes(q) || desc.includes(q);
    });
  }, [activeCategory, searchQuery, language]);

  const filteredRuleCards = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return RULE_CARDS_DATA.filter((rc) => {
      if (activeCategory !== 'all' && activeCategory !== 'rules') return false;
      if (!q) return true;
      const name = (rc.name[language] || rc.name.en).toLowerCase();
      const desc = (
        rc.description[language] || rc.description.en
      ).toLowerCase();
      const flavor = (
        rc.flavor?.[language] ||
        rc.flavor?.en ||
        ''
      ).toLowerCase();
      return name.includes(q) || desc.includes(q) || flavor.includes(q);
    });
  }, [activeCategory, searchQuery, language]);

  const totalResults =
    filteredCards.length +
    filteredEvents.length +
    filteredPowerCards.length +
    filteredRuleCards.length;

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-20 md:pb-8">
      {/* Sub-tab Navigation (Guide vs Dictionary) */}
      <div className="flex flex-col items-stretch justify-between gap-3 rounded-3xl border border-neutral-200 bg-white p-2.5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:flex-row sm:items-center">
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
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-500/15 to-indigo-500/15 px-4 py-2 text-xs font-bold text-purple-700 shadow-sm transition-all hover:border-purple-500/50 hover:from-purple-500/25 hover:to-indigo-500/25 hover:shadow-md dark:border-purple-500/30 dark:text-purple-300 sm:text-sm"
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
          <div className="space-y-4 rounded-3xl border border-neutral-800 bg-neutral-900/90 p-6 text-white shadow-xl">
            <div>
              <h2 className="flex items-center gap-2 text-xl font-black sm:text-2xl">
                <Sparkles className="h-6 w-6 text-amber-400" />
                <span>{t.rules.title}</span>
              </h2>
              <p className="mt-1 text-xs text-neutral-400 sm:text-sm">
                Search cards, point values, events, and Pandora's Box rules.
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
                className="w-full rounded-xl border border-neutral-700 bg-neutral-800 py-2.5 pl-10 pr-9 text-sm font-medium text-white transition-all placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 rounded-md p-1 text-neutral-400 transition-colors hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Category Filter Dropdown */}
            <div className="flex items-center gap-2 pt-1">
              <label
                htmlFor="category-select"
                className="shrink-0 text-xs font-bold uppercase tracking-wider text-neutral-400"
              >
                Category:
              </label>
              <div className="relative w-full sm:max-w-xs">
                <select
                  id="category-select"
                  value={activeCategory}
                  onChange={(e) => {
                    soundEffects.playClick();
                    setActiveCategory(e.target.value as CategoryType);
                  }}
                  className="w-full appearance-none rounded-xl border border-neutral-700 bg-neutral-800 py-2 pl-3.5 pr-8 text-xs font-bold text-white shadow-sm transition-all focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 sm:text-sm"
                >
                  <option value="all">🌟 {t.rules.allCategories}</option>
                  <option value="specials">✨ {t.rules.specials}</option>
                  <option value="events">🔥 {t.rules.events}</option>
                  <option value="power">⚡ {t.rules.powerCards}</option>
                  <option value="rules">📜 {t.rules.ruleCards}</option>
                </select>
                <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400">
                  <ChevronDown className="h-4 w-4 shrink-0" />
                </div>
              </div>
            </div>
          </div>

          {totalResults === 0 ? (
            <div className="space-y-2 rounded-3xl border border-neutral-800 bg-neutral-900 p-8 text-center text-neutral-500">
              <HelpCircle className="mx-auto h-8 w-8 text-neutral-600" />
              <p className="text-sm font-bold text-neutral-300">
                {t.rules.noResults}
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Special Cards Section */}
              {filteredCards.length > 0 && (
                <div className="space-y-3">
                  <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-neutral-400">
                    <Sparkles className="h-4 w-4 text-amber-400" />
                    <span>{t.rules.specials}</span>
                    <span className="font-mono text-xs text-neutral-600">
                      ({filteredCards.length})
                    </span>
                  </h3>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {filteredCards.map((card) => (
                      <div
                        key={card.id}
                        className="space-y-2 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 transition-all hover:border-neutral-700"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-base font-bold text-white">
                            {card.name[language] || card.name.en}
                          </h4>
                          <span className="rounded-full border border-amber-500/30 bg-amber-500/15 px-2.5 py-0.5 text-xs font-black text-amber-400">
                            {card.points} {t.rules.pts}
                          </span>
                        </div>
                        <p className="text-xs leading-relaxed text-neutral-300">
                          {card.description[language] || card.description.en}
                        </p>
                        {card.tip && (
                          <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-2 text-[11px] text-amber-400/90">
                            💡 {card.tip[language] || card.tip.en}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Events Section */}
              {filteredEvents.length > 0 && (
                <div className="space-y-3">
                  <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-neutral-400">
                    <Flame className="h-4 w-4 text-rose-400" />
                    <span>{t.rules.events}</span>
                    <span className="font-mono text-xs text-neutral-600">
                      ({filteredEvents.length})
                    </span>
                  </h3>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {filteredEvents.map((ev) => (
                      <div
                        key={ev.id}
                        className="space-y-2 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 transition-all hover:border-neutral-700"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-base font-bold text-white">
                            {ev.name[language] || ev.name.en}
                          </h4>
                          <span className="rounded-full border border-rose-500/30 bg-rose-500/15 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-rose-400">
                            {ev.severity}
                          </span>
                        </div>
                        <p className="text-xs leading-relaxed text-neutral-300">
                          {ev.description[language] || ev.description.en}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Power Cards Section */}
              {filteredPowerCards.length > 0 && (
                <div className="space-y-3">
                  <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-neutral-400">
                    <Zap className="h-4 w-4 text-cyan-400" />
                    <span>{t.rules.powerCards}</span>
                    <span className="font-mono text-xs text-neutral-600">
                      ({filteredPowerCards.length})
                    </span>
                  </h3>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {filteredPowerCards.map((pc) => (
                      <div
                        key={pc.id}
                        className="space-y-2 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 transition-all hover:border-neutral-700"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-base font-bold text-white">
                            {pc.name[language] || pc.name.en}
                          </h4>
                          <span className="rounded-full border border-cyan-500/30 bg-cyan-500/15 px-2 py-0.5 text-xs font-bold text-cyan-400">
                            0 {t.rules.pts}
                          </span>
                        </div>
                        <p className="text-xs leading-relaxed text-neutral-300">
                          {pc.description[language] || pc.description.en}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Rule Cards Section */}
              {filteredRuleCards.length > 0 && (
                <div className="space-y-3">
                  <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-neutral-400">
                    <Layers className="h-4 w-4 text-purple-400" />
                    <span>{t.rules.ruleCards}</span>
                    <span className="font-mono text-xs text-neutral-600">
                      ({filteredRuleCards.length})
                    </span>
                  </h3>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {filteredRuleCards.map((rc) => (
                      <div
                        key={rc.id}
                        className="space-y-2 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 transition-all hover:border-purple-500/30"
                      >
                        <h4 className="text-base font-bold text-white">
                          {rc.name[language] || rc.name.en}
                        </h4>
                        <p className="text-xs leading-relaxed text-neutral-300">
                          {rc.description[language] || rc.description.en}
                        </p>
                        {rc.flavor && (
                          <p className="border-l-2 border-purple-500/40 pl-2 text-[11px] italic text-purple-300/80">
                            "{rc.flavor[language] || rc.flavor.en}"
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
