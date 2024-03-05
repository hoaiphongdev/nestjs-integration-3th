module.exports = {
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'unused-imports', 'import', 'prettier'],
  ignorePatterns: ['node_modules', 'dist', 'coverage', 'public', 'cypress'],
  rules: {
    'object-shorthand': ['error', 'always', { avoidQuotes: true }],
    'import/named': 'off',
    'import/order': [
      'error',
      {
        warnOnUnassignedImports: true,
        'newlines-between': 'always',
        groups: ['external', 'builtin', 'internal', 'parent', 'sibling', 'index'],
        distinctGroup: false,
        pathGroups: [],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        typedefs: false,
        functions: false,
      },
    ],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'max-len': 'off',
    'no-restricted-exports': 'off',
    'import/no-cycle': 'error',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'error',
    '@typescript-eslint/no-unused-vars': 'off',
    'class-methods-use-this': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'error',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'prettier/prettier': 'error',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
};
