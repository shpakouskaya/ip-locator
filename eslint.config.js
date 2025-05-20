import vue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import tseslint from 'typescript-eslint';
import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    ignores: ['dist', 'node_modules'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      globals: globals.browser
    },
    plugins: {
      vue,
      '@typescript-eslint': tseslint
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended[0].rules,
      ...vue.configs['flat/essential'].rules,

      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-explicit-any': 'off'
    }
  }
];
