import { useRef, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { RotateCcw } from 'lucide-react';
import { GameState, Language } from '../types/game';
import { TRANSLATIONS } from '../data/translations';

interface UseUndoToastOptions {
  language: Language;
  onRestoreState: (state: GameState) => void;
  onAfterUndo?: (restoredState: GameState) => void;
}

export function useUndoToast({
  language,
  onRestoreState,
  onAfterUndo,
}: UseUndoToastOptions) {
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
                  onRestoreState(restoredState);
                  onAfterUndo?.(restoredState);
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
    [language, onRestoreState, onAfterUndo]
  );

  return { showUndoToast };
}
