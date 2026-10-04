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
  ShieldCheck,
  Scale,
  ExternalLink,
  Info,
  Settings as SettingsIcon
} from 'lucide-react';
import { Language, ThemeMode } from '../../types/game';
import { TRANSLATIONS } from '../../data/translations';
import { soundEffects } from '../../utils/sound';

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
  const [hapticsEnabled, setHapticsEnabled] = useState(soundEffects.hapticEnabled);
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
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
    reader.onload = event => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header with Title and Close Button */}
        <div className="flex items-center justify-between px-6 pt-4 pb-3 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60">
          {/* Tabs Selector */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-200/60 dark:bg-neutral-800/80 rounded-2xl">
            <button
              type="button"
              onClick={() => {
                soundEffects.playClick();
                setActiveTab('settings');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'settings'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <SettingsIcon className="w-3.5 h-3.5" />
              <span>{t.settings.title}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundEffects.playClick();
                setActiveTab('legal');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'legal'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Scale className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.settings.aboutLegalTitle}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {activeTab === 'settings' ? (
            <>
              {/* Appearance */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
                  {t.settings.appearance}
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => onThemeChange('system')}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
                      theme === 'system'
                        ? 'border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold'
                        : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 text-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    <Laptop className="w-5 h-5 mb-1" />
                    <span className="text-xs">{t.settings.themeSystem}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onThemeChange('light')}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
                      theme === 'light'
                        ? 'border-amber-500 bg-amber-500/10 text-amber-600 font-bold'
                        : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 text-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    <Sun className="w-5 h-5 mb-1" />
                    <span className="text-xs">{t.settings.themeLight}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onThemeChange('dark')}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
                      theme === 'dark'
                        ? 'border-purple-500 bg-purple-500/10 text-purple-400 font-bold'
                        : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 text-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    <Moon className="w-5 h-5 mb-1" />
                    <span className="text-xs">{t.settings.themeDark}</span>
                  </button>
                </div>
              </div>

              {/* Language */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
                  {t.settings.language}
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { code: 'en' as Language, label: 'English', flag: '🇬🇧' },
                    { code: 'de' as Language, label: 'Deutsch', flag: '🇩🇪' },
                    { code: 'it' as Language, label: 'Italiano', flag: '🇮🇹' },
                    { code: 'fr' as Language, label: 'Français', flag: '🇫🇷' },
                  ].map(item => (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() => onLanguageChange(item.code)}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-2xl border transition-all ${
                        language === item.code
                          ? 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold shadow-sm'
                          : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 text-neutral-700 dark:text-neutral-300'
                      }`}
                    >
                      <span className="text-lg mb-1">{item.flag}</span>
                      <span className="text-xs">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Audio & Haptic Feedback */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
                  {t.settings.soundAndHaptics}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={toggleSound}
                    className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${
                      soundEnabled
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'border-neutral-200 dark:border-neutral-800 text-neutral-500'
                    }`}
                  >
                    {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                    <div className="text-left">
                      <div className="text-xs font-bold">{t.settings.soundEnabled}</div>
                      <div className="text-[10px] opacity-75">{soundEnabled ? 'ON' : 'OFF'}</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={toggleHaptics}
                    className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${
                      hapticsEnabled
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'border-neutral-200 dark:border-neutral-800 text-neutral-500'
                    }`}
                  >
                    <Smartphone className="w-5 h-5" />
                    <div className="text-left">
                      <div className="text-xs font-bold">{t.settings.hapticsEnabled}</div>
                      <div className="text-[10px] opacity-75">{hapticsEnabled ? 'ON' : 'OFF'}</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Backup & Restore */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
                  {t.settings.dataManagement}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={handleExport}
                    className="flex items-center justify-center gap-2 p-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-neutral-100 dark:bg-neutral-800/50 text-neutral-800 dark:text-neutral-200 font-semibold text-xs transition-colors"
                  >
                    <Download className="w-4 h-4 text-blue-500" />
                    <span>{t.settings.exportBackup}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center justify-center gap-2 p-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-neutral-100 dark:bg-neutral-800/50 text-neutral-800 dark:text-neutral-200 font-semibold text-xs transition-colors"
                  >
                    <Upload className="w-4 h-4 text-emerald-500" />
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
                  <div className="mt-2 flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{t.settings.importSuccess}</span>
                  </div>
                )}
                {importStatus === 'error' && (
                  <div className="mt-2 flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-semibold">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{t.settings.importError}</span>
                  </div>
                )}
              </div>

              {/* Reset Game Section */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
                {!showResetConfirm ? (
                  <button
                    type="button"
                    onClick={() => setShowResetConfirm(true)}
                    className="w-full flex items-center justify-center gap-2 p-3 rounded-2xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 font-bold text-xs transition-colors"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    <span>{t.settings.resetGame}</span>
                  </button>
                ) : (
                  <div className="p-4 rounded-2xl border border-red-500/40 bg-red-500/10 space-y-3">
                    <p className="text-xs text-red-600 dark:text-red-400 font-semibold text-center">
                      {t.setup.confirmResetMessage}
                    </p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setShowResetConfirm(false)}
                        className="flex-1 py-2 px-3 rounded-xl bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-semibold"
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
                        className="flex-1 py-2 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold"
                      >
                        {t.setup.confirm}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Legal Link Card */}
              <div className="p-3.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                  <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="truncate">{t.settings.disclaimerShort}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playClick();
                    setActiveTab('legal');
                  }}
                  className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline shrink-0 ml-2"
                >
                  {t.settings.disclaimerTitle}
                </button>
              </div>

              {/* Footer note */}
              <div className="text-center text-[11px] text-neutral-400 pt-1 space-y-0.5">
                <p className="font-semibold text-neutral-500 dark:text-neutral-400">{t.settings.version}</p>
                <p>{t.settings.copyright}</p>
              </div>
            </>
          ) : (
            /* Dedicated About & Legal / Disclaimer Tab */
            <div className="space-y-5 animate-fade-in">
              {/* Header Badge */}
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-700 dark:text-amber-300">
                <ShieldCheck className="w-5 h-5 shrink-0 text-amber-500" />
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider">
                    {t.settings.unofficialNotice}
                  </h4>
                  <p className="text-[11px] opacity-80 mt-0.5">
                    {t.settings.disclaimerShort}
                  </p>
                </div>
              </div>

              {/* Full Legal Disclaimer Card */}
              <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40 space-y-2">
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-purple-500 shrink-0" />
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
                    {t.settings.disclaimerTitle}
                  </h4>
                </div>
                <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
                  {t.settings.fullDisclaimer}
                </p>
              </div>

              {/* Publisher Credit Card */}
              <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-neutral-900 dark:text-white">
                      Rulefactory GmbH
                    </h5>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                      Original creator and publisher of Frantic and Pandora's Box.
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300">
                    Publisher
                  </span>
                </div>

                <a
                  href="https://rulefactory.ch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/25 text-xs font-bold transition-all shadow-sm"
                >
                  <span>{t.settings.visitRulefactory}</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              </div>

              {/* App Info Card */}
              <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40 space-y-2">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-500 shrink-0" />
                  <h5 className="text-xs font-bold text-neutral-900 dark:text-white">
                    {t.settings.version}
                  </h5>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  Open-source community project licensed under the MIT License. Created for players to enhance physical board game sessions with automated scoring and rule references.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
