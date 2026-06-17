import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

const config = [
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/dist/**',
      '**/out/**',
      '**/build/**',
      '**/_static/**',
      'tailwind.lib.config.js',
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      'import/prefer-default-export': 'off',
      'react/react-in-jsx-scope': 'error',
      'react/jsx-uses-react': 'error',
      'react/jsx-props-no-spreading': 'off',
      'react/no-unescaped-entities': 'error',
      'react/function-component-definition': [
        2,
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      'import/no-extraneous-dependencies': ['warn', { devDependencies: true }],
      'no-use-before-define': 'error',
      '@typescript-eslint/no-use-before-define': ['error'],
      // SSR hydration-guard pattern (setMounted in effect) is intentional
      'react-hooks/set-state-in-effect': 'off',
      'import/extensions': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { vars: 'all', args: 'after-used', ignoreRestSiblings: false },
      ],
      'react/jsx-filename-extension': [
        2,
        { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
      ],
    },
  },
];

export default config;
