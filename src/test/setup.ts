import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Runs a cleanup after each test case (e.g. clearing jsdom body and localStorage)
afterEach(() => {
  cleanup();
  localStorage.clear();
});

// Mock window.matchMedia for theme detection and responsive hooks
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock canvas-confetti to prevent canvas errors in jsdom
vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));
