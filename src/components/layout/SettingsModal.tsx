import React, { useState, useEffect } from 'react';
import { Scale, Settings as SettingsIcon } from 'lucide-react';
import { Language, ThemeMode } from '@/types/game';
import { TRANSLATIONS } from '@/data/translations';
import { soundEffects } from '@/utils/sound';
import { SettingsGeneralSection } from './settings/SettingsGeneralSection';
import { SettingsBackupSection } from './settings/SettingsBackupSection';
import { SettingsLegalSection } from './settings/SettingsLegalSection';
import { useModalA11y } from '@/hooks/useModalA11y';
import { Modal } from '@/components/common/Modal';

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
  const [hapticsEnabled, setHapticsEnabled] = useState(
    soundEffects.hapticEnabled
  );

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  useModalA11y(isOpen, onClose);

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

  const tabs = [
    { id: 'settings' as const, label: t.settings.title, icon: SettingsIcon },
    { id: 'legal' as const, label: t.settings.aboutLegalTitle, icon: Scale },
  ];

  return (
    <Modal
      onClose={onClose}
      closeLabel={t.common.close}
      title={t.settings.title}
      icon={<SettingsIcon className="h-5 w-5" />}
      iconClassName="bg-neutral-100 text-neutral-700 dark:bg-white/[0.08] dark:text-neutral-200"
      size="md"
      headerExtra={
        <div className="shrink-0 border-b border-neutral-200/80 px-5 py-3 dark:border-white/[0.07]">
          <div className="segmented grid w-full grid-cols-2">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  soundEffects.playClick();
                  setActiveTab(id);
                }}
                aria-pressed={activeTab === id}
                className={`segmented-item ${
                  activeTab === id ? 'segmented-item-active' : ''
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="truncate">{label}</span>
              </button>
            ))}
          </div>
        </div>
      }
      footer={
        <button type="button" onClick={onClose} className="btn btn-secondary">
          {t.common.close}
        </button>
      }
      bodyClassName="space-y-7"
    >
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
    </Modal>
  );
};
