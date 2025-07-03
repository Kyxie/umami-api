import js from '@eslint/js';
import parser from '@typescript-eslint/parser';
import plugin from '@typescript-eslint/eslint-plugin';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser,
      parserOptions: {
        sourceType: 'module',
      },
      globals: {
        console: true,
        process: true,
        __dirname: true,
        require: true,
        module: true,
        exports: true,
      },
    },
    plugins: {
      '@typescript-eslint': plugin,
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error',
      // 'no-console': 'warn',
    },
  },
];
