import vue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import tseslint from 'typescript-eslint'
import js from '@eslint/js'
import globals from 'globals'

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
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
      // Базовые правила JS
      ...js.configs.recommended.rules,
      // Рекомендованные TS правила
      ...tseslint.configs.recommended[0].rules,
      // Vue flat essential
      ...vue.configs['flat/essential'].rules,

      // Кастомные правила (можешь править)
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-explicit-any': 'off'
    }
  }
]
