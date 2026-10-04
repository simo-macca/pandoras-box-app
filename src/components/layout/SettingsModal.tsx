import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Moon,
  Sun,
  Laptop,
  Download,
  Upload,
  Volume2,
  VolumeX,
  Smartphone,
  AlertTriangle,
  CheckCircle2,
  Scale,
  ExternalLink,
  Info,
  Settings as SettingsIcon,
} from 'lucide-react';
import { Language, ThemeMode } from '../../types/game';
import { TRANSLATIONS } from '../../data/translations';
import { soundEffects } from '../../utils/sound';
import { LanguageSelector } from './LanguageSelector';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  onExport: () => string;
  onImport: (json: string) => boolean;
  onResetMatch: () => void;
  initialTab?: 'settings' | 'legal';
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  language,
  onLanguageChange,
  theme,
  onThemeChange,
  onExport,
  onImport,
  onResetMatch,
  initialTab = 'settings',
}) => {
  const [activeTab, setActiveTab] = useState<'settings' | 'legal'>(initialTab);
  const [soundEnabled, setSoundEnabled] = useState(soundEffects.enabled);
  const [hapticsEnabled, setHapticsEnabled] = useState(
    soundEffects.hapticEnabled
  );
  const [importStatus, setImportStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setShowResetConfirm(false);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const t = TRANSLATIONS[language];

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
          setTimeout(() => {
            setImportStatus('idle');
            onClose();
          }, 1500);
        } else {
          setImportStatus('error');
          setTimeout(() => setImportStatus('idle'), 3000);
        }
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundEffects.enabled = next;
    if (next) soundEffects.playClick();
  };

  const toggleHaptics = () => {
    const next = !hapticsEnabled;
    setHapticsEnabled(next);
    soundEffects.hapticEnabled = next;
    if (next) soundEffects.triggerHaptic(50);
  };

  return (
    <div className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-2 backdrop-blur-sm sm:p-4">
      <div className="relative flex max-h-[90dvh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-800 dark:bg-neutral-900">
        {/* Header with Title and Close Button */}
        <div className="flex shrink-0 items-center justify-between gap-2 border-b border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-900/60">
          {/* Tabs Selector */}
          <div className="flex items-center gap-1 rounded-2xl bg-neutral-200/60 p-1 dark:bg-neutral-800/80 sm:gap-1.5">
            <button
              type="button"
              onClick={() => {
                soundEffects.playClick();
                setActiveTab('settings');
              }}
              className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-bold transition-all sm:px-3 ${
                activeTab === 'settings'
                  ? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-700 dark:text-white'
                  : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              <SettingsIcon className="h-3.5 w-3.5 shrink-0" />
              <span>{t.settings.title}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundEffects.playClick();
                setActiveTab('legal');
              }}
              className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-bold transition-all sm:px-3 ${
                activeTab === 'legal'
                  ? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-700 dark:text-white'
                  : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              <Scale className="h-3.5 w-3.5 shrink-0 text-amber-500" />
              <span>{t.settings.aboutLegalTitle}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 rounded-xl p-1.5 text-neutral-400 transition-colors hover:bg-neutral-200 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-white sm:p-2"
          >
            <X className="h-5 w-5 shrink-0" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-3">
          {activeTab === 'settings' ? (
            <>
              {/* Appearance */}
              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 sm:text-sm">
                  {t.settings.appearance}
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => onThemeChange('system')}
                    className={`flex flex-col items-center justify-center rounded-2xl border p-2.5 transition-all sm:p-3 ${
                      theme === 'system'
                        ? 'border-blue-500 bg-blue-500/10 font-bold text-blue-600 dark:text-blue-400'
                        : 'border-neutral-200 text-neutral-700 hover:border-neutral-300 dark:border-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-700'
                    }`}
                  >
                    <Laptop className="mb-1 h-5 w-5 shrink-0" />
                    <span className="text-xs">{t.settings.themeSystem}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onThemeChange('light')}
                    className={`flex flex-col items-center justify-center rounded-2xl border p-2.5 transition-all sm:p-3 ${
                      theme === 'light'
                        ? 'border-amber-500 bg-amber-500/10 font-bold text-amber-600'
                        : 'border-neutral-200 text-neutral-700 hover:border-neutral-300 dark:border-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-700'
                    }`}
                  >
                    <Sun className="mb-1 h-5 w-5 shrink-0" />
                    <span className="text-xs">{t.settings.themeLight}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onThemeChange('dark')}
                    className={`flex flex-col items-center justify-center rounded-2xl border p-2.5 transition-all sm:p-3 ${
                      theme === 'dark'
                        ? 'border-purple-500 bg-purple-500/10 font-bold text-purple-400'
                        : 'border-neutral-200 text-neutral-700 hover:border-neutral-300 dark:border-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-700'
                    }`}
                  >
                    <Moon className="mb-1 h-5 w-5 shrink-0" />
                    <span className="text-xs">{t.settings.themeDark}</span>
                  </button>
                </div>
              </div>

              {/* Language */}
              <div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 sm:text-sm">
                  {t.settings.language}
                </h3>
                <LanguageSelector
                  currentLanguage={language}
                  onSelectLanguage={onLanguageChange}
                />
              </div>

              {/* Audio & Haptic Feedback */}
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  {t.settings.soundAndHaptics}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={toggleSound}
                    className={`flex items-center gap-3 rounded-2xl border p-3 transition-all ${
                      soundEnabled
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'border-neutral-200 text-neutral-500 dark:border-neutral-800'
                    }`}
                  >
                    {soundEnabled ? (
                      <Volume2 className="h-5 w-5 shrink-0" />
                    ) : (
                      <VolumeX className="h-5 w-5 shrink-0" />
                    )}
                    <div className="text-left">
                      <div className="text-xs font-bold">
                        {t.settings.soundEnabled}
                      </div>
                      <div className="text-[10px] opacity-75">
                        {soundEnabled ? 'ON' : 'OFF'}
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={toggleHaptics}
                    className={`flex items-center gap-3 rounded-2xl border p-3 transition-all ${
                      hapticsEnabled
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'border-neutral-200 text-neutral-500 dark:border-neutral-800'
                    }`}
                  >
                    <Smartphone className="h-5 w-5 shrink-0" />
                    <div className="text-left">
                      <div className="text-xs font-bold">
                        {t.settings.hapticsEnabled}
                      </div>
                      <div className="text-[10px] opacity-75">
                        {hapticsEnabled ? 'ON' : 'OFF'}
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Backup & Restore */}
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
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
                      {t.setup.confirmResetMessage}
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
                          onResetMatch();
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

              {/* Footer note */}
              <div className="space-y-0.5 pt-1 text-center text-[11px] text-neutral-400">
                <p className="font-semibold text-neutral-500 dark:text-neutral-400">
                  {t.settings.version}
                </p>
                <p>{t.settings.copyright}</p>
              </div>
            </>
          ) : (
            /* Dedicated About & Legal / Disclaimer Tab */
            <div className="animate-fade-in space-y-4">
              {/* Full Legal Disclaimer Card */}
              <div className="space-y-2 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-800/40">
                <div className="flex items-center gap-2">
                  <Scale className="h-4 w-4 shrink-0 text-purple-500" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                    {t.settings.disclaimerTitle}
                  </h4>
                </div>
                <p className="text-xs font-normal leading-relaxed text-neutral-700 dark:text-neutral-300">
                  {t.settings.fullDisclaimer}
                </p>
              </div>

              {/* Publisher Credit Card */}
              <div className="space-y-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-800/40">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-neutral-900 dark:text-white">
                      Rulefactory GmbH
                    </h5>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                      Original creator and publisher of Frantic and Pandora's
                      Box.
                    </p>
                  </div>
                  <span className="rounded-full bg-neutral-200 px-2 py-0.5 text-[10px] font-bold text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300">
                    Publisher
                  </span>
                </div>

                <a
                  href="https://rulefactory.ch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-purple-500/25 bg-purple-500/10 px-4 py-2.5 text-xs font-bold text-purple-600 shadow-sm transition-all hover:bg-purple-500/20 dark:text-purple-400"
                >
                  <span>{t.settings.visitRulefactory}</span>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-70" />
                </a>
              </div>

              {/* App Info Card */}
              <div className="space-y-2 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-800/40">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 shrink-0 text-blue-500" />
                  <h5 className="text-xs font-bold text-neutral-900 dark:text-white">
                    {t.settings.version}
                  </h5>
                </div>
                <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
                  Open-source community project licensed under the MIT License.
                  Created for players to enhance physical board game sessions
                  with automated scoring and rule references.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer / Actions */}
        <div className="flex shrink-0 items-center justify-end gap-2 border-t border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-900/50">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-neutral-200 px-4 py-2 text-xs font-bold text-neutral-800 transition-colors hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
          >
            {t.setup.cancel || 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
