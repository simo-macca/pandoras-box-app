import React, { useState } from 'react';
import { FileText, Layers, ExternalLink, Download } from 'lucide-react';
import { Language } from '../../types/game';
import {
  OFFICIAL_PDF_LINKS,
  OVERVIEW_CARDS_PDF_LINKS,
} from '../../types/rules';
import { TRANSLATIONS } from '../../data/translations';
import { soundEffects } from '../../utils/sound';

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

  const languagesList: { id: Language; label: string; flag: string }[] = [
    { id: 'en', label: 'English', flag: '🇬🇧' },
    { id: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { id: 'fr', label: 'Français', flag: '🇫🇷' },
    { id: 'it', label: 'Italiano', flag: '🇮🇹' },
  ];

  return (
    <div className="space-y-4 rounded-3xl border border-purple-200 bg-gradient-to-br from-white via-purple-50/50 to-indigo-50/60 p-6 text-neutral-900 shadow-sm dark:border-purple-500/30 dark:bg-gradient-to-br dark:from-neutral-900 dark:via-neutral-900 dark:to-purple-950/60 dark:text-white dark:shadow-xl">
      {/* Document Type Switcher */}
      <div className="flex w-fit items-center gap-1.5 rounded-2xl border border-neutral-200 bg-neutral-100/90 p-1 dark:border-neutral-700/60 dark:bg-neutral-800/80">
        <button
          type="button"
          onClick={() => {
            soundEffects.playClick();
            setDocType('rulebook');
          }}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
            docType === 'rulebook'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
          }`}
        >
          <FileText className="h-3.5 w-3.5" />
          <span>{t.rules.fullRulebook}</span>
        </button>
        <button
          type="button"
          onClick={() => {
            soundEffects.playClick();
            setDocType('overview');
          }}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
            docType === 'overview'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
          }`}
        >
          <Layers className="h-3.5 w-3.5" />
          <span>{t.rules.quickReference}</span>
        </button>
      </div>

      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/15 text-purple-600 dark:border-purple-500/40 dark:bg-purple-500/20 dark:text-purple-400">
              <FileText className="h-4 w-4" />
            </div>
            <h3 className="text-lg font-black tracking-wide text-neutral-900 dark:text-white">
              {currentTitle}
            </h3>
          </div>
          <p className="max-w-xl text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
            {currentDesc}
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundEffects.playClick()}
            className="flex transform items-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2.5 text-xs font-black text-white shadow-lg shadow-purple-500/25 transition-all hover:from-purple-500 hover:to-indigo-500 active:scale-95 sm:text-sm"
          >
            <ExternalLink className="h-4 w-4 stroke-[2.5]" />
            <span>{t.rules.openPdf}</span>
          </a>

          <a
            href={pdfUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundEffects.playClick()}
            className="flex transform items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-3.5 py-2.5 text-xs font-bold text-neutral-700 shadow-sm transition-all hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900 active:scale-95 sm:text-sm dark:border-neutral-700 dark:bg-neutral-800/90 dark:text-neutral-200 dark:hover:border-neutral-600 dark:hover:bg-neutral-700/90 dark:hover:text-white"
            title={t.rules.downloadPdf}
          >
            <Download className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            <span className="hidden sm:inline">{t.rules.downloadPdf}</span>
          </a>
        </div>
      </div>

      {/* Language selector for PDF */}
      <div className="flex flex-wrap items-center gap-2 border-t border-neutral-200/80 pt-2 dark:border-neutral-800/80">
        <span className="mr-1 text-[11px] font-bold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
          {t.settings.language}:
        </span>
        {languagesList.map((item) => {
          const isSelected = selectedPdfLang === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                soundEffects.playClick();
                setSelectedPdfLang(item.id);
              }}
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-1 text-xs font-bold transition-all ${
                isSelected
                  ? 'border-purple-500 bg-purple-500/15 text-purple-700 shadow-sm dark:border-purple-500 dark:bg-purple-500/20 dark:text-purple-300'
                  : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-800/60 dark:text-neutral-400 dark:hover:border-neutral-700 dark:hover:text-white'
              }`}
            >
              <span>{item.flag}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
