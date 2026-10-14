import React, { useState, useEffect } from 'react';
import { X, Scale, Settings as SettingsIcon } from 'lucide-react';
import { Language, ThemeMode } from '../../types/game';
import { TRANSLATIONS } from '../../data/translations';
import { soundEffects } from '../../utils/sound';
import { SettingsGeneralSection } from './settings/SettingsGeneralSection';
import { SettingsBackupSection } from './settings/SettingsBackupSection';
import { SettingsLegalSection } from './settings/SettingsLegalSection';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  onExport: () => string;
  onImport: (json: string) => boolean;
  onResetMatch?: () => void;
  onResetData?: () => void;
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
  onResetData,
  initialTab = 'settings',
}) => {
  const [activeTab, setActiveTab] = useState<'settings' | 'legal'>(initialTab);
  const [soundEnabled, setSoundEnabled] = useState(soundEffects.enabled);
  const [hapticsEnabled, setHapticsEnabled] = useState(soundEffects.hapticEnabled);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const t = TRANSLATIONS[language];

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundEffects.enabled = next;
    if (next) soundEffects.playClick();
  };

  const handleToggleHaptics = () => {
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
          <div className="flex items-center gap-1 rounded-2xl bg-neutral-200/60 p-1 sm:gap-1.5 dark:bg-neutral-800/80">
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
            className="shrink-0 rounded-xl p-1.5 text-neutral-400 transition-colors hover:bg-neutral-200 hover:text-neutral-700 sm:p-2 dark:hover:bg-neutral-800 dark:hover:text-white"
          >
            <X className="h-5 w-5 shrink-0" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="min-h-0 flex-1 space-y-6 overflow-y-auto px-4 py-3">
          {activeTab === 'settings' ? (
            <>
              <SettingsGeneralSection
                language={language}
                onLanguageChange={onLanguageChange}
                theme={theme}
                onThemeChange={onThemeChange}
                soundEnabled={soundEnabled}
                onToggleSound={handleToggleSound}
                hapticsEnabled={hapticsEnabled}
                onToggleHaptics={handleToggleHaptics}
              />
              <SettingsBackupSection
                language={language}
                onExport={onExport}
                onImport={onImport}
                onResetMatch={onResetMatch}
                onResetData={onResetData}
                onClose={onClose}
              />
            </>
          ) : (
            <SettingsLegalSection language={language} />
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
