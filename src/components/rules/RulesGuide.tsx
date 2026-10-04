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
  Info
} from 'lucide-react';
import { Language } from '../../types/game';
import { OFFICIAL_PDF_LINKS, OVERVIEW_CARDS_PDF_LINKS } from '../../types/rules';
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

  const pdfUrl = docType === 'rulebook' 
    ? OFFICIAL_PDF_LINKS[selectedPdfLang]
    : OVERVIEW_CARDS_PDF_LINKS[selectedPdfLang];

  const currentTitle = docType === 'rulebook'
    ? t.rules.officialPdfTitle
    : t.rules.overviewPdfTitle;

  const currentDesc = docType === 'rulebook'
    ? t.rules.officialPdfDesc
    : t.rules.overviewPdfDesc;

  const languagesList: { id: Language; label: string; flag: string }[] = [
    { id: 'en', label: 'English', flag: '🇬🇧' },
    { id: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { id: 'fr', label: 'Français', flag: '🇫🇷' },
    { id: 'it', label: 'Italiano', flag: '🇮🇹' },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Official PDF Download / View Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-purple-950/60 border border-purple-500/30 text-white shadow-xl space-y-4">
        {/* Document Type Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-neutral-800/80 rounded-2xl w-fit border border-neutral-700/60">
          <button
            type="button"
            onClick={() => {
              soundEffects.playClick();
              setDocType('rulebook');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              docType === 'rulebook'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{t.rules.fullRulebook}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              soundEffects.playClick();
              setDocType('overview');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              docType === 'overview'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{t.rules.quickReference}</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                <FileText className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-black tracking-wide text-white">
                {currentTitle}
              </h3>
            </div>
            <p className="text-xs text-neutral-300 max-w-xl leading-relaxed">
              {currentDesc}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap shrink-0">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEffects.playClick()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-purple-500/25 transition-all transform active:scale-95"
            >
              <ExternalLink className="w-4 h-4 stroke-[2.5]" />
              <span>{t.rules.openPdf}</span>
            </a>

            <a
              href={pdfUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEffects.playClick()}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-neutral-800/90 hover:bg-neutral-700/90 border border-neutral-700 hover:border-neutral-600 text-neutral-200 hover:text-white font-bold text-xs sm:text-sm shadow-sm transition-all transform active:scale-95"
              title={t.rules.downloadPdf}
            >
              <Download className="w-4 h-4 text-purple-400" />
              <span className="hidden sm:inline">{t.rules.downloadPdf}</span>
            </a>
          </div>
        </div>

        {/* Language selector for PDF */}
        <div className="flex items-center gap-2 pt-2 border-t border-neutral-800/80 flex-wrap">
          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mr-1">
            {t.settings.language}:
          </span>
          {languagesList.map(item => {
            const isSelected = selectedPdfLang === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  soundEffects.playClick();
                  setSelectedPdfLang(item.id);
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all border ${
                  isSelected
                    ? 'border-purple-500 bg-purple-500/20 text-purple-300 shadow-sm'
                    : 'border-neutral-800 bg-neutral-800/60 text-neutral-400 hover:text-white hover:border-neutral-700'
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
      <section className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-3">
        <div className="flex items-center gap-2.5 text-amber-500">
          <Trophy className="w-5 h-5 stroke-[2.2]" />
          <h3 className="text-base sm:text-lg font-black text-neutral-900 dark:text-white uppercase tracking-wider">
            {language === 'it'
              ? 'Scopo del Gioco'
              : language === 'de'
              ? 'Ziel des Spiels'
              : language === 'fr'
              ? 'But du Jeu'
              : 'Goal of the Game'}
          </h3>
        </div>
        <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
          {language === 'it' ? (
            <>
              In Frantic – il subdolo gioco di carte – l'obiettivo di ogni round è <strong>sbarazzarsi il più rapidamente possibile di tutte le carte in mano</strong>. Non appena un giocatore cala la sua ultima carta, la manche termina e le carte rimaste in mano agli altri giocatori vengono calcolate come <strong>punti di penalità</strong> (i punti sono negativi!). Round dopo round i punti si sommano: appena qualcuno <strong>supera il punteggio limite stabilito</strong>, la partita finisce e <strong>vince chi ha il punteggio più basso</strong>!
            </>
          ) : language === 'de' ? (
            <>
              Bei Frantic versucht ihr in jeder Runde, <strong>möglichst schnell alle Handkarten loszuwerden</strong>. Sobald eine Person keine Karten mehr hat, endet die Runde und die verbliebenen Handkarten werden als <strong>Strafpunkte</strong> gewertet. Runde für Runde addiert ihr eure Punkte, bis jemand das <strong>Punktelimit überschreitet</strong>. Dann gewinnt die Person mit den <strong>wenigsten Punkten</strong>!
            </>
          ) : language === 'fr' ? (
            <>
              Dans Frantic, vous tentez de <strong>vous débarrasser le plus vite possible de vos cartes en main</strong>. Dès qu'un joueur n'a plus de cartes, la manche prend fin et les cartes restantes valent des points (ce qui est mauvais !). Manche après manche, les points s'accumulent jusqu'à ce qu'un joueur <strong>dépasse la limite de points</strong>. La partie prend fin et le joueur avec <strong>le plus petit score gagne</strong> !
            </>
          ) : (
            <>
              In Frantic – the mischievous card game – you try to <strong>get rid of your entire hand of cards as quickly as possible</strong>. As soon as one player is out of cards, the round ends and the cards left in everyone else’s hands count as <strong>penalty points</strong> (points are bad!). Round after round, you add up your points until someone <strong>exceeds the set point limit</strong>. The person with the <strong>fewest points wins</strong>!
            </>
          )}
        </p>
      </section>

      {/* Game Preparation & Limits */}
      <section className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 text-rose-500">
          <AlertTriangle className="w-5 h-5 stroke-[2.2]" />
          <h3 className="text-base sm:text-lg font-black text-neutral-900 dark:text-white uppercase tracking-wider">
            {language === 'it'
              ? 'Preparazione & Limiti Ufficiali'
              : language === 'de'
              ? 'Vorbereitung & Offizielle Limits'
              : language === 'fr'
              ? 'Préparation & Limites Officielles'
              : 'Preparation & Official Score Limits'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/80 space-y-2">
            <span className="font-bold text-neutral-900 dark:text-white uppercase tracking-wider text-[11px]">
              2–4 Players (Piccolo Gruppo)
            </span>
            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div className="p-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                <div className="font-extrabold text-amber-500 text-sm">137 pts</div>
                <div className="text-[10px] text-neutral-400 font-semibold">Short</div>
              </div>
              <div className="p-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                <div className="font-extrabold text-amber-500 text-sm">154 pts</div>
                <div className="text-[10px] text-neutral-400 font-semibold">Medium</div>
              </div>
              <div className="p-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                <div className="font-extrabold text-amber-500 text-sm">179 pts</div>
                <div className="text-[10px] text-neutral-400 font-semibold">Long</div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/80 space-y-2">
            <span className="font-bold text-neutral-900 dark:text-white uppercase tracking-wider text-[11px]">
              5–8 Players (Grande Gruppo)
            </span>
            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div className="p-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                <div className="font-extrabold text-amber-500 text-sm">113 pts</div>
                <div className="text-[10px] text-neutral-400 font-semibold">Short</div>
              </div>
              <div className="p-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                <div className="font-extrabold text-amber-500 text-sm">137 pts</div>
                <div className="text-[10px] text-neutral-400 font-semibold">Medium</div>
              </div>
              <div className="p-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                <div className="font-extrabold text-amber-500 text-sm">154 pts</div>
                <div className="text-[10px] text-neutral-400 font-semibold">Long</div>
              </div>
            </div>
          </div>
        </div>

        <ul className="text-xs text-neutral-600 dark:text-neutral-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>
            <strong>{language === 'it' ? 'Carte iniziali:' : 'Hand cards:'}</strong> {language === 'it' ? 'Distribuisci 7 carte a ciascun giocatore (mai meno di 4).' : 'Deal 7 cards to each player (never less than 4).'}
          </li>
          <li>
            <strong>{language === 'it' ? 'Mazziere:' : 'Dealer:'}</strong> {language === 'it' ? 'Al round 1 il proprietario del gioco. Nei round successivi, chi ha perso l’ultimo round (più punti).' : 'Owner in round 1; in subsequent rounds, the loser of the last round (highest score).'}
          </li>
          <li>
            <strong>{language === 'it' ? 'Inizio Scarti:' : 'Discard Pile:'}</strong> {language === 'it' ? 'Gira la prima carta del mazzo: considerala come giocata dal mazziere con tutti i suoi effetti!' : 'Turn over the top card of the draw pile and resolve its effect immediately as if played by the dealer!'}
          </li>
          <li>
            <strong>{language === 'it' ? 'Senso di Gioco:' : 'Direction:'}</strong> {language === 'it' ? 'Si gioca sempre in senso ANTIORARIO.' : 'Played strictly ANTICLOCKWISE (counter-clockwise).'}
          </li>
        </ul>
      </section>

      {/* Taking Turns & Ending Round */}
      <section className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-3">
        <div className="flex items-center gap-2.5 text-blue-500">
          <RotateCcw className="w-5 h-5 stroke-[2.2]" />
          <h3 className="text-base sm:text-lg font-black text-neutral-900 dark:text-white uppercase tracking-wider">
            {language === 'it'
              ? 'Svolgimento del Turno & Fine Round'
              : language === 'de'
              ? 'Spielzug & Rundenende'
              : language === 'fr'
              ? 'Tour de Jeu & Fin de Manche'
              : 'Taking Turns & Round End'}
          </h3>
        </div>

        <div className="space-y-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>
            {language === 'it'
              ? 'Durante il tuo turno puoi calare 1 carta che corrisponda per colore, numero o simbolo alla carta in cima agli scarti. Se non puoi o non vuoi giocare, pesca 1 carta dal mazzo. Dopo aver pescato, puoi comunque giocare subito una carta valida!'
              : 'During your turn, you can play one card that matches the top discard card by colour, number, or symbol. If you can’t or don’t want to play, draw a card from the draw pile. Even after drawing, you may still play a card!'}
          </p>
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-300 font-medium">
            <strong>{language === 'it' ? 'La manche termina quando:' : 'The round ends when:'}</strong>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>{language === 'it' ? 'Un giocatore ha esaurito tutte le sue carte in mano.' : 'One player has completely emptied their hand of cards.'}</li>
              <li>{language === 'it' ? 'Un giocatore deve pescare, ma il mazzo di pesca è esaurito.' : 'A player must draw a card, but the draw pile is completely exhausted.'}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Point Values Reference */}
      <section className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 text-purple-500">
          <Sparkles className="w-5 h-5 stroke-[2.2]" />
          <h3 className="text-base sm:text-lg font-black text-neutral-900 dark:text-white uppercase tracking-wider">
            {language === 'it'
              ? 'Valori Punti di Fine Round'
              : language === 'de'
              ? 'Punktewerte am Rundenende'
              : language === 'fr'
              ? 'Décompte des Points'
              : 'Round-End Point Values'}
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
          <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
            <span className="font-black text-base text-neutral-900 dark:text-white font-mono">1 – 10 pts</span>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
              {language === 'it' ? 'Carte numero (colorate & nere)' : 'Number cards (coloured & black)'}
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
            <span className="font-black text-base text-purple-600 dark:text-purple-400 font-mono">7 pts</span>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
              {language === 'it' ? 'Carte speciali standard & richiesta' : 'Standard special & open-wish cards'}
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
            <span className="font-black text-base text-indigo-500 font-mono">13 pts</span>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
              <strong>Curse</strong> ({language === 'it' ? 'Non giocabile' : 'Unplayable'})
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
            <span className="font-black text-base text-red-500 font-mono">17 pts</span>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
              <strong>The End</strong> ({language === 'it' ? 'Solo come ultima carta' : 'Last card only'})
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
            <span className="font-black text-base text-teal-500 font-mono">7 pts</span>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
              <strong>Mimicry</strong> ({language === 'it' ? 'Imita altre speciali' : 'Imitates specials'})
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/30">
            <span className="font-black text-base text-red-600 dark:text-red-400 font-mono">42 pts!</span>
            <p className="text-[11px] text-red-500/90 font-bold mt-0.5">
              <strong>Fuck You</strong> ({language === 'it' ? 'Solo con 10 carte' : 'Requires exactly 10 cards'})
            </p>
          </div>
        </div>

        <div className="text-[11px] text-neutral-500 dark:text-neutral-400 italic">
          * {language === 'it' ? 'Le carte Power (Supercharge) non fruttano alcun punto a fine manche (0 punti).' : 'Power cards (Supercharge) count as 0 points at round end.'}
        </div>
      </section>

      {/* Black Cards & Events */}
      <section className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 text-white shadow-xl space-y-3">
        <div className="flex items-center gap-2.5 text-amber-400">
          <Flame className="w-5 h-5 stroke-[2.2]" />
          <h3 className="text-base sm:text-lg font-black uppercase tracking-wider">
            {language === 'it' ? 'Carte Nere & Eventi' : 'Black Cards & Events'}
          </h3>
        </div>

        <div className="space-y-2.5 text-xs text-neutral-300 leading-relaxed">
          <p>
            {language === 'it' ? (
              <>
                Ogni volta che viene calata una <strong>carta numerata nera</strong>, si attiva immediatamente una <strong>carta Evento</strong>! Si scopre la prima carta dal mazzo eventi e se ne esegue l'effetto.
              </>
            ) : (
              <>
                Every time a <strong>black number card</strong> is played, an <strong>Event card is immediately triggered</strong>! Turn over the top event card and execute its effect right away.
              </>
            )}
          </p>
          <div className="p-3 rounded-2xl bg-neutral-800/80 border border-neutral-700/80 space-y-1.5">
            <div className="text-amber-400 font-bold flex items-center gap-1.5 text-xs">
              <Info className="w-4 h-4" />
              <span>{language === 'it' ? 'Regola d’oro sulle carte nere:' : 'Golden rule on black cards:'}</span>
            </div>
            <p className="text-neutral-300 text-xs">
              {language === 'it' ? (
                <>
                  Il <strong>nero non è un colore</strong>! Non può essere richiesto con un desiderio e non può essere coperto da un'altra carta nera. Una carta nera può essere coperta solo da una carta con lo <strong>stesso numero</strong> oppure da una <strong>carta speciale di richiesta</strong> (es. Fantastic)!
                </>
              ) : (
                <>
                  <strong>Black is not a colour</strong>! It cannot be wished for or followed by another black card. A black card can only be followed by the <strong>same number</strong> or an <strong>open-wish special card</strong> (e.g. Fantastic)!
                </>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Supercharge Power Cards Timing */}
      <section className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-3">
        <div className="flex items-center gap-2.5 text-cyan-500">
          <Zap className="w-5 h-5 stroke-[2.2]" />
          <h3 className="text-base sm:text-lg font-black text-neutral-900 dark:text-white uppercase tracking-wider">
            {language === 'it' ? 'Carte Power (Supercharge)' : 'Power Cards (Supercharge)'}
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
          {language === 'it' ? (
            <>
              Le carte Power non si tengono in mano e non si scartano: rimangono coperte sul tavolo davanti a te e si <strong>attivano scoprendole</strong> nel proprio turno mentre si gioca una carta. L'angolo in alto indica la sequenza:
            </>
          ) : (
            <>
              Power cards are kept face down on the table (not in your hand) and are activated by flipping them face up when playing a hand card on your turn:
            </>
          )}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
          <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 space-y-1">
            <span className="font-black text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-cyan-500 text-white font-mono text-[10px] flex items-center justify-center">1ST</span>
              <span>{language === 'it' ? 'Prima della carta' : 'Before hand card'}</span>
            </span>
            <p className="text-neutral-600 dark:text-neutral-300 text-[11px]">
              {language === 'it'
                ? 'L’effetto Power viene eseguito PRIMA dell’effetto della carta tenuta in mano (es. All Draw One, Special Charge, Special Seal).'
                : 'The power effect executes BEFORE the card played from hand (e.g. All Draw One, Special Charge, Special Seal).'}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 space-y-1">
            <span className="font-black text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-amber-500 text-white font-mono text-[10px] flex items-center justify-center">2ND</span>
              <span>{language === 'it' ? 'Dopo la carta' : 'After hand card'}</span>
            </span>
            <p className="text-neutral-600 dark:text-neutral-300 text-[11px]">
              {language === 'it'
                ? 'L’effetto Power viene eseguito DOPO l’effetto della carta tenuta in mano (es. Black Wish, Colour Blockade, Troublecharger).'
                : 'The power effect executes AFTER the card played from hand (e.g. Black Wish, Colour Blockade, Troublecharger).'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
