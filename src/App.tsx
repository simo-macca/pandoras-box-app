import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useGameState } from './hooks/useGameState';
import { useTheme } from './hooks/useTheme';
import { TRANSLATIONS } from './data/translations';
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
    continueGame,
    concludeGame,
    resetAllData,
    exportGameState,
    importGameState,
  } = useGameState();

  const { theme, setTheme } = useTheme();

  const [activeTab, setActiveTab] = useState<ActiveTab>('scoreboard');
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const [editingRoundNumber, setEditingRoundNumber] = useState<number | null>(
    null
  );
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [settingsInitialTab, setSettingsInitialTab] = useState<
    'settings' | 'legal'
  >('settings');
  const [isGameOverModalDismissed, setIsGameOverModalDismissed] =
    useState(false);

  const winner = playerStats[0] || null;

  const handleOpenScoreModal = () => {
    if (gameState.isGameOver && !gameState.isContinued) {
      setIsGameOverModalDismissed(false);
      return;
    }
    setEditingRoundNumber(null);
    setIsScoreModalOpen(true);
  };

  const handleContinueGame = () => {
    continueGame();
    setIsGameOverModalDismissed(true);
  };

  const handleConcludeGame = () => {
    concludeGame();
    setIsGameOverModalDismissed(false);
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
      toast.success(TRANSLATIONS[language].scoring.roundModifiedSuccess);
    } else {
      addRound(scores);
      toast.success(TRANSLATIONS[language].scoring.roundAddedSuccess);
    }
    setEditingRoundNumber(null);
    setIsScoreModalOpen(false);
  };

  const handleDeleteRound = (roundNumber: number) => {
    deleteRound(roundNumber);
    toast.success(TRANSLATIONS[language].scoring.roundDeletedSuccess);
  };

  const handleUndoLastRound = () => {
    if (gameState.rounds.length > 0) {
      undoLastRound();
      toast.success(TRANSLATIONS[language].scoring.roundDeletedSuccess);
    }
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

  const handleResetData = () => {
    resetAllData();
    setIsScoreModalOpen(false);
    setEditingRoundNumber(null);
    setIsGameOverModalDismissed(false);
    toast.success(TRANSLATIONS[language].settings.resetDataSuccess);
  };

  const editingRound = editingRoundNumber
    ? gameState.rounds.find((r) => r.roundNumber === editingRoundNumber)
    : null;

  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-neutral-100 font-sans text-neutral-900 transition-colors selection:bg-amber-500 selection:text-black dark:bg-neutral-950 dark:text-neutral-100">
      {/* Top Navigation */}
      <Navbar
        language={language}
        theme={theme}
        onThemeChange={setTheme}
        roundsCount={gameState.rounds.length}
        targetScore={gameState.config.targetScore}
        onOpenSetup={() => setIsSetupModalOpen(true)}
        onOpenSettings={() => handleOpenSettings('settings')}
      />

      {/* Main Tab Bar */}
      <TabNavigation
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        language={language}
      />

      {/* Main View Area */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-3 py-4 pb-24 sm:px-6 sm:py-6 md:pb-6">
        {activeTab === 'scoreboard' && (
          <Leaderboard
            playerStats={playerStats}
            targetScore={gameState.config.targetScore}
            rounds={gameState.rounds}
            players={gameState.players}
            activeRuleCardIds={gameState.activeRuleCardIds}
            isGameOver={gameState.isGameOver}
            isContinued={gameState.isContinued}
            onOpenScoreModal={handleOpenScoreModal}
            onUndoLastRound={handleUndoLastRound}
            onEditRound={handleOpenEditRound}
            onDeleteRound={handleDeleteRound}
            onClearActiveRuleCard={() => setActiveRuleCardIds([])}
            onOpenRuleCardDrawer={() => setActiveTab('rulecards')}
            onStartNewGame={() => setIsSetupModalOpen(true)}
            onConcludeGame={handleConcludeGame}
            language={language}
          />
        )}

        {activeTab === 'rulecards' && (
          <RuleCardDrawer
            activeRuleCardIds={gameState.activeRuleCardIds || []}
            onSelectActiveRuleCard={(cardId) => {
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
        onResetData={handleResetData}
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
        onContinue={handleContinueGame}
        language={language}
      />

      {/* Global Toast Notifications */}
      <Toaster
        position="top-right"
        containerStyle={{
          top: 16,
          right: 16,
          zIndex: 99999,
        }}
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: '14px',
            background: '#1f2937',
            color: '#fff',
            fontSize: '13px',
            fontWeight: '600',
            boxShadow:
              '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3)',
          },
          error: {
            style: {
              background: '#ef4444',
              color: '#ffffff',
            },
            iconTheme: {
              primary: '#ffffff',
              secondary: '#ef4444',
            },
          },
        }}
      />
    </div>
  );
}

export default App;
