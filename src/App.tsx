import { useState, useRef, useCallback, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { RotateCcw } from 'lucide-react';
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
import { HandScore, GameState } from './types/game';

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
    updateGameSetup,
    restoreGameState,
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

  const previousStateRef = useRef<GameState | null>(null);
  const undoTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (undoTimeoutRef.current) {
        clearTimeout(undoTimeoutRef.current);
      }
    };
  }, []);

  const showUndoToast = useCallback(
    (message: string, snapshot: GameState) => {
      if (undoTimeoutRef.current) {
        clearTimeout(undoTimeoutRef.current);
      }
      previousStateRef.current = snapshot;

      undoTimeoutRef.current = setTimeout(() => {
        previousStateRef.current = null;
        undoTimeoutRef.current = null;
      }, 5000);

      toast(
        (tInstance) => (
          <div className="flex w-full items-center justify-between gap-3 text-xs sm:text-sm">
            <span className="font-semibold text-white">{message}</span>
            <button
              type="button"
              onClick={() => {
                if (previousStateRef.current) {
                  const restoredState = previousStateRef.current;
                  restoreGameState(restoredState);
                  if (restoredState.isGameOver && !restoredState.isContinued) {
                    setIsGameOverModalDismissed(false);
                  }
                  previousStateRef.current = null;
                }
                if (undoTimeoutRef.current) {
                  clearTimeout(undoTimeoutRef.current);
                  undoTimeoutRef.current = null;
                }
                toast.dismiss(tInstance.id);
                toast.success(TRANSLATIONS[language].scoring.undoSuccess, {
                  duration: 2500,
                });
              }}
              className="flex shrink-0 items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-black text-neutral-950 shadow-sm transition hover:bg-amber-400 active:scale-95"
            >
              <RotateCcw className="h-3.5 w-3.5 stroke-[2.5]" />
              <span>{TRANSLATIONS[language].scoring.undo}</span>
            </button>
          </div>
        ),
        {
          id: 'undo-toast',
          duration: 5000,
          style: {
            minWidth: '270px',
            maxWidth: '420px',
          },
        }
      );
    },
    [language, restoreGameState]
  );

  const handleSubmitScores = (scores: Record<string, HandScore>) => {
    const previousSnapshot: GameState = JSON.parse(JSON.stringify(gameState));
    if (editingRoundNumber !== null) {
      editRound(editingRoundNumber, scores);
      showUndoToast(
        TRANSLATIONS[language].scoring.roundModifiedSuccess,
        previousSnapshot
      );
    } else {
      addRound(scores);
      showUndoToast(
        TRANSLATIONS[language].scoring.roundAddedSuccess,
        previousSnapshot
      );
    }
    setEditingRoundNumber(null);
    setIsScoreModalOpen(false);
  };

  const handleDeleteRound = (roundNumber: number) => {
    const previousSnapshot: GameState = JSON.parse(JSON.stringify(gameState));
    deleteRound(roundNumber);
    showUndoToast(
      TRANSLATIONS[language].scoring.roundDeletedSuccess,
      previousSnapshot
    );
  };

  const handleUndoLastRound = () => {
    if (gameState.rounds.length > 0) {
      const previousSnapshot: GameState = JSON.parse(JSON.stringify(gameState));
      undoLastRound();
      showUndoToast(
        TRANSLATIONS[language].scoring.roundDeletedSuccess,
        previousSnapshot
      );
    }
  };

  const handleSaveSetup = (
    newPlayers: typeof gameState.players,
    newConfig: typeof gameState.config,
    isResetRounds: boolean
  ) => {
    const previousSnapshot: GameState = JSON.parse(JSON.stringify(gameState));
    if (isResetRounds) {
      startNewGame(newPlayers, newConfig);
      setIsGameOverModalDismissed(false);
      showUndoToast(
        TRANSLATIONS[language].setup.confirmResetTitle || 'Match Reset',
        previousSnapshot
      );
    } else {
      updateGameSetup(newPlayers, newConfig);
      showUndoToast(
        TRANSLATIONS[language].setup.setupUpdatedSuccess,
        previousSnapshot
      );
    }
  };

  const handleResetData = () => {
    const previousSnapshot: GameState = JSON.parse(JSON.stringify(gameState));
    resetAllData();
    setIsScoreModalOpen(false);
    setEditingRoundNumber(null);
    setIsGameOverModalDismissed(false);
    showUndoToast(
      TRANSLATIONS[language].settings.resetDataSuccess,
      previousSnapshot
    );
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
        playerStats={playerStats}
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
