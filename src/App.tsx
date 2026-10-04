import { useState } from 'react';
import { useGameState } from './hooks/useGameState';
import { useTheme } from './hooks/useTheme';
import { Navbar } from './components/layout/Navbar';
import { TabNavigation, ActiveTab } from './components/layout/TabNavigation';
import { Footer } from './components/layout/Footer';
import { Leaderboard } from './components/scoreboard/Leaderboard';
import { GameOverModal } from './components/scoreboard/GameOverModal';
import { HandCalculatorModal } from './components/scoring/HandCalculatorModal';
import { RuleCardDrawer } from './components/rulecards/RuleCardDrawer';
import { CardDictionary } from './components/rules/CardDictionary';
import { GameSetupModal } from './components/setup/GameSetupModal';
import { SettingsModal } from './components/layout/SettingsModal';
import { HandScore } from './types/game';

export function App() {
  const {
    gameState,
    playerStats,
    language,
    setLanguage,
    addRound,
    editRound,
    deleteRound,
    undoLastRound,
    setActiveRuleCardIds,
    startNewGame,
    resetCurrentGame,
    exportGameState,
    importGameState,
  } = useGameState();

  const { theme, setTheme } = useTheme();

  const [activeTab, setActiveTab] = useState<ActiveTab>('scoreboard');
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const [editingRoundNumber, setEditingRoundNumber] = useState<number | null>(null);
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [settingsInitialTab, setSettingsInitialTab] = useState<'settings' | 'legal'>('settings');
  const [isGameOverModalDismissed, setIsGameOverModalDismissed] = useState(false);

  const winner = playerStats[0] || null;

  const handleOpenScoreModal = () => {
    setEditingRoundNumber(null);
    setIsScoreModalOpen(true);
  };

  const handleOpenEditRound = (roundNumber: number) => {
    setEditingRoundNumber(roundNumber);
    setIsScoreModalOpen(true);
  };

  const handleOpenSettings = (tab: 'settings' | 'legal' = 'settings') => {
    setSettingsInitialTab(tab);
    setIsSettingsModalOpen(true);
  };

  const handleSubmitScores = (scores: Record<string, HandScore>) => {
    if (editingRoundNumber !== null) {
      editRound(editingRoundNumber, scores);
    } else {
      addRound(scores);
    }
    setEditingRoundNumber(null);
    setIsScoreModalOpen(false);
  };

  const handleSaveSetup = (
    newPlayers: typeof gameState.players,
    newConfig: typeof gameState.config,
    isResetRounds: boolean
  ) => {
    if (isResetRounds) {
      startNewGame(newPlayers, newConfig);
      setIsGameOverModalDismissed(false);
    } else {
      startNewGame(newPlayers, newConfig);
    }
  };

  const editingRound = editingRoundNumber
    ? gameState.rounds.find(r => r.roundNumber === editingRoundNumber)
    : null;

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col font-sans transition-colors selection:bg-amber-500 selection:text-black">
      {/* Top Navigation */}
      <Navbar
        language={language}
        onSelectLanguage={setLanguage}
        theme={theme}
        onThemeChange={setTheme}
        roundsCount={gameState.rounds.length}
        targetScore={gameState.config.targetScore}
        onOpenSetup={() => setIsSetupModalOpen(true)}
        onStartNewGame={() => setIsSetupModalOpen(true)}
        onOpenSettings={() => handleOpenSettings('settings')}
      />

      {/* Main Tab Bar */}
      <TabNavigation
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        language={language}
        onStartNewGame={() => setIsSetupModalOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6">
        {activeTab === 'scoreboard' && (
          <Leaderboard
            playerStats={playerStats}
            targetScore={gameState.config.targetScore}
            rounds={gameState.rounds}
            players={gameState.players}
            activeRuleCardIds={gameState.activeRuleCardIds}
            onOpenScoreModal={handleOpenScoreModal}
            onUndoLastRound={undoLastRound}
            onEditRound={handleOpenEditRound}
            onDeleteRound={deleteRound}
            onClearActiveRuleCard={() => setActiveRuleCardIds([])}
            onOpenRuleCardDrawer={() => setActiveTab('rulecards')}
            language={language}
          />
        )}

        {activeTab === 'rulecards' && (
          <RuleCardDrawer
            activeRuleCardIds={gameState.activeRuleCardIds || []}
            onSelectActiveRuleCard={cardId => {
              setActiveRuleCardIds(cardId ? [cardId] : []);
            }}
            language={language}
          />
        )}

        {activeTab === 'rules' && <CardDictionary language={language} />}
      </main>

      {/* Subtle Bottom Footer */}
      <Footer
        language={language}
        onOpenDisclaimer={() => handleOpenSettings('legal')}
      />

      {/* End-of-Round Card Hand Scoring Modal */}
      <HandCalculatorModal
        isOpen={isScoreModalOpen}
        onClose={() => {
          setIsScoreModalOpen(false);
          setEditingRoundNumber(null);
        }}
        players={gameState.players}
        onSubmitRound={handleSubmitScores}
        language={language}
        roundNumber={editingRoundNumber ?? gameState.rounds.length + 1}
        initialScores={editingRound?.scores}
        isEditing={editingRoundNumber !== null}
      />

      {/* Match Setup Modal */}
      <GameSetupModal
        isOpen={isSetupModalOpen}
        onClose={() => setIsSetupModalOpen(false)}
        currentPlayers={gameState.players}
        currentConfig={gameState.config}
        onSaveAndStart={handleSaveSetup}
        language={language}
      />

      {/* Settings & Legal Disclaimer Modal */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        language={language}
        onLanguageChange={setLanguage}
        theme={theme}
        onThemeChange={setTheme}
        onExport={exportGameState}
        onImport={importGameState}
        onResetMatch={resetCurrentGame}
        initialTab={settingsInitialTab}
      />

      {/* Game Over Celebration Modal */}
      <GameOverModal
        isOpen={gameState.isGameOver && !isGameOverModalDismissed}
        onClose={() => setIsGameOverModalDismissed(true)}
        winner={winner}
        standings={playerStats}
        targetScore={gameState.config.targetScore}
        roundsCount={gameState.rounds.length}
        onPlayAgain={() => {
          resetCurrentGame();
          setIsGameOverModalDismissed(false);
        }}
        language={language}
      />
    </div>
  );
}

export default App;
