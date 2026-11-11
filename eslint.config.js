import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default tseslint.config(
  {
    ignores: ['dist', 'node_modules', '*.config.js', '*.config.ts', 'dist/**'],
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-hooks/set-state-in-effect': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      // Cross-folder imports must use the `@/` alias (`@/utils/scoring`).
      // Same-folder imports keep `./`.
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              regex: '^\\.\\./',
              message:
                "Use the '@/' alias for imports outside the current folder (e.g. '@/utils/scoring').",
            },
          ],
        },
      ],
    },
  },
  {
    // Tests in `__tests__/` may import the module under test from the parent
    // folder with a single `../`; anything further up must use `@/`.
    files: ['**/__tests__/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              regex: '^\\.\\./\\.\\./',
              message:
                "Use the '@/' alias for imports more than one folder up (e.g. '@/types/game').",
            },
          ],
        },
      ],
    },
  }
);
