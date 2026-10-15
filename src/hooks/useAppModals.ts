import { useState, useCallback } from 'react';

export function useAppModals() {
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
  const [isSeppukuModalOpen, setIsSeppukuModalOpen] = useState(false);

  const openScoreModal = useCallback(
    (isGameOver: boolean, isContinued: boolean) => {
      if (isGameOver && !isContinued) {
        setIsGameOverModalDismissed(false);
        return;
      }
      setEditingRoundNumber(null);
      setIsScoreModalOpen(true);
    },
    []
  );

  const openEditRound = useCallback((roundNumber: number) => {
    setEditingRoundNumber(roundNumber);
    setIsScoreModalOpen(true);
  }, []);

  const closeScoreModal = useCallback(() => {
    setIsScoreModalOpen(false);
    setEditingRoundNumber(null);
  }, []);

  const openSettings = useCallback((tab: 'settings' | 'legal' = 'settings') => {
    setSettingsInitialTab(tab);
    setIsSettingsModalOpen(true);
  }, []);

  const closeSettings = useCallback(() => {
    setIsSettingsModalOpen(false);
  }, []);

  const openSetup = useCallback(() => {
    setIsSetupModalOpen(true);
  }, []);

  const closeSetup = useCallback(() => {
    setIsSetupModalOpen(false);
  }, []);

  const [editingSeppukuRoundId, setEditingSeppukuRoundId] = useState<
    string | null
  >(null);

  const openSeppukuModal = useCallback((roundId?: string) => {
    setEditingSeppukuRoundId(roundId || null);
    setIsSeppukuModalOpen(true);
  }, []);

  const closeSeppukuModal = useCallback(() => {
    setIsSeppukuModalOpen(false);
    setEditingSeppukuRoundId(null);
  }, []);

  return {
    isScoreModalOpen,
    editingRoundNumber,
    isSetupModalOpen,
    isSettingsModalOpen,
    isSeppukuModalOpen,
    editingSeppukuRoundId,
    settingsInitialTab,
    isGameOverModalDismissed,
    setIsGameOverModalDismissed,
    openScoreModal,
    openEditRound,
    closeScoreModal,
    openSettings,
    closeSettings,
    openSetup,
    closeSetup,
    openSeppukuModal,
    closeSeppukuModal,
  };
}
