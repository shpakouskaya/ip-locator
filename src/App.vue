<script setup lang="ts">
import { NConfigProvider } from 'naive-ui';
import { themeOverrides } from './plugins/naive-ui.ts';
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <router-view />
    </n-message-provider>
  </n-config-provider>
</template>
