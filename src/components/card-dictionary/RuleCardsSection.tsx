import React from 'react';
import { Layers } from 'lucide-react';
import { RuleCardItem } from '@/types/rules';
import { Language } from '@/types/game';
import { TRANSLATIONS } from '@/data/translations';
import { DictionarySectionHeader } from './DictionarySectionHeader';
import { ExpandableText } from '@/components/common/ExpandableText';

interface RuleCardsSectionProps {
  ruleCards: RuleCardItem[];
  language: Language;
}

export const RuleCardsSection: React.FC<RuleCardsSectionProps> = ({
  ruleCards,
  language,
}) => {
  const t = TRANSLATIONS[language];
  if (ruleCards.length === 0) return null;

  return (
    <section className="space-y-4">
      <DictionarySectionHeader
        icon={<Layers className="h-4 w-4" />}
        iconClassName="bg-purple-500/15 text-purple-600 dark:text-purple-300"
        title={t.rules.ruleCards}
        count={ruleCards.length}
      />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {ruleCards.map((rc) => (
          <div
            key={rc.id}
            className="card card-interactive flex flex-col p-4 sm:p-5"
          >
            <h4 className="text-base font-semibold text-neutral-900 dark:text-white">
              {rc.name[language] || rc.name.en}
            </h4>
            <ExpandableText
              className="mt-2"
              text={rc.description[language] || rc.description.en}
              language={language}
            />
            {rc.flavor && (
              <div className="mt-auto pt-3">
                <p className="border-l-2 border-purple-500/40 pl-3 text-xs text-neutral-500 italic dark:text-neutral-400">
                  &ldquo;{rc.flavor[language] || rc.flavor.en}&rdquo;
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
