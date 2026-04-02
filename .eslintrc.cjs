module.exports = {
  root: true,
  extends: [
    '@webdeveric/eslint-config-ts',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
    'plugin:import/typescript',
  ],
  env: {
    browser: false,
    es6: true,
    node: true,
  },
  parserOptions: {
    projectService: true,
  },
  settings: {
    'import/extensions': ['.ts', '.mts', '.cts', '.js', '.json'],
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
      node: {
        extensions: ['.js', '.ts', '.mts', '.cts'],
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.mts', '.cts'],
    },
  },
  rules: {},
};
