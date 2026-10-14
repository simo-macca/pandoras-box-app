import React, { useState, useRef } from 'react';
import { Download, Upload, CheckCircle2, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import { Language } from '../../../types/game';
import { TRANSLATIONS } from '../../../data/translations';
import { soundEffects } from '../../../utils/sound';

interface SettingsBackupSectionProps {
  language: Language;
  onExport: () => string;
  onImport: (json: string) => boolean;
  onResetMatch?: () => void;
  onResetData?: () => void;
  onClose: () => void;
}

export const SettingsBackupSection: React.FC<SettingsBackupSectionProps> = ({
  language,
  onExport,
  onImport,
  onResetMatch,
  onResetData,
  onClose,
}) => {
  const t = TRANSLATIONS[language];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importStatus, setImportStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleExport = () => {
    const json = onExport();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `frantic_match_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    soundEffects.playClick();
    toast.success(t.settings.exportSuccess);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = onImport(content);
        if (success) {
          setImportStatus('success');
          toast.success(t.settings.importSuccess);
          setTimeout(() => {
            setImportStatus('idle');
            onClose();
          }, 1500);
        } else {
          setImportStatus('error');
          toast.error(t.settings.importError);
          setTimeout(() => setImportStatus('idle'), 3000);
        }
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {/* Backup & Restore */}
      <div>
        <h3 className="mb-3 text-sm font-semibold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
          {t.settings.dataManagement}
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleExport}
            className="flex items-center justify-center gap-2 rounded-2xl border border-neutral-200 bg-neutral-100 p-3 text-xs font-semibold text-neutral-800 transition-colors hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-800/50 dark:text-neutral-200 dark:hover:border-neutral-700"
          >
            <Download className="h-4 w-4 shrink-0 text-blue-500" />
            <span>{t.settings.exportBackup}</span>
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center gap-2 rounded-2xl border border-neutral-200 bg-neutral-100 p-3 text-xs font-semibold text-neutral-800 transition-colors hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-800/50 dark:text-neutral-200 dark:hover:border-neutral-700"
          >
            <Upload className="h-4 w-4 shrink-0 text-emerald-500" />
            <span>{t.settings.importBackup}</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {importStatus === 'success' && (
          <div className="mt-2 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{t.settings.importSuccess}</span>
          </div>
        )}
        {importStatus === 'error' && (
          <div className="mt-2 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs font-semibold text-red-600 dark:text-red-400">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <span>{t.settings.importError}</span>
          </div>
        )}
      </div>

      {/* Reset Game Section */}
      <div className="border-t border-neutral-200 pt-4 dark:border-neutral-800">
        {!showResetConfirm ? (
          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-xs font-bold text-red-600 transition-colors hover:bg-red-500/20 dark:text-red-400"
          >
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <span>{t.settings.resetGame}</span>
          </button>
        ) : (
          <div className="space-y-3 rounded-2xl border border-red-500/40 bg-red-500/10 p-4">
            <p className="text-center text-xs font-semibold text-red-600 dark:text-red-400">
              {t.settings.confirmResetDataMessage ||
                t.setup.confirmResetMessage}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 rounded-xl bg-neutral-200 px-3 py-2 text-xs font-semibold text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
              >
                {t.setup.cancel}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (onResetData) {
                    onResetData();
                  } else if (onResetMatch) {
                    onResetMatch();
                  }
                  setShowResetConfirm(false);
                  onClose();
                }}
                className="flex-1 rounded-xl bg-red-600 px-3 py-2 text-xs font-bold text-white hover:bg-red-700"
              >
                {t.setup.confirm}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Version and Copyright notes */}
      <div className="space-y-0.5 pt-1 text-center text-[11px] text-neutral-400">
        <p className="font-semibold text-neutral-500 dark:text-neutral-400">
          {t.settings.version}
        </p>
        <p>{t.settings.copyright}</p>
      </div>
    </div>
  );
};
