module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'unicorn', 'import'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  ignorePatterns: ['build', 'public', 'coverage', 'cypress'],
  rules: {
    'import/no-unresolved': 'error',
    'react/prop-types': 'off',
    'react/no-unescaped-entities': 'off',
    'react/display-name': 'off',
    'react/jsx-key': 'error',
    'react/jsx-no-target-blank': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/self-closing-comp': 'error',
    'no-duplicate-imports': 'error',
    'no-promise-executor-return': 'error',
    'no-unneeded-ternary': 'error',
    'array-callback-return': 'error',
    'prefer-template': 'error',
    'object-shorthand': 'error',
    'prefer-const': 'error',
    'no-lonely-if': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    'unicorn/prefer-switch': 'error',
    'unicorn/prefer-ternary': 'error',
    'unicorn/prefer-spread': 'off',
    'unicorn/better-regex': 'error',
    'unicorn/no-instanceof-array': 'error',
    'unicorn/no-static-only-class': 'error',
    'unicorn/no-unreadable-array-destructuring': 'error',
    'unicorn/no-useless-promise-resolve-reject': 'error',
    'unicorn/prefer-default-parameters': 'error',
    'unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase',
        ignore: ['^setupTests.ts$'],
      },
    ],
    'arrow-body-style': ['error', 'as-needed'],
    "react/jsx-curly-brace-presence": "error"
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  env: {
    browser: true,
  },
};
