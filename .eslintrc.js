module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'react-app',
    'plugin:react/recommended',
    'airbnb',
    'react-app/jest',
    'airbnb-typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: './tsconfig.json'
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
  },
  "ignorePatterns": ["index.js", ".eslintrc.js"]
};
