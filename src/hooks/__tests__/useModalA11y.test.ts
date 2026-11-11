import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import { useModalA11y } from '../useModalA11y';

describe('useModalA11y', () => {
  it('calls onClose on Escape only while open', () => {
    const onClose = vi.fn();
    const { rerender } = renderHook(({ open }) => useModalA11y(open, onClose), {
      initialProps: { open: false },
    });
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).not.toHaveBeenCalled();

    rerender({ open: true });
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('locks and restores body scrolling', () => {
    const { unmount } = renderHook(() => useModalA11y(true, () => {}));
    expect(document.body.style.overflow).toBe('hidden');
    unmount();
    expect(document.body.style.overflow).toBe('');
  });
});
