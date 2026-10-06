import React, { useState } from 'react';
import {
  FileText,
  ExternalLink,
  Download,
  Layers,
  Trophy,
  AlertTriangle,
  Sparkles,
  Flame,
  Zap,
  RotateCcw,
  Info,
} from 'lucide-react';
import { Language } from '../../types/game';
import {
  OFFICIAL_PDF_LINKS,
  OVERVIEW_CARDS_PDF_LINKS,
} from '../../types/rules';
import { TRANSLATIONS } from '../../data/translations';
import { soundEffects } from '../../utils/sound';

interface RulesGuideProps {
  language: Language;
}

type PdfDocType = 'rulebook' | 'overview';

export const RulesGuide: React.FC<RulesGuideProps> = ({ language }) => {
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
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Official PDF Download / View Banner */}
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
              className="flex transform items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-3.5 py-2.5 text-xs font-bold text-neutral-700 shadow-sm transition-all hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900 active:scale-95 dark:border-neutral-700 dark:bg-neutral-800/90 dark:text-neutral-200 dark:hover:border-neutral-600 dark:hover:bg-neutral-700/90 dark:hover:text-white sm:text-sm"
              title={t.rules.downloadPdf}
            >
              <Download className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <span className="hidden sm:inline">{t.rules.downloadPdf}</span>
            </a>
          </div>
        </div>

        {/* Language selector for PDF */}
        <div className="flex flex-wrap items-center gap-2 border-t border-neutral-200/80 pt-2 dark:border-neutral-800/80">
          <span className="mr-1 text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
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

      {/* Goal of the Game */}
      <section className="space-y-3 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex items-center gap-2.5 text-amber-500">
          <Trophy className="h-5 w-5 stroke-[2.2]" />
          <h3 className="text-base font-black uppercase tracking-wider text-neutral-900 dark:text-white sm:text-lg">
            {language === 'it'
              ? 'Scopo del Gioco'
              : language === 'de'
                ? 'Ziel des Spiels'
                : language === 'fr'
                  ? 'But du Jeu'
                  : 'Goal of the Game'}
          </h3>
        </div>
        <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          {language === 'it' ? (
            <>
              In Frantic – il subdolo gioco di carte – l'obiettivo di ogni round
              è{' '}
              <strong>
                sbarazzarsi il più rapidamente possibile di tutte le carte in
                mano
              </strong>
              . Non appena un giocatore cala la sua ultima carta, la manche
              termina e le carte rimaste in mano agli altri giocatori vengono
              calcolate come <strong>punti di penalità</strong> (i punti sono
              negativi!). Round dopo round i punti si sommano: appena qualcuno{' '}
              <strong>supera il punteggio limite stabilito</strong>, la partita
              finisce e <strong>vince chi ha il punteggio più basso</strong>!
            </>
          ) : language === 'de' ? (
            <>
              Bei Frantic versucht ihr in jeder Runde,{' '}
              <strong>möglichst schnell alle Handkarten loszuwerden</strong>.
              Sobald eine Person keine Karten mehr hat, endet die Runde und die
              verbliebenen Handkarten werden als <strong>Strafpunkte</strong>{' '}
              gewertet. Runde für Runde addiert ihr eure Punkte, bis jemand das{' '}
              <strong>Punktelimit überschreitet</strong>. Dann gewinnt die
              Person mit den <strong>wenigsten Punkten</strong>!
            </>
          ) : language === 'fr' ? (
            <>
              Dans Frantic, vous tentez de{' '}
              <strong>
                vous débarrasser le plus vite possible de vos cartes en main
              </strong>
              . Dès qu'un joueur n'a plus de cartes, la manche prend fin et les
              cartes restantes valent des points (ce qui est mauvais !). Manche
              après manche, les points s'accumulent jusqu'à ce qu'un joueur{' '}
              <strong>dépasse la limite de points</strong>. La partie prend fin
              et le joueur avec <strong>le plus petit score gagne</strong> !
            </>
          ) : (
            <>
              In Frantic – the mischievous card game – you try to{' '}
              <strong>
                get rid of your entire hand of cards as quickly as possible
              </strong>
              . As soon as one player is out of cards, the round ends and the
              cards left in everyone else’s hands count as{' '}
              <strong>penalty points</strong> (points are bad!). Round after
              round, you add up your points until someone{' '}
              <strong>exceeds the set point limit</strong>. The person with the{' '}
              <strong>fewest points wins</strong>!
            </>
          )}
        </p>
      </section>

      {/* Game Preparation & Limits */}
      <section className="space-y-4 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex items-center gap-2.5 text-rose-500">
          <AlertTriangle className="h-5 w-5 stroke-[2.2]" />
          <h3 className="text-base font-black uppercase tracking-wider text-neutral-900 dark:text-white sm:text-lg">
            {language === 'it'
              ? 'Preparazione & Limiti Ufficiali'
              : language === 'de'
                ? 'Vorbereitung & Offizielle Limits'
                : language === 'fr'
                  ? 'Préparation & Limites Officielles'
                  : 'Preparation & Official Score Limits'}
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-3 text-xs sm:grid-cols-2">
          <div className="space-y-2 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700/80 dark:bg-neutral-800/50">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
              {language === 'it'
                ? '2–4 Giocatori (Piccolo Gruppo)'
                : language === 'de'
                  ? '2–4 Spieler (Kleine Gruppe)'
                  : language === 'fr'
                    ? '2–4 Joueurs (Petit Groupe)'
                    : '2–4 Players (Small Group)'}
            </span>
            <div className="grid grid-cols-3 gap-2 pt-1 text-center">
              <div className="rounded-xl border border-neutral-200 bg-white p-2 dark:border-neutral-700 dark:bg-neutral-900">
                <div className="text-sm font-extrabold text-amber-500">
                  137 pts
                </div>
                <div className="text-[10px] font-semibold text-neutral-400">
                  {t.setup.shortGame}
                </div>
              </div>
              <div className="rounded-xl border border-neutral-200 bg-white p-2 dark:border-neutral-700 dark:bg-neutral-900">
                <div className="text-sm font-extrabold text-amber-500">
                  154 pts
                </div>
                <div className="text-[10px] font-semibold text-neutral-400">
                  {t.setup.mediumGame}
                </div>
              </div>
              <div className="rounded-xl border border-neutral-200 bg-white p-2 dark:border-neutral-700 dark:bg-neutral-900">
                <div className="text-sm font-extrabold text-amber-500">
                  179 pts
                </div>
                <div className="text-[10px] font-semibold text-neutral-400">
                  {t.setup.longGame}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700/80 dark:bg-neutral-800/50">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
              {language === 'it'
                ? '5–8 Giocatori (Grande Gruppo)'
                : language === 'de'
                  ? '5–8 Spieler (Grosse Gruppe)'
                  : language === 'fr'
                    ? '5–8 Joueurs (Grand Groupe)'
                    : '5–8 Players (Large Group)'}
            </span>
            <div className="grid grid-cols-3 gap-2 pt-1 text-center">
              <div className="rounded-xl border border-neutral-200 bg-white p-2 dark:border-neutral-700 dark:bg-neutral-900">
                <div className="text-sm font-extrabold text-amber-500">
                  113 pts
                </div>
                <div className="text-[10px] font-semibold text-neutral-400">
                  {t.setup.shortGame}
                </div>
              </div>
              <div className="rounded-xl border border-neutral-200 bg-white p-2 dark:border-neutral-700 dark:bg-neutral-900">
                <div className="text-sm font-extrabold text-amber-500">
                  137 pts
                </div>
                <div className="text-[10px] font-semibold text-neutral-400">
                  {t.setup.mediumGame}
                </div>
              </div>
              <div className="rounded-xl border border-neutral-200 bg-white p-2 dark:border-neutral-700 dark:bg-neutral-900">
                <div className="text-sm font-extrabold text-amber-500">
                  154 pts
                </div>
                <div className="text-[10px] font-semibold text-neutral-400">
                  {t.setup.longGame}
                </div>
              </div>
            </div>
          </div>
        </div>

        <ul className="list-inside list-disc space-y-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
          <li>
            <strong>
              {language === 'it'
                ? 'Carte iniziali:'
                : language === 'de'
                  ? 'Handkarten:'
                  : language === 'fr'
                    ? 'Cartes en main :'
                    : 'Hand cards:'}
            </strong>{' '}
            {language === 'it'
              ? 'Distribuisci 7 carte a ciascun giocatore (mai meno di 4).'
              : language === 'de'
                ? 'Teile 7 Handkarten an alle aus (nie weniger als 4).'
                : language === 'fr'
                  ? 'Distribuez 7 cartes à chaque joueur (jamais moins de 4).'
                  : 'Deal 7 cards to each player (never less than 4).'}
          </li>
          <li>
            <strong>
              {language === 'it'
                ? 'Mazziere:'
                : language === 'de'
                  ? 'Geber:'
                  : language === 'fr'
                    ? 'Donneur :'
                    : 'Dealer:'}
            </strong>{' '}
            {language === 'it'
              ? 'Al round 1 il proprietario del gioco. Nei round successivi, chi ha perso l’ultimo round (più punti).'
              : language === 'de'
                ? 'In Runde 1 der Besitzer des Spiels. In Folgerunden die Person, welche die letzte Runde verloren hat (meiste Punkte).'
                : language === 'fr'
                  ? 'Manche 1 : le propriétaire du jeu. Manches suivantes : le perdant de la manche précédente (le plus de points).'
                  : 'Round 1: game owner. In subsequent rounds, the person who lost the last round (highest score).'}
          </li>
          <li>
            <strong>
              {language === 'it'
                ? 'Inizio Scarti:'
                : language === 'de'
                  ? 'Ablagestapel:'
                  : language === 'fr'
                    ? 'Défausse :'
                    : 'Discard Pile:'}
            </strong>{' '}
            {language === 'it'
              ? 'Gira la prima carta del mazzo: considerala come giocata dal mazziere con tutti i suoi effetti!'
              : language === 'de'
                ? 'Decke die oberste Karte des Nachziehstapels auf: behandle sie, als hätte der Geber sie gespielt!'
                : language === 'fr'
                  ? 'Retournez la première carte de la pioche : traitez-la comme si le donneur l’avait jouée avec tous ses effets !'
                  : 'Turn over the top card of the draw pile and treat it as if the dealer had played it with all effects!'}
          </li>
          <li>
            <strong>
              {language === 'it'
                ? 'Senso di Gioco:'
                : language === 'de'
                  ? 'Spielrichtung:'
                  : language === 'fr'
                    ? 'Sens du jeu :'
                    : 'Direction:'}
            </strong>{' '}
            {language === 'it'
              ? 'Si gioca sempre in senso ANTIORARIO.'
              : language === 'de'
                ? 'Das Spiel verläuft im GEGENUHRZEIGERSINN.'
                : language === 'fr'
                  ? 'Le jeu se déroule dans le SENS ANTIHORAIRE.'
                  : 'Played strictly ANTICLOCKWISE.'}
          </li>
        </ul>
      </section>

      {/* Taking Turns & Ending Round */}
      <section className="space-y-3 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex items-center gap-2.5 text-blue-500">
          <RotateCcw className="h-5 w-5 stroke-[2.2]" />
          <h3 className="text-base font-black uppercase tracking-wider text-neutral-900 dark:text-white sm:text-lg">
            {language === 'it'
              ? 'Svolgimento del Turno & Fine Round'
              : language === 'de'
                ? 'Spielzug & Rundenende'
                : language === 'fr'
                  ? 'Tour de Jeu & Fin de Manche'
                  : 'Taking Turns & Round End'}
          </h3>
        </div>

        <div className="space-y-2 text-xs leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-sm">
          <p>
            {language === 'it'
              ? 'Durante il tuo turno puoi calare 1 carta che corrisponda per colore, numero o simbolo alla carta in cima agli scarti. Se non puoi o non vuoi giocare, pesca 1 carta dal mazzo. Dopo aver pescato, puoi comunque giocare subito una carta valida!'
              : language === 'de'
                ? 'Während deinem Zug darfst du eine Handkarte spielen, die nach Farbe, Zahl oder Symbol zur obersten Karte des Ablagestapels passt. Sofern du keine Karte ausspielen kannst oder willst, ziehst du eine Karte. Du darfst nach dem Ziehen trotzdem eine Karte spielen!'
                : language === 'fr'
                  ? 'Pendant votre tour, vous pouvez jouer une carte correspondant à la couleur, au chiffre ou au symbole de la défausse. Si vous ne pouvez ou ne voulez pas jouer, piochez une carte. Même après avoir pioché, vous pouvez jouer une carte !'
                  : 'During your turn, you can play one card that matches the top discard card by colour, number, or symbol. If you can’t or don’t want to play, draw a card from the draw pile. Even after drawing, you may still play a card!'}
          </p>
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-3.5 text-xs font-medium text-amber-700 dark:text-amber-300">
            <strong>
              {language === 'it'
                ? 'La manche termina quando:'
                : language === 'de'
                  ? 'Die Runde endet wenn:'
                  : language === 'fr'
                    ? 'La manche prend fin lorsque :'
                    : 'The round ends when:'}
            </strong>
            <ul className="mt-1 list-inside list-disc space-y-1">
              <li>
                {language === 'it'
                  ? 'Un giocatore ha esaurito tutte le sue carte in mano.'
                  : language === 'de'
                    ? 'Eine Person keine Handkarten mehr hat.'
                    : language === 'fr'
                      ? 'Un joueur n’a plus de cartes en main.'
                      : 'One player has completely emptied their hand of cards.'}
              </li>
              <li>
                {language === 'it'
                  ? 'Un giocatore deve pescare, ma il mazzo di pesca è esaurito.'
                  : language === 'de'
                    ? 'Eine Person eine Karte ziehen muss, aber der Nachziehstapel aufgebraucht ist.'
                    : language === 'fr'
                      ? 'Un joueur doit piocher, mais la pioche est épuisée.'
                      : 'A player must draw a card, but the draw pile is completely exhausted.'}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Point Values Reference */}
      <section className="space-y-4 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex items-center gap-2.5 text-purple-500">
          <Sparkles className="h-5 w-5 stroke-[2.2]" />
          <h3 className="text-base font-black uppercase tracking-wider text-neutral-900 dark:text-white sm:text-lg">
            {language === 'it'
              ? 'Valori Punti di Fine Round'
              : language === 'de'
                ? 'Punktewerte am Rundenende'
                : language === 'fr'
                  ? 'Décompte des Points'
                  : 'Round-End Point Values'}
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-2.5 text-xs sm:grid-cols-3">
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-700 dark:bg-neutral-800/50">
            <span className="font-mono text-base font-black text-neutral-900 dark:text-white">
              1 – 10 pts
            </span>
            <p className="mt-0.5 text-[11px] text-neutral-500 dark:text-neutral-400">
              {language === 'it'
                ? 'Carte numero (colorate & nere)'
                : language === 'de'
                  ? 'Zahlenkarten (farbig & schwarz)'
                  : language === 'fr'
                    ? 'Cartes numéro (couleur & noires)'
                    : 'Number cards (coloured & black)'}
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-700 dark:bg-neutral-800/50">
            <span className="font-mono text-base font-black text-purple-600 dark:text-purple-400">
              7 pts
            </span>
            <p className="mt-0.5 text-[11px] text-neutral-500 dark:text-neutral-400">
              {language === 'it'
                ? 'Carte speciali standard & richiesta'
                : language === 'de'
                  ? 'Spezial- & Wunschkarten'
                  : language === 'fr'
                    ? 'Cartes spéciales & de souhait'
                    : 'Standard special & open-wish cards'}
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-700 dark:bg-neutral-800/50">
            <span className="font-mono text-base font-black text-indigo-500">
              13 pts
            </span>
            <p className="mt-0.5 text-[11px] text-neutral-500 dark:text-neutral-400">
              <strong>Curse</strong> (
              {language === 'it'
                ? 'Non giocabile'
                : language === 'de'
                  ? 'Nicht spielbar'
                  : language === 'fr'
                    ? 'Injouable'
                    : 'Unplayable'}
              )
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-700 dark:bg-neutral-800/50">
            <span className="font-mono text-base font-black text-red-500">
              17 pts
            </span>
            <p className="mt-0.5 text-[11px] text-neutral-500 dark:text-neutral-400">
              <strong>The End</strong> (
              {language === 'it'
                ? 'Solo come ultima carta'
                : language === 'de'
                  ? 'Nur als letzte Karte'
                  : language === 'fr'
                    ? 'Dernière carte uniquement'
                    : 'Last card only'}
              )
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-700 dark:bg-neutral-800/50">
            <span className="font-mono text-base font-black text-teal-500">
              7 pts
            </span>
            <p className="mt-0.5 text-[11px] text-neutral-500 dark:text-neutral-400">
              <strong>Mimicry</strong> (
              {language === 'it'
                ? 'Imita altre speciali'
                : language === 'de'
                  ? 'Imitiert Spezialkarten'
                  : language === 'fr'
                    ? 'Imite les spéciales'
                    : 'Imitates specials'}
              )
            </p>
          </div>

          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-3">
            <span className="font-mono text-base font-black text-red-600 dark:text-red-400">
              42 pts!
            </span>
            <p className="mt-0.5 text-[11px] font-bold text-red-500/90">
              <strong>Fuck You</strong> (
              {language === 'it'
                ? 'Solo con 10 carte'
                : language === 'de'
                  ? 'Nur bei exakt 10 Karten'
                  : language === 'fr'
                    ? 'Exactement 10 cartes'
                    : 'Requires exactly 10 cards'}
              )
            </p>
          </div>
        </div>

        <div className="text-[11px] italic text-neutral-500 dark:text-neutral-400">
          *{' '}
          {language === 'it'
            ? 'Le carte Power (Supercharge) non fruttano alcun punto a fine manche (0 punti).'
            : language === 'de'
              ? 'Powerkarten (Supercharge) zählen am Rundenende keine Punkte (0 Punkte).'
              : language === 'fr'
                ? 'Les cartes pouvoir (Supercharge) ne valent aucun point en fin de manche (0 pt).'
                : 'Power cards (Supercharge) count as 0 points at round end.'}
        </div>
      </section>

      {/* Black Cards & Events */}
      <section className="space-y-3 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex items-center gap-2.5 text-amber-500 dark:text-amber-400">
          <Flame className="h-5 w-5 stroke-[2.2]" />
          <h3 className="text-base font-black uppercase tracking-wider text-neutral-900 dark:text-white sm:text-lg">
            {language === 'it'
              ? 'Carte Nere & Eventi'
              : language === 'de'
                ? 'Schwarze Karten & Ereignisse'
                : language === 'fr'
                  ? 'Cartes Noires & Événements'
                  : 'Black Cards & Events'}
          </h3>
        </div>

        <div className="space-y-2.5 text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
          <p>
            {language === 'it' ? (
              <>
                Ogni volta che viene calata una{' '}
                <strong>carta numerata nera</strong>, si attiva immediatamente
                una <strong>carta Evento</strong>! Si scopre la prima carta dal
                mazzo eventi e se ne esegue l'effetto.
              </>
            ) : language === 'de' ? (
              <>
                Jedes Mal, wenn eine <strong>schwarze Zahlenkarte</strong>{' '}
                gespielt wird, wird sofort eine{' '}
                <strong>Ereigniskarte aktiviert</strong>! Decke die oberste
                Ereigniskarte auf und führe ihren Effekt aus.
              </>
            ) : language === 'fr' ? (
              <>
                Chaque fois qu’une <strong>carte chiffre noire</strong> est
                posée, un <strong>événement est immédiatement activé</strong> !
                Retournez la première carte événement et appliquez son effet.
              </>
            ) : (
              <>
                Every time a <strong>black number card</strong> is played, an{' '}
                <strong>Event card is immediately triggered</strong>! Turn over
                the top event card and execute its effect right away.
              </>
            )}
          </p>
          <div className="space-y-1.5 rounded-2xl border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-700/80 dark:bg-neutral-800/80">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
              <Info className="h-4 w-4" />
              <span>
                {language === 'it'
                  ? 'Regola d’oro sulle carte nere:'
                  : language === 'de'
                    ? 'Goldene Regel für schwarze Karten:'
                    : language === 'fr'
                      ? 'Règle d’or des cartes noires :'
                      : 'Golden rule on black cards:'}
              </span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-300">
              {language === 'it' ? (
                <>
                  Il <strong>nero non è un colore</strong>! Non può essere
                  richiesto con un desiderio e non può essere coperto da
                  un'altra carta nera. Una carta nera può essere coperta solo da
                  una carta con lo <strong>stesso numero</strong> oppure da una{' '}
                  <strong>carta speciale di richiesta</strong> (es. Fantastic)!
                </>
              ) : language === 'de' ? (
                <>
                  <strong>Schwarz ist keine Farbe</strong>! Es kann weder
                  gewünscht noch von einer anderen schwarzen Karte bedient
                  werden. Eine schwarze Karte kann nur durch{' '}
                  <strong>dieselbe Zahl</strong> oder eine{' '}
                  <strong>Wunschkarte</strong> (z. B. Fantastic) bedient werden!
                </>
              ) : language === 'fr' ? (
                <>
                  Le <strong>noir n’est pas une couleur</strong> ! Il ne peut
                  être ni souhaité ni recouvert par une autre carte noire. Une
                  carte noire ne peut être recouverte que par le{' '}
                  <strong>même chiffre</strong> ou par une{' '}
                  <strong>carte spéciale de souhait</strong> (ex. Fantastic) !
                </>
              ) : (
                <>
                  <strong>Black is not a colour</strong>! It cannot be wished
                  for or followed by another black card. A black card can only
                  be followed by the <strong>same number</strong> or an{' '}
                  <strong>open-wish special card</strong> (e.g. Fantastic)!
                </>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Supercharge Power Cards Timing */}
      <section className="space-y-3 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex items-center gap-2.5 text-cyan-500">
          <Zap className="h-5 w-5 stroke-[2.2]" />
          <h3 className="text-base font-black uppercase tracking-wider text-neutral-900 dark:text-white sm:text-lg">
            {language === 'it'
              ? 'Carte Power (Supercharge)'
              : language === 'de'
                ? 'Powerkarten (Supercharge)'
                : language === 'fr'
                  ? 'Cartes Pouvoir (Supercharge)'
                  : 'Power Cards (Supercharge)'}
          </h3>
        </div>

        <p className="text-xs leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-sm">
          {language === 'it' ? (
            <>
              Le carte Power non si tengono in mano e non si scartano: rimangono
              coperte sul tavolo davanti a te e si{' '}
              <strong>attivano scoprendole</strong> nel proprio turno mentre si
              gioca una carta. L'angolo in alto indica la sequenza:
            </>
          ) : language === 'de' ? (
            <>
              Powerkarten werden nicht auf der Hand gehalten: Sie liegen
              verdeckt auf dem Tisch und werden im eigenen Zug beim Ausspielen
              einer Handkarte <strong>aufgedeckt und aktiviert</strong>:
            </>
          ) : language === 'fr' ? (
            <>
              Les cartes pouvoir ne sont pas gardées en main : elles restent
              face cachée sur la table et sont{' '}
              <strong>activées en les retournant</strong> lors de votre tour en
              jouant une carte :
            </>
          ) : (
            <>
              Power cards are kept face down on the table (not in your hand) and
              are activated by flipping them face up when playing a hand card on
              your turn:
            </>
          )}
        </p>

        <div className="grid grid-cols-1 gap-3 pt-1 text-xs sm:grid-cols-2">
          <div className="space-y-1 rounded-2xl border border-cyan-500/25 bg-cyan-500/10 p-3.5">
            <span className="flex items-center gap-1.5 font-black text-cyan-600 dark:text-cyan-400">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-cyan-500 font-mono text-[10px] text-white">
                1ST
              </span>
              <span>
                {language === 'it'
                  ? 'Prima della carta'
                  : language === 'de'
                    ? 'Vor der Handkarte'
                    : language === 'fr'
                      ? 'Avant la carte'
                      : 'Before hand card'}
              </span>
            </span>
            <p className="text-[11px] text-neutral-600 dark:text-neutral-300">
              {language === 'it'
                ? 'L’effetto Power viene eseguito PRIMA dell’effetto della carta tenuta in mano (es. All Draw One, Special Charge, Special Seal).'
                : language === 'de'
                  ? 'Der Power-Effekt wird VOR dem Effekt der Handkarte ausgeführt (z. B. Alle Ziehen Eine, Spezialladung, Spezialsiegel).'
                  : language === 'fr'
                    ? 'L’effet pouvoir est appliqué AVANT la carte en main (ex. Tous Piochent Une, Charge Spéciale, Sceau Spécial).'
                    : 'The power effect executes BEFORE the card played from hand (e.g. All Draw One, Special Charge, Special Seal).'}
            </p>
          </div>

          <div className="space-y-1 rounded-2xl border border-amber-500/25 bg-amber-500/10 p-3.5">
            <span className="flex items-center gap-1.5 font-black text-amber-600 dark:text-amber-400">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-amber-500 font-mono text-[10px] text-white">
                2ND
              </span>
              <span>
                {language === 'it'
                  ? 'Dopo la carta'
                  : language === 'de'
                    ? 'Nach der Handkarte'
                    : language === 'fr'
                      ? 'Après la carte'
                      : 'After hand card'}
              </span>
            </span>
            <p className="text-[11px] text-neutral-600 dark:text-neutral-300">
              {language === 'it'
                ? 'L’effetto Power viene eseguito DOPO l’effetto della carta tenuta in mano (es. Black Wish, Colour Blockade, Troublecharger).'
                : language === 'de'
                  ? 'Der Power-Effekt wird NACH dem Effekt der Handkarte ausgeführt (z. B. Schwarzer Wunsch, Farblockade, Troublecharger).'
                  : language === 'fr'
                    ? 'L’effet pouvoir est appliqué APRÈS la carte en main (ex. Souhait Noir, Blocus de Couleur, Troublecharger).'
                    : 'The power effect executes AFTER the card played from hand (e.g. Black Wish, Colour Blockade, Troublecharger).'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
