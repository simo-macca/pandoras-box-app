import React, { useState, useRef } from 'react';
import {
  Download,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Trash2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Language } from '@/types/game';
import { TRANSLATIONS } from '@/data/translations';
import { APP_VERSION } from '@/data/appInfo';
import { soundEffects } from '@/utils/sound';

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
    <div className="space-y-7">
      <section>
        <h3 className="eyebrow mb-3">{t.settings.dataManagement}</h3>
        <div className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2">
          <button
            type="button"
            onClick={handleExport}
            className="btn btn-secondary h-11 justify-start"
          >
            <Download className="h-4 w-4 text-neutral-500" />
            <span className="truncate">{t.settings.exportBackup}</span>
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="btn btn-secondary h-11 justify-start"
          >
            <Upload className="h-4 w-4 text-neutral-500" />
            <span className="truncate">{t.settings.importBackup}</span>
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
          <div
            role="status"
            className="callout mt-3 flex items-center gap-2 border-emerald-500/30 bg-emerald-500/10 font-semibold text-emerald-700 dark:text-emerald-300"
          >
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{t.settings.importSuccess}</span>
          </div>
        )}
        {importStatus === 'error' && (
          <div
            role="alert"
            className="callout callout-danger mt-3 flex items-center gap-2 font-semibold"
          >
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <span>{t.settings.importError}</span>
          </div>
        )}
      </section>

      <section>
        {!showResetConfirm ? (
          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            className="btn btn-danger-soft btn-block h-11"
          >
            <Trash2 className="h-4 w-4" />
            <span>{t.settings.resetGame}</span>
          </button>
        ) : (
          <div className="callout callout-danger space-y-3">
            <p className="text-center font-semibold">
              {t.settings.confirmResetDataMessage}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="btn btn-secondary"
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
                className="btn btn-danger"
              >
                {t.setup.confirm}
              </button>
            </div>
          </div>
        )}
      </section>

      <p className="text-center text-xs text-neutral-400">
        {t.settings.version.replace('{version}', APP_VERSION)}
      </p>
    </div>
  );
};
