import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAppModals } from '../useAppModals';

describe('useAppModals hook', () => {
  it('initializes with all modals closed', () => {
    const { result } = renderHook(() => useAppModals());

    expect(result.current.isScoreModalOpen).toBe(false);
    expect(result.current.editingRoundNumber).toBeNull();
    expect(result.current.isSetupModalOpen).toBe(false);
    expect(result.current.isSettingsModalOpen).toBe(false);
    expect(result.current.settingsInitialTab).toBe('settings');
    expect(result.current.isGameOverModalDismissed).toBe(false);
  });

  it('controls setup modal visibility', () => {
    const { result } = renderHook(() => useAppModals());

    act(() => {
      result.current.openSetup();
    });
    expect(result.current.isSetupModalOpen).toBe(true);

    act(() => {
      result.current.closeSetup();
    });
    expect(result.current.isSetupModalOpen).toBe(false);
  });

  it('controls settings modal visibility and initial tab', () => {
    const { result } = renderHook(() => useAppModals());

    act(() => {
      result.current.openSettings('legal');
    });
    expect(result.current.isSettingsModalOpen).toBe(true);
    expect(result.current.settingsInitialTab).toBe('legal');

    act(() => {
      result.current.closeSettings();
    });
    expect(result.current.isSettingsModalOpen).toBe(false);
  });

  it('handles score modal and edit round states', () => {
    const { result } = renderHook(() => useAppModals());

    // Normal game in progress
    act(() => {
      result.current.openScoreModal(false, false);
    });
    expect(result.current.isScoreModalOpen).toBe(true);
    expect(result.current.editingRoundNumber).toBeNull();

    act(() => {
      result.current.closeScoreModal();
    });
    expect(result.current.isScoreModalOpen).toBe(false);

    // Open round for editing
    act(() => {
      result.current.openEditRound(3);
    });
    expect(result.current.isScoreModalOpen).toBe(true);
    expect(result.current.editingRoundNumber).toBe(3);

    act(() => {
      result.current.closeScoreModal();
    });
    expect(result.current.isScoreModalOpen).toBe(false);
    expect(result.current.editingRoundNumber).toBeNull();
  });

  it('prevents opening score modal if game is over and uncontinued, reopening game over modal instead', () => {
    const { result } = renderHook(() => useAppModals());

    act(() => {
      result.current.setIsGameOverModalDismissed(true);
    });
    expect(result.current.isGameOverModalDismissed).toBe(true);

    // If game is over and not continued:
    act(() => {
      result.current.openScoreModal(true, false);
    });
    expect(result.current.isScoreModalOpen).toBe(false);
    expect(result.current.isGameOverModalDismissed).toBe(false);

    // If game is over but continued:
    act(() => {
      result.current.openScoreModal(true, true);
    });
    expect(result.current.isScoreModalOpen).toBe(true);
  });
});
