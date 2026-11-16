import React, { useId } from 'react';
import { X } from 'lucide-react';

const SIZE_CLASSES = {
  sm: 'sm:max-w-md',
  md: 'sm:max-w-lg',
  lg: 'sm:max-w-2xl',
  xl: 'sm:max-w-4xl',
} as const;

interface ModalProps {
  onClose: () => void;
  /** Accessible label for the close button. */
  closeLabel: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Leading icon shown in a tinted tile next to the title. */
  icon?: React.ReactNode;
  /** Tailwind classes for the icon tile (background + text colour). */
  iconClassName?: string;
  /** Extra content rendered under the header (tabs, player picker, ...). */
  headerExtra?: React.ReactNode;
  footer?: React.ReactNode;
  size?: keyof typeof SIZE_CLASSES;
  /** Replaces the default header entirely (e.g. the game-over hero). */
  customHeader?: React.ReactNode;
  bodyClassName?: string;
  panelClassName?: string;
  children: React.ReactNode;
}

/**
 * Shared dialog shell: a bottom sheet on phones, a centred card from `sm` up.
 * Callers stay controlled (render it only while open) and call
 * `useModalA11y` for Escape handling and scroll locking.
 */
export const Modal: React.FC<ModalProps> = ({
  onClose,
  closeLabel,
  title,
  subtitle,
  icon,
  iconClassName = 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
  headerExtra,
  footer,
  size = 'md',
  customHeader,
  bodyClassName = '',
  panelClassName = '',
  children,
}) => {
  const titleId = useId();

  return (
    <div className="modal-backdrop">
      <div
        className={`modal-panel ${SIZE_CLASSES[size]} ${panelClassName}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="sheet-handle" aria-hidden="true" />

        {customHeader ? (
          <div id={titleId} className="contents">
            {customHeader}
          </div>
        ) : (
          <div className="modal-header">
            <div className="flex min-w-0 items-center gap-3">
              {icon && (
                <div className={`icon-tile ${iconClassName}`}>{icon}</div>
              )}
              <div className="min-w-0">
                <h2 id={titleId} className="modal-title truncate">
                  {title}
                </h2>
                {subtitle && (
                  <div className="mt-0.5 truncate text-xs font-medium text-neutral-500 dark:text-neutral-400">
                    {subtitle}
                  </div>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={closeLabel}
              className="btn-icon btn-icon-sm -mr-1"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        {headerExtra}

        <div className={`modal-body ${bodyClassName}`}>{children}</div>

        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
};
