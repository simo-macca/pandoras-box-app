import React, { useState } from 'react';
import { FileText, Layers, ExternalLink, Download } from 'lucide-react';
import { Language } from '@/types/game';
import {
  OFFICIAL_PDF_LINKS,
  OVERVIEW_CARDS_PDF_LINKS,
} from '@/data/rulebookLinks';
import { TRANSLATIONS } from '@/data/translations';
import { soundEffects } from '@/utils/sound';

interface OfficialPdfBannerProps {
  language: Language;
}

type PdfDocType = 'rulebook' | 'overview';

export const OfficialPdfBanner: React.FC<OfficialPdfBannerProps> = ({
  language,
}) => {
  const t = TRANSLATIONS[language];
  const [selectedPdfLang, setSelectedPdfLang] = useState<Language>(language);
  const [docType, setDocType] = useState<PdfDocType>('rulebook');

  const pdfUrl =
    docType === 'rulebook'
      ? OFFICIAL_PDF_LINKS[selectedPdfLang]
      : OVERVIEW_CARDS_PDF_LINKS[selectedPdfLang];

  const currentTitle =
    docType === 'rulebook'
      ? t.rules.officialPdfTitle
      : t.rules.overviewPdfTitle;

  const currentDesc =
    docType === 'rulebook' ? t.rules.officialPdfDesc : t.rules.overviewPdfDesc;

  const languagesList: { id: Language; label: string }[] = [
    { id: 'en', label: 'English' },
    { id: 'de', label: 'Deutsch' },
    { id: 'fr', label: 'Français' },
    { id: 'it', label: 'Italiano' },
  ];

  const docTypes = [
    {
      id: 'rulebook' as PdfDocType,
      label: t.rules.fullRulebook,
      icon: FileText,
    },
    {
      id: 'overview' as PdfDocType,
      label: t.rules.quickReference,
      icon: Layers,
    },
  ];

  return (
    <section className="card space-y-5 p-5 sm:p-6">
      <div className="segmented">
        {docTypes.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            aria-pressed={docType === id}
            onClick={() => {
              soundEffects.playClick();
              setDocType(id);
            }}
            className={`segmented-item ${
              docType === id ? 'segmented-item-active' : ''
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex min-w-0 items-start gap-3">
          <div className="icon-tile bg-purple-500/15 text-purple-600 dark:text-purple-300">
            <FileText className="h-5 w-5" />
          </div>
          <div className="min-w-0 space-y-1">
            <h3 className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
              {currentTitle}
            </h3>
            <p className="max-w-xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
              {currentDesc}
            </p>
          </div>
        </div>

        <div className="flex w-full shrink-0 items-center gap-2 sm:w-auto">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundEffects.playClick()}
            className="btn btn-magic flex-1 sm:flex-none"
          >
            <ExternalLink className="h-4 w-4" />
            <span>{t.rules.openPdf}</span>
          </a>
          <a
            href={pdfUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundEffects.playClick()}
            className="btn btn-secondary"
            title={t.rules.downloadPdf}
            aria-label={t.rules.downloadPdf}
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">{t.rules.downloadPdf}</span>
          </a>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-neutral-200/80 pt-4 dark:border-white/[0.06]">
        <span className="eyebrow mr-1">{t.settings.language}</span>
        {languagesList.map((item) => {
          const isSelected = selectedPdfLang === item.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => {
                soundEffects.playClick();
                setSelectedPdfLang(item.id);
              }}
              className={`option inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-semibold ${
                isSelected ? 'option-active' : ''
              }`}
            >
              <span className="font-bold uppercase">{item.id}</span>
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
