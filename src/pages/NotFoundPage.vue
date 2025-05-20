<script setup lang="ts">
import { ROUTES } from '../router/constants.ts'
</script>

<template>
  <div class="not-found-page">
    <h1>Page Not Found :^(</h1>

    <router-link :to="{ name: ROUTES.HOME.name }">
      <n-button type="primary">Go to Home Page</n-button>
    </router-link>
  </div>
</template>

<style scoped>
.not-found-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  gap: 1rem;
}
</style>
