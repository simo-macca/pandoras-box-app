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
  FileText,
  ExternalLink
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

    return CARDS_DATA.filter(card => {
      if (activeCategory !== 'all' && activeCategory !== 'specials') return false;
      if (!q) return true;
      const name = (card.name[language] || card.name.en).toLowerCase();
      const desc = (card.description[language] || card.description.en).toLowerCase();
      const tip = (card.tip?.[language] || card.tip?.en || '').toLowerCase();
      return name.includes(q) || desc.includes(q) || tip.includes(q);
    });
  }, [activeCategory, searchQuery, language]);

  const filteredEvents = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return EVENTS_DATA.filter(ev => {
      if (activeCategory !== 'all' && activeCategory !== 'events') return false;
      if (!q) return true;
      const name = (ev.name[language] || ev.name.en).toLowerCase();
      const desc = (ev.description[language] || ev.description.en).toLowerCase();
      return name.includes(q) || desc.includes(q);
    });
  }, [activeCategory, searchQuery, language]);

  const filteredPowerCards = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return POWER_CARDS_DATA.filter(pc => {
      if (activeCategory !== 'all' && activeCategory !== 'power') return false;
      if (!q) return true;
      const name = (pc.name[language] || pc.name.en).toLowerCase();
      const desc = (pc.description[language] || pc.description.en).toLowerCase();
      return name.includes(q) || desc.includes(q);
    });
  }, [activeCategory, searchQuery, language]);

  const filteredRuleCards = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return RULE_CARDS_DATA.filter(rc => {
      if (activeCategory !== 'all' && activeCategory !== 'rules') return false;
      if (!q) return true;
      const name = (rc.name[language] || rc.name.en).toLowerCase();
      const desc = (rc.description[language] || rc.description.en).toLowerCase();
      const flavor = (rc.flavor?.[language] || rc.flavor?.en || '').toLowerCase();
      return name.includes(q) || desc.includes(q) || flavor.includes(q);
    });
  }, [activeCategory, searchQuery, language]);

  const totalResults =
    filteredCards.length +
    filteredEvents.length +
    filteredPowerCards.length +
    filteredRuleCards.length;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20 md:pb-8">
      {/* Sub-tab Navigation (Guide vs Dictionary) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-neutral-900 p-2.5 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <div className="flex items-center gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-800/80 rounded-2xl">
          <button
            type="button"
            onClick={() => {
              soundEffects.playClick();
              setSubTab('guide');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              subTab === 'guide'
                ? 'bg-amber-500 text-neutral-950 shadow-md font-black'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{t.rules.guideTab}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundEffects.playClick();
              setSubTab('dictionary');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              subTab === 'dictionary'
                ? 'bg-amber-500 text-neutral-950 shadow-md font-black'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>{t.rules.dictionaryTab}</span>
          </button>
        </div>

        <a
          href={OFFICIAL_PDF_LINKS[language] || OFFICIAL_PDF_LINKS.en}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-2xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/25 text-xs sm:text-sm font-bold transition-all shadow-sm"
        >
          <FileText className="w-4 h-4" />
          <span>{t.rules.openPdf} (PDF)</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-70" />
        </a>
      </div>

      {subTab === 'guide' ? (
        <RulesGuide language={language} />
      ) : (
        <div className="space-y-6">
          {/* Search Header */}
          <div className="p-6 rounded-3xl bg-neutral-900/90 border border-neutral-800 text-white shadow-xl space-y-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-amber-400" />
                <span>{t.rules.title}</span>
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Search cards, point values, events, and Pandora's Box rules.
              </p>
            </div>

        {/* Search Input */}
        <div className="relative flex items-center w-full">
          <div className="absolute left-3.5 text-neutral-400 pointer-events-none">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={t.rules.searchPlaceholder}
            className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-neutral-500 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 p-1 rounded-md text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          {[
            { id: 'all' as CategoryType, label: t.rules.allCategories },
            { id: 'specials' as CategoryType, label: t.rules.specials, icon: Sparkles },
            { id: 'events' as CategoryType, label: t.rules.events, icon: Flame },
            { id: 'power' as CategoryType, label: t.rules.powerCards, icon: Zap },
            { id: 'rules' as CategoryType, label: t.rules.ruleCards, icon: Layers },
          ].map(tab => {
            const isSelected = activeCategory === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  soundEffects.playClick();
                  setActiveCategory(tab.id);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border ${
                  isSelected
                    ? 'border-amber-500 bg-amber-500/20 text-amber-400 shadow-sm'
                    : 'border-neutral-800 bg-neutral-800/60 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {totalResults === 0 ? (
        <div className="p-8 text-center rounded-3xl bg-neutral-900 border border-neutral-800 text-neutral-500 space-y-2">
          <HelpCircle className="w-8 h-8 mx-auto text-neutral-600" />
          <p className="text-sm font-bold text-neutral-300">{t.rules.noResults}</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Special Cards Section */}
          {filteredCards.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{t.rules.specials}</span>
                <span className="text-xs font-mono text-neutral-600">({filteredCards.length})</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredCards.map(card => (
                  <div
                    key={card.id}
                    className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-bold text-white">
                        {card.name[language] || card.name.en}
                      </h4>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-500/15 border border-amber-500/30 text-amber-400">
                        {card.points} {t.rules.pts}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {card.description[language] || card.description.en}
                    </p>
                    {card.tip && (
                      <div className="text-[11px] text-amber-400/90 bg-amber-500/10 p-2 rounded-xl border border-amber-500/20">
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
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                <Flame className="w-4 h-4 text-rose-400" />
                <span>{t.rules.events}</span>
                <span className="text-xs font-mono text-neutral-600">({filteredEvents.length})</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredEvents.map(ev => (
                  <div
                    key={ev.id}
                    className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-bold text-white">
                        {ev.name[language] || ev.name.en}
                      </h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500/15 border border-rose-500/30 text-rose-400">
                        {ev.severity}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">
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
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>{t.rules.powerCards}</span>
                <span className="text-xs font-mono text-neutral-600">({filteredPowerCards.length})</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredPowerCards.map(pc => (
                  <div
                    key={pc.id}
                    className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-bold text-white">
                        {pc.name[language] || pc.name.en}
                      </h4>
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
                        0 {t.rules.pts}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">
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
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-400" />
                <span>{t.rules.ruleCards}</span>
                <span className="text-xs font-mono text-neutral-600">({filteredRuleCards.length})</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredRuleCards.map(rc => (
                  <div
                    key={rc.id}
                    className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-purple-500/30 transition-all space-y-2"
                  >
                    <h4 className="text-base font-bold text-white">
                      {rc.name[language] || rc.name.en}
                    </h4>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {rc.description[language] || rc.description.en}
                    </p>
                    {rc.flavor && (
                      <p className="text-[11px] text-purple-300/80 italic border-l-2 border-purple-500/40 pl-2">
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
