import React from 'react';
import { Toaster } from 'react-hot-toast';

/** Global toast container (undo prompts, confirmations, errors). */
export const AppToaster: React.FC = () => (
  <Toaster
    position="top-center"
    containerStyle={{
      top: 'calc(env(safe-area-inset-top) + 72px)',
      zIndex: 99999,
    }}
    toastOptions={{
      duration: 4000,
      style: {
        borderRadius: '14px',
        background: '#141826',
        color: '#f8f9fb',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '10px 14px',
        fontSize: '13px',
        fontWeight: '600',
        boxShadow: '0 12px 32px -8px rgba(11, 14, 23, 0.45)',
      },
      success: {
        iconTheme: { primary: '#f59e0b', secondary: '#141826' },
      },
      error: {
        style: { background: '#be123c', color: '#ffffff' },
        iconTheme: { primary: '#ffffff', secondary: '#be123c' },
      },
    }}
  />
);
