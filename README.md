# 🌍 IP Locator

**IP Locator** is a lightweight Vue 3 application that allows users to search for one or more IP addresses and retrieve details such as country, flag emoji, and current time based on the timezone.

---

## 🚀 Tech Stack

- ⚙️ [Vue 3](https://vuejs.org/) with `<script setup>`
- 🧠 [TypeScript](https://www.typescriptlang.org/)
- 🗂️ [Pinia](https://pinia.vuejs.org/) for state management
- 🎨 [Naive UI](https://www.naiveui.com/) for modern UI components
- 🌐 [Axios](https://axios-http.com/) for API requests
- ⚡ [Vite](https://vitejs.dev/) for fast development and build
- 🧹 [ESLint 9 (Flat Config)](https://eslint.org/) for linting
- 🖌️ [Prettier](https://prettier.io/) for code formatting

---

## 📦 Installation

- npm install
- npm run dev

## ✨ Features

- Input and validate multiple IP addresses
- Fetch and display country, flag emoji, and timezone
- Live clock based on timezone

## 🔌 API

Uses ipwho.is — no key required. Example:

https://ipwho.is/8.8.8.8?fields=ip,country,flag.emoji,timezone.id

**Please pay attention** that in the ipSearch.ts we use delay simulation to check how "User can search several IP’s simultaneously"
