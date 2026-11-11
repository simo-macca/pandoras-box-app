import { Language } from '@/types/game';

// Respect Vite's `base` so the links work both at the domain root (Netlify)
// and under a sub-path (e.g. GitHub Pages: /pandoras-box-app/).
const RULES_BASE = `${import.meta.env.BASE_URL}rules/`;

export const OFFICIAL_PDF_LINKS: Record<Language, string> = {
  en: `${RULES_BASE}Pandoras_Box_Gesamtregelwerk_EN_web.pdf`,
  de: `${RULES_BASE}Pandoras_Box_Gesamtregelwerk_DE_web.pdf`,
  fr: `${RULES_BASE}Pandoras_Box_Gesamtregelwerk_FR.pdf`,
  it: `${RULES_BASE}Pandoras_Box_Gesamtregelwerk_IT_web.pdf`,
};

export const OVERVIEW_CARDS_PDF_LINKS: Record<Language, string> = {
  en: `${RULES_BASE}Uebersichtskarten_EN_web.pdf`,
  de: `${RULES_BASE}Uebersichtskarten_DE_web.pdf`,
  fr: `${RULES_BASE}Uebersichtskarten_FR_web.pdf`,
  it: `${RULES_BASE}Uebersichtskarten_IT_web.pdf`,
};
