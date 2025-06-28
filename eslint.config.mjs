import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import reactRefreshPlugin from 'eslint-plugin-react-refresh'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import importPlugin from 'eslint-plugin-import'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import unusedImportsPlugin from 'eslint-plugin-unused-imports'
import perfectionistPlugin from 'eslint-plugin-perfectionist'
import globals from 'globals'

const eslintConfig = [
  {
    ignores: [
      'dist',
      'node_modules',
      'build',
      '.next',
      'src/components/ui/**',
      'vite.config.ts',
      'src/lib/utils.ts',
      'commitlint.config.js',
      'src/app/layout.tsx',
    ],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'react-refresh': reactRefreshPlugin,
      prettier: eslintPluginPrettier,
      import: importPlugin,
      'jsx-a11y': jsxA11yPlugin,
      'unused-imports': unusedImportsPlugin,
      '@typescript-eslint': tseslint.plugin,
      perfectionist: perfectionistPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
        node: true,
      },
    },
    rules: {
      // =========================================
      // 1. General JavaScript/TypeScript Rules
      // =========================================
      'no-alert': 'error',
      'no-console': 'warn',
      'no-plusplus': 0,
      camelcase: 'error',
      'no-param-reassign': 0,
      'no-underscore-dangle': 'off',
      'no-promise-executor-return': 0,
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      'no-restricted-imports': 'off',
      '@typescript-eslint/no-restricted-imports': 'error',
      'import/prefer-default-export': 0,
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'no-restricted-imports': [
        'error',
        {
          patterns: ['./*', '../*'],
        },
      ],
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'perfectionist/sort-named-imports': [
        1,
        {
          order: 'asc',
          type: 'alphabetical',
        },
      ],
      'perfectionist/sort-named-exports': [
        1,
        {
          order: 'asc',
          type: 'alphabetical',
        },
      ],
      'perfectionist/sort-exports': [
        1,
        {
          order: 'asc',
          type: 'alphabetical',
        },
      ],
      'perfectionist/sort-imports': [
        'error',
        {
          order: 'asc',
          type: 'alphabetical',
          newlinesBetween: 'always',
          internalPattern: ['^@/.+'],
          groups: [
            ['builtin', 'external'],
            'internal',
            ['parent', 'sibling', 'index'],
            'object',
            'unknown',
          ],
        },
      ],
      'prefer-destructuring': [
        1,
        {
          object: true,
          array: false,
        },
      ],
      // =========================================
      // 2. React Related Rules
      // =========================================
      'react/react-in-jsx-scope': 0,
      'react/no-children-prop': 0,
      'react/no-array-index-key': 'error',
      'react/require-default-props': 0,
      'react/jsx-props-no-spreading': 0,
      'react/function-component-definition': 0,
      'react/prop-types': 'off',
      'react/jsx-no-useless-fragment': [
        1,
        {
          allowExpressions: true,
        },
      ],
      'react/no-unstable-nested-components': [
        1,
        {
          allowAsProps: true,
        },
      ],
      'react/jsx-no-duplicate-props': [
        1,
        {
          ignoreCase: false,
        },
      ],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 0,
      'jsx-a11y/anchor-is-valid': 0,
      'jsx-a11y/control-has-associated-label': 0,
      'jsx-a11y/no-static-element-interactions': 0,
      'jsx-a11y/click-events-have-key-events': 0,
      'jsx-a11y/mouse-events-have-key-events': 0,
      'jsx-a11y/no-noninteractive-element-interactions': 0,
      'jsx-a11y/no-noninteractive-tabindex': 0,
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-proptypes': 'error',
      'jsx-a11y/aria-unsupported-elements': 'error',
      'jsx-a11y/role-has-required-aria-props': 'error',
      // =========================================
      // 3. Plugin-specific Rules
      // =========================================
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'prettier/prettier': ['error', {}],
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off',
    },
  },
]

export default eslintConfig
