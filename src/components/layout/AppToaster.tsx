import React from 'react';
import { Toaster } from 'react-hot-toast';

/** Global toast container (undo prompts, confirmations, errors). */
export const AppToaster: React.FC = () => (
  <Toaster
    position="top-right"
    containerStyle={{ top: 16, right: 16, zIndex: 99999 }}
    toastOptions={{
      duration: 4000,
      style: {
        borderRadius: '14px',
        background: '#1f2937',
        color: '#fff',
        fontSize: '13px',
        fontWeight: '600',
        boxShadow:
          '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3)',
      },
      error: {
        style: { background: '#ef4444', color: '#ffffff' },
        iconTheme: { primary: '#ffffff', secondary: '#ef4444' },
      },
    }}
  />
);
