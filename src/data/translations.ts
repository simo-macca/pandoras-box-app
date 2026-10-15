import { Language } from '../types/game';

export interface TranslationStrings {
  appTitle: string;
  appSubtitle: string;
  nav: {
    scoreboard: string;
    scoreRound: string;
    newGame: string;
    ruleCards: string;
    directory: string;
  };
  tabs: {
    scoreboard: string;
    logRound: string;
    rulecards: string;
    rules: string;
    dice?: string;
  };
  setup: {
    title: string;
    description: string;
    playerCount: string;
    addPlayer: string;
    playerName: string;
    color: string;
    targetScore: string;
    shortGame: string;
    mediumGame: string;
    longGame: string;
    customGame: string;
    recommended: string;
    points: string;
    pts: string;
    customPlaceholder: string;
    minScoreError: string;
    targetScoreDesc: string;
    startMatch: string;
    resetMatch: string;
    newGame: string;
    newMatch?: string;
    setupUpdatedSuccess: string;
    confirmResetTitle: string;
    confirmResetMessage: string;
    cancel: string;
    confirm: string;
  };
  scoreboard: {
    title: string;
    round: string;
    currentLeader: string;
    leading: string;
    dangerZone: string;
    targetLimit: string;
    eliminationLimit: string;
    limitHelpTitle: string;
    limitHelpDesc: string;
    dangerHelpTitle: string;
    dangerHelpDesc: string;
    historyTitle: string;
    undoLastRound: string;
    undoRound: string;
    noRoundsYet: string;
    startFirstRound: string;
    startScoringFirstRound: string;
    editRound: string;
    deleteRound: string;
    spacePoints: string;
    penalty: string;
    total: string;
    pts: string;
    activeRuleCard: string;
    noActiveRuleCard: string;
    drawRuleCard: string;
    endReason?: {
      destination: string;
      deck_empty: string;
      manual: string;
    };
  };
  scoring: {
    modalTitle: string;
    editModalTitle: string;
    roundNumber: string;
    roundWinner: string;
    isWinner: string;
    isWinnerHint: string;
    numberCardsTitle: string;
    numberCardsHint: string;
    specialCardsTitle: string;
    standardSpecials: string;
    curseCard: string;
    theEndCard: string;
    fuckYouCard: string;
    mimicryCard: string;
    eventsAndModifiers: string;
    doomsdayToggle: string;
    doomsdayHint: string;
    tableEventsTitle?: string;
    tableEventsHint?: string;
    timeBombTableNone?: string;
    timeBombTableDefused?: string;
    timeBombTableExploded?: string;
    timeBombModifier: string;
    timeBombNone: string;
    timeBombWinner: string;
    timeBombLoser: string;
    timeBombExpired: string;
    customModifier: string;
    customModifierHint: string;
    cancel: string;
    saveChanges: string;
    quickZero: string;
    playerTotal: string;
    handPoints: string;
    submitRound: string;
    totalHandPoints: string;
    roundAddedSuccess: string;
    roundModifiedSuccess: string;
    roundDeletedSuccess: string;
    undo: string;
    undoSuccess: string;
  };
  rulecards: {
    title: string;
    subtitle: string;
    expansionTag: string;
    drawRandom: string;
    drawnCard: string;
    activeCard: string;
    activateThisCard: string;
    activateCard: string;
    deactivateCard: string;
    allCards: string;
    allRuleCards: string;
    activeForRound: string;
    searchPlaceholder: string;
  };
  rules: {
    title: string;
    searchPlaceholder: string;
    allTimings: string;
    allCategories: string;
    specials: string;
    events: string;
    powerCards: string;
    ruleCards: string;
    pts: string;
    noResults: string;
    cardDictionary: string;
    expansion: string;
    guideTab: string;
    dictionaryTab: string;
    officialPdfTitle: string;
    officialPdfDesc: string;
    overviewPdfTitle: string;
    overviewPdfDesc: string;
    openPdf: string;
    downloadPdf: string;
    fullRulebook: string;
    scopeGlobal?: string;
    scopeTargeted?: string;
    quickReference: string;
    timings?: {
      play: string;
      passing: string;
      landing: string;
      reaction: string;
      white: string;
    };
  };
  settings: {
    title: string;
    appearance: string;
    themeLight: string;
    themeDark: string;
    themeSystem: string;
    language: string;
    soundAndHaptics: string;
    soundEnabled: string;
    hapticsEnabled: string;
    dataManagement: string;
    exportBackup: string;
    exportSuccess: string;
    importBackup: string;
    importSuccess: string;
    importError: string;
    resetGame: string;
    confirmResetDataMessage: string;
    resetDataSuccess: string;
    version: string;
    copyright: string;
    aboutLegalTitle: string;
    disclaimerTitle: string;
    fullDisclaimer: string;
    visitRulefactory: string;
    unofficialNotice: string;
  };
  gameOver: {
    title: string;
    congratulations: string;
    winnerSubtitle: string;
    lowestPoints: string;
    finalStandings: string;
    roundsPlayed: string;
    playAgain: string;
    newMatch: string;
    continueGame: string;
    concludeMatch: string;
    reviewBoard: string;
    viewScoreboard: string;
  };
  events: {
    identityTheft: string;
    identityTheftDesc: string;
    identityTheftSuccess: string;
    identicalScoresWarning: string;
    eventAction: string;
    swappedPoints: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationStrings> = {
  en: {
    appTitle: "Frantic: Pandora's Box",
    appSubtitle: 'Official Card Game Companion',
    nav: {
      scoreboard: 'Standings',
      scoreRound: 'Score Round',
      newGame: 'New Game',
      ruleCards: 'Rule Cards',
      directory: 'Card Dictionary',
    },
    tabs: {
      scoreboard: 'Scoreboard',
      logRound: 'Score Round',
      rulecards: 'Rule Cards',
      rules: 'Card Dictionary',
      dice: 'd20 Dice',
    },
    setup: {
      title: 'Game Setup',
      description:
        'Configure 2 to 8 players and select the official point limit.',
      playerCount: 'Players',
      addPlayer: 'Add Player',
      playerName: 'Player Name',
      color: 'Color',
      targetScore: 'Target Score Limit',
      shortGame: 'Short Game',
      mediumGame: 'Medium Game',
      longGame: 'Long Game',
      customGame: 'Custom Limit',
      recommended: 'Official Preset',
      points: 'pts',
      pts: 'pts',
      customPlaceholder: '150',
      minScoreError:
        'The target score must be an integer of at least 50 points.',
      targetScoreDesc:
        'Official limits: 2-4 players (137, 154, 179) / 5-8 players (113, 137, 154).',
      startMatch: 'Start Match',
      resetMatch: 'Reset Match',
      newGame: 'New Game',
      newMatch: 'New Match',
      setupUpdatedSuccess: 'Player setup updated!',
      confirmResetTitle: 'Reset Match?',
      confirmResetMessage:
        'Are you sure you want to reset all scores? This cannot be undone.',
      cancel: 'Cancel',
      confirm: 'Confirm',
    },
    scoreboard: {
      title: 'Standings',
      round: 'Round',
      currentLeader: 'Current Leader',
      leading: 'Leading',
      dangerZone: 'Danger Zone',
      targetLimit: 'Limit',
      eliminationLimit: 'Game Limit',
      limitHelpTitle: 'Game Limit',
      limitHelpDesc:
        'The cumulative score ceiling that ends the game. As soon as at least one player reaches or exceeds this limit at the end of a round, the game is over. The player with the lowest score wins!',
      dangerHelpTitle: 'Danger Zone',
      dangerHelpDesc:
        'Players within 20 points of the Game Limit are in the Danger Zone. Holding heavy cards like Fuck You (42 pts), The End (17 pts), or Curse (13 pts) at round end can easily push them over the limit!',
      historyTitle: 'Round History',
      undoLastRound: 'Undo Last',
      undoRound: 'Undo Last Round',
      noRoundsYet: 'No rounds played yet',
      startFirstRound: 'Score round 1 to view stats and match progress.',
      startScoringFirstRound: 'Score Round 1',
      editRound: 'Edit Round',
      deleteRound: 'Delete Round',
      spacePoints: 'Hand Points',
      penalty: 'Penalty',
      total: 'Total',
      pts: 'pts',
      activeRuleCard: 'Active Rule Card',
      noActiveRuleCard: 'No rule card active',
      drawRuleCard: 'Draw Rule Card',
    },
    scoring: {
      modalTitle: 'End-of-Round Hand Scoring',
      editModalTitle: 'Edit Round Score',
      roundNumber: 'Round',
      roundWinner: 'Round Winner',
      isWinner: 'Round Winner (Out of cards: 0 pts)',
      isWinnerHint: 'Sets base hand cards to 0 points',
      numberCardsTitle: 'Number Cards (1-10 Face Value)',
      numberCardsHint: '1 to 10 points per card',
      specialCardsTitle: 'Special & Unique Cards',
      standardSpecials: 'Standard Specials (7 pts each)',
      curseCard: 'Curse (13 pts)',
      theEndCard: 'The End (17 pts)',
      fuckYouCard: 'Fuck You (42 pts)',
      mimicryCard: 'Mimicry (7 pts)',
      eventsAndModifiers: 'Event Modifiers',
      doomsdayToggle: 'Doomsday Event (All players score 50 pts)',
      doomsdayHint: 'Overwrites all hand points for this round to exactly 50.',
      timeBombModifier: 'Time Bomb Modifier',
      timeBombNone: 'None / Inactive',
      timeBombWinner: 'Winner Bonus (-10 pts)',
      timeBombLoser: 'Loser Penalty (+10 pts)',
      timeBombExpired: 'Time Expired (Doubled 2x hand points)',
      customModifier: 'Custom Modifier (+/- pts)',
      customModifierHint: 'Optional modifier for custom events',
      cancel: 'Cancel',
      saveChanges: 'Save Changes',
      quickZero: 'Reset',
      playerTotal: 'Round Total',
      handPoints: 'Hand Points',
      submitRound: 'Save Round Scores',
      totalHandPoints: 'Round Score',
      roundAddedSuccess: 'Round scored successfully!',
      roundModifiedSuccess: 'Round updated successfully!',
      roundDeletedSuccess: 'Round deleted successfully!',
      undo: 'Undo',
      undoSuccess: 'Action undone!',
    },
    rulecards: {
      title: "Pandora's Box Rule Cards",
      subtitle:
        'Draw and activate persistent global rules that alter gameplay.',
      expansionTag: "Pandora's Box Expansion",
      drawRandom: 'Draw Random Rule Card',
      drawnCard: 'Selected Rule Card',
      activeCard: 'Active Global Rule',
      activateThisCard: 'Activate This Rule',
      activateCard: 'Activate Rule',
      deactivateCard: 'Deactivate Rule',
      allCards: 'All Rule Cards',
      allRuleCards: 'All Rule Cards',
      activeForRound: 'Active This Round',
      searchPlaceholder: 'Search rule cards...',
    },
    rules: {
      title: 'Card Dictionary & Reference',
      searchPlaceholder: 'Search cards, effects, or expansions...',
      allTimings: 'All Cards',
      allCategories: 'All Categories',
      specials: 'Special Cards',
      events: 'Events',
      powerCards: 'Power Cards',
      ruleCards: 'Rule Cards',
      pts: 'pts',
      noResults: 'No cards found matching your query.',
      cardDictionary: 'Card Dictionary',
      expansion: 'Expansion',
      guideTab: 'Game Guide & Rules',
      dictionaryTab: 'Card Dictionary',
      officialPdfTitle: 'Official Rulefactory Rulebook',
      officialPdfDesc:
        'View or download the complete 22-page official Pandora’s Box rulebook.',
      overviewPdfTitle: 'Official Overview Cards',
      overviewPdfDesc:
        'Quick reference cards with summaries of all card effects, timing, and rules.',
      openPdf: 'Open in New Tab',
      downloadPdf: 'Download PDF',
      fullRulebook: 'Full Rulebook',
      quickReference: 'Overview Cards',
      timings: {
        play: 'Play Timing',
        passing: 'Passing Timing',
        landing: 'Landing Timing',
        reaction: 'Reaction Timing',
        white: 'White Cards',
      },
    },
    settings: {
      title: 'Settings & Data',
      appearance: 'Appearance',
      themeLight: 'Light',
      themeDark: 'Dark',
      themeSystem: 'System',
      language: 'Language',
      soundAndHaptics: 'Sound & Vibration',
      soundEnabled: 'Sound Effects',
      hapticsEnabled: 'Haptic Feedback',
      dataManagement: 'Backup & Restore',
      exportBackup: 'Export Backup (JSON)',
      exportSuccess: 'Game data exported successfully!',
      importBackup: 'Import Backup (JSON)',
      importSuccess: 'Game state restored successfully!',
      importError: 'Failed to import backup file. Invalid JSON.',
      resetGame: 'Reset Data',
      confirmResetDataMessage:
        'Are you sure you want to reset all data (scores, players, cards)? This cannot be undone.',
      resetDataSuccess: 'All game data has been reset to defaults.',
      version: "Frantic Pandora's Box Companion v2.0",
      copyright:
        "Unofficial Companion — Based on Frantic & Pandora's Box by Rulefactory",
      aboutLegalTitle: 'About & Legal',
      disclaimerTitle: 'Disclaimer & Legal Notice',
      fullDisclaimer:
        "Pandora's Box is a game created and published by Rulefactory. This website is an unofficial, non-commercial companion tool designed solely for scorekeeping and rule reference. It is not affiliated with, endorsed, or sponsored by Rulefactory. All trademarks, logos, and copyrighted materials belong to their respective owners.",
      visitRulefactory: 'Official Rulefactory Website',
      unofficialNotice: 'Unofficial Companion Tool',
    },
    gameOver: {
      title: 'Game Over!',
      congratulations: 'Victory!',
      winnerSubtitle: 'wins the game with the lowest cumulative score!',
      lowestPoints: 'Winning Score',
      finalStandings: 'Final Standings',
      roundsPlayed: 'Rounds Played',
      playAgain: 'Play Again',
      newMatch: 'New Match',
      continueGame: 'Continue Game',
      concludeMatch: 'Conclude Match',
      reviewBoard: 'Review Board',
      viewScoreboard: 'View Scoreboard',
    },
    events: {
      identityTheft: 'Identity Theft',
      identityTheftDesc:
        'Swap points between player with highest and lowest score',
      identityTheftSuccess:
        'Identity Theft: Swapped scores between {lowPlayer} and {highPlayer}!',
      identicalScoresWarning:
        'Cannot swap: all player scores are currently identical.',
      eventAction: 'Event Action',
      swappedPoints: 'Points Swapped',
    },
  },
  de: {
    appTitle: "Frantic: Pandora's Box",
    appSubtitle: 'Offizielle Kartenspiel-Begleit-App',
    nav: {
      scoreboard: 'Spielstand',
      scoreRound: 'Runde werten',
      newGame: 'Neues Spiel',
      ruleCards: 'Regelkarten',
      directory: 'Kartenlexikon',
    },
    tabs: {
      scoreboard: 'Spielstand',
      logRound: 'Runde werten',
      rulecards: 'Regelkarten',
      rules: 'Kartenlexikon',
      dice: 'd20 Würfel',
    },
    setup: {
      title: 'Spieleinrichtung',
      description:
        'Konfiguriere 2 bis 8 Personen und wähle das offizielle Punktelimit.',
      playerCount: 'Spieler',
      addPlayer: 'Person hinzufügen',
      playerName: 'Name',
      color: 'Farbe',
      targetScore: 'Punktelimit',
      shortGame: 'Kurzes Spiel',
      mediumGame: 'Mittleres Spiel',
      longGame: 'Langes Spiel',
      customGame: 'Eigenes Limit',
      recommended: 'Offizielle Vorgabe',
      points: 'Pkt',
      pts: 'Pkt',
      customPlaceholder: '150',
      minScoreError:
        'Das Punktelimit muss eine ganze Zahl von mindestens 50 Punkten sein.',
      targetScoreDesc:
        'Offizielle Limits: 2-4 Spieler (137, 154, 179) / 5-8 Spieler (113, 137, 154).',
      startMatch: 'Partie starten',
      resetMatch: 'Partie zurücksetzen',
      newGame: 'Neues Spiel',
      newMatch: 'Neue Partie',
      setupUpdatedSuccess: 'Spieler-Setup aktualisiert!',
      confirmResetTitle: 'Partie zurücksetzen?',
      confirmResetMessage:
        'Möchtest du wirklich alle Runden löschen? Dies kann nicht rückgängig gemacht werden.',
      cancel: 'Abbrechen',
      confirm: 'Bestätigen',
    },
    scoreboard: {
      title: 'Rangliste',
      round: 'Runde',
      currentLeader: 'Führende Person',
      leading: 'In Führung',
      dangerZone: 'Gefahrenzone',
      targetLimit: 'Limit',
      eliminationLimit: 'Punktelimit',
      limitHelpTitle: 'Punktegrenze',
      limitHelpDesc:
        'Die Gesamtpunktegrenze, die das Spiel beendet. Sobald am Ende einer Runde mindestens ein Spieler dieses Limit erreicht oder überschreitet, endet das Spiel. Wer die wenigsten Punkte hat, gewinnt!',
      dangerHelpTitle: 'Gefahrenzone',
      dangerHelpDesc:
        'Spieler, die weniger als 20 Punkte von der Punktegrenze entfernt sind, befinden sich in der Gefahrenzone. Teure Karten wie Fuck You (42 Pkt), The End (17 Pkt) oder Fluch (13 Pkt) können das Spiel sofort beenden!',
      historyTitle: 'Rundenverlauf',
      undoLastRound: 'Runde rückgängig',
      undoRound: 'Letzte Runde rückgängig',
      noRoundsYet: 'Noch keine Runden gewertet',
      startFirstRound: 'Werte Runde 1, um die Statistik zu sehen.',
      startScoringFirstRound: 'Runde 1 werten',
      editRound: 'Runde bearbeiten',
      deleteRound: 'Runde löschen',
      spacePoints: 'Handpunkte',
      penalty: 'Strafpunkte',
      total: 'Gesamt',
      pts: 'Pkt',
      activeRuleCard: 'Aktive Regelkarte',
      noActiveRuleCard: 'Keine Regelkarte aktiv',
      drawRuleCard: 'Regelkarte ziehen',
    },
    scoring: {
      modalTitle: 'Handkarten-Wertung',
      editModalTitle: 'Runde bearbeiten',
      roundNumber: 'Runde',
      roundWinner: 'Rundensieger',
      isWinner: 'Rundensieger (Keine Handkarten: 0 Pkt)',
      isWinnerHint: 'Setzt Handkarten für diesen Spieler auf 0',
      numberCardsTitle: 'Zahlenkarten (1-10 Augenwert)',
      numberCardsHint: '1 bis 10 Punkte pro Karte',
      specialCardsTitle: 'Sonder- & Spezialkarten',
      standardSpecials: 'Standard-Spezialkarten (je 7 Pkt)',
      curseCard: 'Curse / Fluch (13 Pkt)',
      theEndCard: 'The End (17 Pkt)',
      fuckYouCard: 'Fuck You (42 Pkt)',
      mimicryCard: 'Mimicry (7 Pkt)',
      eventsAndModifiers: 'Ereignismodifikatoren',
      doomsdayToggle: 'Doomsday / Weltuntergang (Alle 50 Pkt)',
      doomsdayHint:
        'Überschreibt alle Handkarten dieser Runde mit exakt 50 Punkten.',
      timeBombModifier: 'Zeitbomben-Modifikator',
      timeBombNone: 'Keiner / Inaktiv',
      timeBombWinner: 'Gewinner-Bonus (-10 Pkt)',
      timeBombLoser: 'Verlierer-Strafe (+10 Pkt)',
      timeBombExpired: 'Zeit abgelaufen (Handpunkte x2)',
      customModifier: 'Eigener Modifikator (+/- Pkt)',
      customModifierHint: 'Optionaler Punktezuschlag für Ereignisse',
      cancel: 'Abbrechen',
      saveChanges: 'Änderungen speichern',
      quickZero: 'Zurücksetzen',
      playerTotal: 'Rundentotal',
      handPoints: 'Handpunkte',
      submitRound: 'Rundenergebnis speichern',
      totalHandPoints: 'Rundenpunkte',
      roundAddedSuccess: 'Runde erfolgreich gewertet!',
      roundModifiedSuccess: 'Runde erfolgreich aktualisiert!',
      roundDeletedSuccess: 'Runde erfolgreich gelöscht!',
      undo: 'Rückgängig',
      undoSuccess: 'Aktion rückgängig gemacht!',
    },
    rulecards: {
      title: "Pandora's Box Regelkarten",
      subtitle:
        'Zieht und aktiviert globale Sonderregeln für das laufende Spiel.',
      expansionTag: "Pandora's Box Erweiterung",
      drawRandom: 'Zufällige Regelkarte ziehen',
      drawnCard: 'Gezogene Regelkarte',
      activeCard: 'Aktive Regel',
      activateThisCard: 'Diese Regel aktivieren',
      activateCard: 'Regel aktivieren',
      deactivateCard: 'Regel deaktivieren',
      allCards: 'Alle Regelkarten',
      allRuleCards: 'Alle Regelkarten',
      activeForRound: 'Diese Runde aktiv',
      searchPlaceholder: 'Regelkarten durchsuchen...',
    },
    rules: {
      title: 'Kartenlexikon & Nachschlagewerk',
      searchPlaceholder: 'Karten, Effekte oder Regeln suchen...',
      allTimings: 'Alle Karten',
      allCategories: 'Alle Kategorien',
      specials: 'Spezialkarten',
      events: 'Ereignisse',
      powerCards: 'Powerkarten',
      ruleCards: 'Regelkarten',
      pts: 'Pkt',
      noResults: 'Keine Karten für diese Suche gefunden.',
      cardDictionary: 'Kartenlexikon',
      expansion: 'Erweiterung',
      guideTab: 'Spielregeln & Anleitung',
      dictionaryTab: 'Kartenlexikon',
      officialPdfTitle: 'Offizielles Rulefactory Regelwerk',
      officialPdfDesc:
        'Das vollständige offizielle 22-seitige Pandora’s Box Regelwerk ansehen oder herunterladen.',
      overviewPdfTitle: 'Offizielle Übersichtskarten',
      overviewPdfDesc:
        'Kompakte Übersichtskarten mit Zusammenfassungen aller Karteneffekte und Timings.',
      openPdf: 'In neuem Tab öffnen',
      downloadPdf: 'PDF herunterladen',
      fullRulebook: 'Gesamtregelwerk',
      quickReference: 'Übersichtskarten',
      timings: {
        play: 'Ausspielen',
        passing: 'Passieren',
        landing: 'Landen',
        reaction: 'Reaktion',
        white: 'Weiße Karten',
      },
    },
    settings: {
      title: 'Einstellungen & Daten',
      appearance: 'Erscheinungsbild',
      themeLight: 'Hell',
      themeDark: 'Dunkel',
      themeSystem: 'System',
      language: 'Sprache',
      soundAndHaptics: 'Sound & Vibration',
      soundEnabled: 'Soundeffekte',
      hapticsEnabled: 'Vibration',
      dataManagement: 'Sicherung & Wiederherstellung',
      exportBackup: 'Backup exportieren (JSON)',
      exportSuccess: 'Spieldaten erfolgreich exportiert!',
      importBackup: 'Backup importieren (JSON)',
      importSuccess: 'Spielstand erfolgreich importiert!',
      importError: 'Fehler beim Importieren der Datei. Ungültiges JSON.',
      resetGame: 'Daten zurücksetzen',
      confirmResetDataMessage:
        'Möchtest du wirklich alle Daten (Punkte, Spielernamen, Karten) zurücksetzen? Dies kann nicht rückgängig gemacht werden.',
      resetDataSuccess:
        'Alle Spieldaten wurden auf die Standardwerte zurückgesetzt.',
      version: "Frantic Pandora's Box Begleiter v2.0",
      copyright:
        "Inoffizielle Begleit-App — Basierend auf Frantic & Pandora's Box von Rulefactory",
      aboutLegalTitle: 'Über & Rechtliches',
      disclaimerTitle: 'Rechtlicher Hinweis & Disclaimer',
      fullDisclaimer:
        "Pandora's Box ist ein von Rulefactory entwickeltes und veröffentlichtes Spiel. Diese Website ist ein inoffizielles, nicht-kommerzielles Begleitwerkzeug, das ausschließlich zur Punktezählung und als Regelreferenz dient. Sie steht in keiner Verbindung zu Rulefactory und wird von diesen weder unterstützt noch gesponsert. Alle Marken, Logos und urheberrechtlich geschützten Materialien gehören ihren jeweiligen Eigentümern.",
      visitRulefactory: 'Offizielle Rulefactory-Website',
      unofficialNotice: 'Inoffizielles Begleitwerkzeug',
    },
    gameOver: {
      title: 'Spiel beendet!',
      congratulations: 'Sieg!',
      winnerSubtitle: 'gewinnt die Partie mit den wenigsten Strafpunkten!',
      lowestPoints: 'Gewinner-Punktzahl',
      finalStandings: 'Endstand',
      roundsPlayed: 'Gespielte Runden',
      playAgain: 'Neue Partie starten',
      newMatch: 'Neues Spiel',
      continueGame: 'Weiterspielen',
      concludeMatch: 'Spiel beenden',
      reviewBoard: 'Rangliste ansehen',
      viewScoreboard: 'Punkteübersicht',
    },
    events: {
      identityTheft: 'Identitätsdiebstahl',
      identityTheftDesc:
        'Punkte zwischen Person mit höchster und niedrigster Punktzahl tauschen',
      identityTheftSuccess:
        'Identitätsdiebstahl: Punkte zwischen {lowPlayer} und {highPlayer} getauscht!',
      identicalScoresWarning:
        'Kein Tausch möglich: Alle Punktestände sind derzeit identisch.',
      eventAction: 'Ereignis-Aktion',
      swappedPoints: 'Punkte getauscht',
    },
  },
  it: {
    appTitle: "Frantic: Pandora's Box",
    appSubtitle: 'Companion Ufficiale Gioco di Carte',
    nav: {
      scoreboard: 'Classifica',
      scoreRound: 'Valuta Round',
      newGame: 'Nuova Partita',
      ruleCards: 'Carte Regola',
      directory: 'Dizionario',
    },
    tabs: {
      scoreboard: 'Punteggio',
      logRound: 'Valuta Round',
      rulecards: 'Carte Regola',
      rules: 'Dizionario Carte',
      dice: 'Dado d20',
    },
    setup: {
      title: 'Configurazione Partita',
      description:
        'Configura da 2 a 8 giocatori e scegli il limite ufficiale di punti.',
      playerCount: 'Giocatori',
      addPlayer: 'Aggiungi Giocatore',
      playerName: 'Nome',
      color: 'Colore',
      targetScore: 'Limite Punteggio',
      shortGame: 'Partita Breve',
      mediumGame: 'Partita Media',
      longGame: 'Partita Lunga',
      customGame: 'Limite Personalizzato',
      recommended: 'Preset Ufficiale',
      points: 'pt',
      pts: 'pt',
      customPlaceholder: '150',
      minScoreError:
        'Il punteggio deve essere un numero intero maggiore o uguale a 50.',
      targetScoreDesc:
        'Limiti ufficiali: 2-4 giocatori (137, 154, 179) / 5-8 giocatori (113, 137, 154).',
      startMatch: 'Inizia Partita',
      resetMatch: 'Azzera Partita',
      newGame: 'Nuova Partita',
      newMatch: 'Nuovo Match',
      setupUpdatedSuccess: 'Configurazione giocatori aggiornata!',
      confirmResetTitle: 'Resettare la partita?',
      confirmResetMessage:
        'Sei sicuro di voler cancellare tutti i punteggi? Operazione irreversibile.',
      cancel: 'Annulla',
      confirm: 'Conferma',
    },
    scoreboard: {
      title: 'Classifica',
      round: 'Round',
      currentLeader: 'In Testa',
      leading: 'Primo',
      dangerZone: 'Zona Pericolo',
      targetLimit: 'Limite',
      eliminationLimit: 'Limite Partita',
      limitHelpTitle: 'Limite Punti',
      limitHelpDesc:
        'Il limite massimo di punti cumulativi che determina la fine della partita. Quando al termine di un round almeno un giocatore raggiunge o supera questa soglia, la partita termina. Vince chi ha meno punti!',
      dangerHelpTitle: 'Zona Pericolo',
      dangerHelpDesc:
        'I giocatori a 20 punti o meno dalla soglia limite sono nella Zona Pericolo. Carte pesanti come Fuck You (42 pt), The End (17 pt) o Maledizione (13 pt) a fine round possono far superare la soglia e chiudere la partita!',
      historyTitle: 'Storico Round',
      undoLastRound: 'Annulla Ultimo',
      undoRound: 'Annulla Ultimo Round',
      noRoundsYet: 'Nessun round registrato',
      startFirstRound: 'Registra il Round 1 per iniziare la partita.',
      startScoringFirstRound: 'Registra Round 1',
      editRound: 'Modifica Round',
      deleteRound: 'Elimina Round',
      spacePoints: 'Punti Mano',
      penalty: 'Penalità',
      total: 'Totale',
      pts: 'pt',
      activeRuleCard: 'Carta Regola Attiva',
      noActiveRuleCard: 'Nessuna carta regola attiva',
      drawRuleCard: 'Pesca Carta Regola',
    },
    scoring: {
      modalTitle: 'Conteggio Punti a Fine Round',
      editModalTitle: 'Modifica Punteggio Round',
      roundNumber: 'Round',
      roundWinner: 'Vincitore Round',
      isWinner: 'Vincitore Round (Carte terminate: 0 pt)',
      isWinnerHint: 'Imposta le carte in mano del vincitore a 0',
      numberCardsTitle: 'Carte Numero (1-10 Valore facciale)',
      numberCardsHint: 'Da 1 a 10 punti per carta',
      specialCardsTitle: 'Carte Speciali & Uniche',
      standardSpecials: 'Speciali Standard (7 pt ciascuna)',
      curseCard: 'Maledizione / Curse (13 pt)',
      theEndCard: 'The End (17 pt)',
      fuckYouCard: 'Fuck You (42 pt)',
      mimicryCard: 'Mimicry (7 pt)',
      eventsAndModifiers: 'Modificatori Evento',
      doomsdayToggle: 'Giorno del Giudizio (Tutti 50 pt)',
      doomsdayHint:
        'Imposta i punti di tutti a esattamente 50 per questo round.',
      timeBombModifier: 'Bomba a Orologeria',
      timeBombNone: 'Nessuno / Inattivo',
      timeBombWinner: 'Bonus Vincitore (-10 pt)',
      timeBombLoser: 'Penalità Sconfitto (+10 pt)',
      timeBombExpired: 'Tempo Scaduto (Punti raddoppiati x2)',
      customModifier: 'Modificatore Personalizzato (+/- pt)',
      customModifierHint: 'Modificatore opzionale per eventi speciali',
      cancel: 'Annulla',
      saveChanges: 'Salva Modifiche',
      quickZero: 'Azzera',
      playerTotal: 'Totale Round',
      handPoints: 'Punti Mano',
      submitRound: 'Salva Risultati Round',
      totalHandPoints: 'Punti Round',
      roundAddedSuccess: 'Round registrato con successo!',
      roundModifiedSuccess: 'Round modificato con successo!',
      roundDeletedSuccess: 'Round eliminato con successo!',
      undo: 'Annulla',
      undoSuccess: 'Azione annullata!',
    },
    rulecards: {
      title: "Carte Regola Pandora's Box",
      subtitle: 'Pesca e attiva regole globali persistenti.',
      expansionTag: "Espansione Pandora's Box",
      drawRandom: 'Pesca Carta Regola Casuale',
      drawnCard: 'Carta Pescata',
      activeCard: 'Regola Globale Attiva',
      activateThisCard: 'Attiva Questa Regola',
      activateCard: 'Attiva Regola',
      deactivateCard: 'Disattiva Regola',
      allCards: 'Tutte le Carte Regola',
      allRuleCards: 'Tutte le Carte Regola',
      activeForRound: 'Attiva Questo Round',
      searchPlaceholder: 'Cerca carte regola...',
    },
    rules: {
      title: 'Dizionario Carte & Regole',
      searchPlaceholder: 'Cerca carte, effetti o regole...',
      allTimings: 'Tutte le Carte',
      allCategories: 'Tutte le Categorie',
      specials: 'Carte Speciali',
      events: 'Eventi',
      powerCards: 'Carte Potere',
      ruleCards: 'Carte Regola',
      pts: 'pt',
      noResults: 'Nessuna carta trovata.',
      cardDictionary: 'Dizionario Carte',
      expansion: 'Espansione',
      guideTab: 'Guida & Regolamento',
      dictionaryTab: 'Dizionario delle Carte',
      officialPdfTitle: 'Regolamento Ufficiale Rulefactory',
      officialPdfDesc:
        'Visualizza o scarica il regolamento ufficiale completo di 22 pagine di Pandora’s Box.',
      overviewPdfTitle: 'Carte Riassuntive Ufficiali',
      overviewPdfDesc:
        'Schede di consultazione rapida con tutti gli effetti delle carte e tempi di gioco.',
      openPdf: 'Apri in una nuova scheda',
      downloadPdf: 'Scarica PDF',
      fullRulebook: 'Regolamento Completo',
      quickReference: 'Carte Riassuntive',
      timings: {
        play: 'Fase Giocata',
        passing: 'Al Passaggio',
        landing: 'All’Atterraggio',
        reaction: 'Reazione',
        white: 'Carte Bianche',
      },
    },
    settings: {
      title: 'Impostazioni & Dati',
      appearance: 'Aspetto',
      themeLight: 'Chiaro',
      themeDark: 'Scuro',
      themeSystem: 'Sistema',
      language: 'Lingua',
      soundAndHaptics: 'Suoni e Vibrazione',
      soundEnabled: 'Effetti Sonori',
      hapticsEnabled: 'Feedback Aptico',
      dataManagement: 'Backup & Ripristino',
      exportBackup: 'Esporta Backup (JSON)',
      exportSuccess: 'Dati di gioco esportati con successo!',
      importBackup: 'Importa Backup (JSON)',
      importSuccess: 'Dati di gioco ripristinati con successo!',
      importError: 'Impossibile importare il file. JSON non valido.',
      resetGame: 'Ripristina Dati',
      confirmResetDataMessage:
        'Sei sicuro di voler ripristinare tutti i dati (punti, nomi giocatori, carte)? Questa operazione non può essere annullata.',
      resetDataSuccess:
        'Tutti i dati di gioco sono stati ripristinati allo stato iniziale.',
      version: "Frantic Pandora's Box Companion v2.0",
      copyright:
        "Companion non ufficiale — Basato su Frantic & Pandora's Box di Rulefactory",
      aboutLegalTitle: 'Informazioni & Note Legali',
      disclaimerTitle: 'Disclaimer Legale',
      fullDisclaimer:
        "Pandora's Box è un gioco creato e pubblicato da Rulefactory. Questo sito web è uno strumento complementare non ufficiale e non commerciale, progettato esclusivamente per il conteggio dei punti e la consultazione delle regole. Non è affiliato, approvato o sponsorizzato da Rulefactory. Tutti i marchi, loghi e materiali protetti da copyright appartengono ai rispettivi proprietari.",
      visitRulefactory: 'Sito Ufficiale Rulefactory',
      unofficialNotice: 'Strumento Complementare Non Ufficiale',
    },
    gameOver: {
      title: 'Partita Terminata!',
      congratulations: 'Vittoria!',
      winnerSubtitle:
        'vince la partita con il minor numero di punti di penalità!',
      lowestPoints: 'Punteggio Vincitore',
      finalStandings: 'Classifica Finale',
      roundsPlayed: 'Round Giocati',
      playAgain: 'Nuova Partita',
      newMatch: 'Nuova Partita',
      continueGame: 'Continua Partita',
      concludeMatch: 'Concludi Partita',
      reviewBoard: 'Rivedi Tabellone',
      viewScoreboard: 'Vedi Tabellone',
    },
    events: {
      identityTheft: 'Furto d’Identità',
      identityTheftDesc:
        'Scambia i punti tra il giocatore con il punteggio più alto e quello più basso',
      identityTheftSuccess:
        'Furto d’Identità: Punti scambiati tra {lowPlayer} e {highPlayer}!',
      identicalScoresWarning:
        'Impossibile scambiare: tutti i punteggi sono attualmente identici.',
      eventAction: 'Azione Evento',
      swappedPoints: 'Punti Scambiati',
    },
  },
  fr: {
    appTitle: "Frantic: Pandora's Box",
    appSubtitle: 'Compagnon Officiel du Jeu de Cartes',
    nav: {
      scoreboard: 'Classement',
      scoreRound: 'Noter Manche',
      newGame: 'Nouvelle Partie',
      ruleCards: 'Cartes Règle',
      directory: 'Dictionnaire',
    },
    tabs: {
      scoreboard: 'Scores',
      logRound: 'Noter Manche',
      rulecards: 'Cartes Règle',
      rules: 'Dictionnaire',
      dice: 'Dé d20',
    },
    setup: {
      title: 'Configuration de la Partie',
      description:
        'Configurez de 2 à 8 joueurs et choisissez la limite officielle.',
      playerCount: 'Joueurs',
      addPlayer: 'Ajouter un Joueur',
      playerName: 'Nom',
      color: 'Couleur',
      targetScore: 'Limite de Points',
      shortGame: 'Partie Courte',
      mediumGame: 'Partie Moyenne',
      longGame: 'Partie Longue',
      customGame: 'Limite Personnalisée',
      recommended: 'Barème Officiel',
      points: 'pts',
      pts: 'pts',
      customPlaceholder: '150',
      minScoreError:
        'La limite de points doit être un nombre entier supérieur ou égal à 50.',
      targetScoreDesc:
        'Limites officielles : 2-4 joueurs (137, 154, 179) / 5-8 joueurs (113, 137, 154).',
      startMatch: 'Démarrer la Partie',
      resetMatch: 'Réinitialiser la Partie',
      newGame: 'Nouvelle Partie',
      newMatch: 'Nouveau Match',
      setupUpdatedSuccess: 'Configuration des joueurs mise à jour !',
      confirmResetTitle: 'Réinitialiser ?',
      confirmResetMessage:
        'Voulez-vous vraiment effacer tous les scores ? Irréversible.',
      cancel: 'Annuler',
      confirm: 'Confirmer',
    },
    scoreboard: {
      title: 'Classement',
      round: 'Manche',
      currentLeader: 'Meneur Actuel',
      leading: 'En tête',
      dangerZone: 'Zone Danger',
      targetLimit: 'Limite',
      eliminationLimit: 'Limite de Fin',
      limitHelpTitle: 'Limite de Points',
      limitHelpDesc:
        'Le plafond de points cumulés qui met fin à la partie. Dès qu’au moins un joueur atteint ou dépasse cette limite à la fin d’une manche, la partie s’arrête. Le joueur ayant le moins de points l’emporte !',
      dangerHelpTitle: 'Zone de Danger',
      dangerHelpDesc:
        'Les joueurs à 20 points ou moins de la limite sont en zone de danger. Conserver des cartes pénalisantes comme Fuck You (42 pts), The End (17 pts) ou Malédiction (13 pts) peut rapidement dépasser la limite !',
      historyTitle: 'Historique des Manches',
      undoLastRound: 'Annuler Dernière',
      undoRound: 'Annuler Dernière Manche',
      noRoundsYet: 'Aucune manche enregistrée',
      startFirstRound: 'Notez la manche 1 pour afficher les stats.',
      startScoringFirstRound: 'Noter Manche 1',
      editRound: 'Modifier Manche',
      deleteRound: 'Supprimer Manche',
      spacePoints: 'Points Main',
      penalty: 'Pénalité',
      total: 'Total',
      pts: 'pts',
      activeRuleCard: 'Carte Règle Active',
      noActiveRuleCard: 'Aucune règle active',
      drawRuleCard: 'Tirer une Carte Règle',
    },
    scoring: {
      modalTitle: 'Calcul des Points de Main',
      editModalTitle: 'Modifier le Score de Manche',
      roundNumber: 'Manche',
      roundWinner: 'Vainqueur de la manche',
      isWinner: 'Vainqueur de la manche (Main vide: 0 pt)',
      isWinnerHint: 'Définit les points de main du vainqueur à 0',
      numberCardsTitle: 'Cartes Chiffres (1-10 Valeur faciale)',
      numberCardsHint: '1 à 10 points par carte',
      specialCardsTitle: 'Cartes Spéciales & Uniques',
      standardSpecials: 'Spéciales Standard (7 pts chacune)',
      curseCard: 'Malédiction / Curse (13 pts)',
      theEndCard: 'The End (17 pts)',
      fuckYouCard: 'Fuck You (42 pts)',
      mimicryCard: 'Mimicry (7 pts)',
      eventsAndModifiers: 'Modificateurs d’Événements',
      doomsdayToggle: 'Fin du Monde / Doomsday (Tous 50 pts)',
      doomsdayHint:
        'Attribue exactement 50 points à tous les joueurs pour cette manche.',
      timeBombModifier: 'Bombe à Retardement',
      timeBombNone: 'Aucun / Inactif',
      timeBombWinner: 'Bonus Vainqueur (-10 pts)',
      timeBombLoser: 'Pénalité Perdant (+10 pts)',
      timeBombExpired: 'Temps Écoulé (Points x2)',
      customModifier: 'Modificateur Personnalisé (+/- pts)',
      customModifierHint:
        'Modificateur optionnel pour événements personnalisés',
      cancel: 'Annuler',
      saveChanges: 'Enregistrer les modifications',
      quickZero: 'Réinitialiser',
      playerTotal: 'Total Manche',
      handPoints: 'Points de Main',
      submitRound: 'Enregistrer la Manche',
      totalHandPoints: 'Points de Manche',
      roundAddedSuccess: 'Manche enregistrée avec succès !',
      roundModifiedSuccess: 'Manche mise à jour avec succès !',
      roundDeletedSuccess: 'Manche supprimée avec succès !',
      undo: 'Annuler',
      undoSuccess: 'Action annulée !',
    },
    rulecards: {
      title: "Cartes Règle Pandora's Box",
      subtitle: 'Tirez et activez des règles globales persistantes.',
      expansionTag: "Extension Pandora's Box",
      drawRandom: 'Tirer une Carte Règle',
      drawnCard: 'Carte Tirée',
      activeCard: 'Règle Globale Active',
      activateThisCard: 'Activer cette Règle',
      activateCard: 'Activer Règle',
      deactivateCard: 'Désactiver la Règle',
      allCards: 'Toutes les Cartes Règle',
      allRuleCards: 'Toutes les Cartes Règle',
      activeForRound: 'Active Cette Manche',
      searchPlaceholder: 'Rechercher une règle...',
    },
    rules: {
      title: 'Dictionnaire des Cartes & Règles',
      searchPlaceholder: 'Rechercher cartes, effets...',
      allTimings: 'Toutes les Cartes',
      allCategories: 'Toutes les Catégories',
      specials: 'Cartes Spéciales',
      events: 'Événements',
      powerCards: 'Cartes Pouvoir',
      ruleCards: 'Cartes Règle',
      pts: 'pts',
      noResults: 'Aucune carte trouvée.',
      cardDictionary: 'Dictionnaire des Cartes',
      expansion: 'Extension',
      guideTab: 'Guide des Règles',
      dictionaryTab: 'Dictionnaire des Cartes',
      officialPdfTitle: 'Règles Officielles Rulefactory',
      officialPdfDesc:
        'Consultez ou téléchargez le livret complet de 22 pages des règles officielles de Pandora’s Box.',
      overviewPdfTitle: 'Cartes de Référence Officielles',
      overviewPdfDesc:
        'Cartes mémo avec un résumé des effets de toutes les cartes et leurs timings.',
      openPdf: 'Ouvrir dans un nouvel onglet',
      downloadPdf: 'Télécharger le PDF',
      fullRulebook: 'Règles Complètes',
      quickReference: 'Cartes de Référence',
      timings: {
        play: 'Pose',
        passing: 'Dépassement',
        landing: 'Atterrissage',
        reaction: 'Réaction',
        white: 'Cartes Blanches',
      },
    },
    settings: {
      title: 'Paramètres & Données',
      appearance: 'Apparence',
      themeLight: 'Clair',
      themeDark: 'Sombre',
      themeSystem: 'Système',
      language: 'Langue',
      soundAndHaptics: 'Son & Vibration',
      soundEnabled: 'Effets Sonores',
      hapticsEnabled: 'Vibration Haptique',
      dataManagement: 'Sauvegarde & Restauration',
      exportBackup: 'Exporter Sauvegarde (JSON)',
      exportSuccess: 'Données de jeu exportées avec succès !',
      importBackup: 'Importer Sauvegarde (JSON)',
      importSuccess: 'Partie restaurée avec succès !',
      importError: 'Échec de l’importation. JSON invalide.',
      resetGame: 'Réinitialiser les Données',
      confirmResetDataMessage:
        'Voulez-vous vraiment réinitialiser toutes les données (points, noms des joueurs, cartes) ? Cette action est irréversible.',
      resetDataSuccess:
        'Toutes les données de jeu ont été réinitialisées par défaut.',
      version: "Compagnon Frantic Pandora's Box v2.0",
      copyright:
        "Compagnon non-officiel — Basé sur Frantic & Pandora's Box par Rulefactory",
      aboutLegalTitle: 'À propos & Mentions Légales',
      disclaimerTitle: 'Avertissement Légal',
      fullDisclaimer:
        "Pandora's Box est un jeu créé et publié par Rulefactory. Ce site est un outil compagnon non officiel et non commercial, conçu uniquement pour le décompte des points et la consultation des règles. Il n'est ni affilié, ni approuvé, ni sponsorisé par Rulefactory. Toutes les marques, logos et contenus protégés par le droit d'auteur appartiennent à leurs propriétaires respectifs.",
      visitRulefactory: 'Site Officiel de Rulefactory',
      unofficialNotice: 'Outil Compagnon Non Officiel',
    },
    gameOver: {
      title: 'Partie Terminée !',
      congratulations: 'Victoire !',
      winnerSubtitle:
        'remporte la partie avec le moins de points de pénalité !',
      lowestPoints: 'Score Vainqueur',
      finalStandings: 'Classement Final',
      roundsPlayed: 'Manches Jouées',
      playAgain: 'Nouvelle Partie',
      newMatch: 'Nouvelle Partie',
      continueGame: 'Continuer la partie',
      concludeMatch: 'Terminer la Partie',
      reviewBoard: 'Revoir le Tableau',
      viewScoreboard: 'Voir le tableau',
    },
    events: {
      identityTheft: 'Vol d’Identité',
      identityTheftDesc:
        'Échange les points entre le joueur avec le score le plus haut et le plus bas',
      identityTheftSuccess:
        'Vol d’Identité: Points échangés entre {lowPlayer} et {highPlayer} !',
      identicalScoresWarning:
        'Échange impossible: tous les scores sont actuellement identiques.',
      eventAction: 'Action Événement',
      swappedPoints: 'Points Échangés',
    },
  },
};

export const UI_TRANSLATIONS = TRANSLATIONS;
