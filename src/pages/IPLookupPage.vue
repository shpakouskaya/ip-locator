<script setup lang="ts">
import { ref } from 'vue'
import IPContainer from '../components/IPContainer.vue'
import { useIPStore } from '../store/IPStore.ts'
import { useMessage } from 'naive-ui'

const ipStore = useIPStore()
const message = useMessage()
const isVisible = ref(false)

function handleClose() {
  isVisible.value = false
  ipStore.clearAll()
  message.warning('IP list has been cleared.')
}

function handleOpen() {
  isVisible.value = true
}
// For tests
defineExpose({
  isVisible,
  handleOpen
})
</script>

<template>
  <div class="lookup-page">
    <IPContainer v-if="isVisible" @close="handleClose" />

    <div v-else class="placeholder">
      <h1><span class="wave-text">👋</span> Ready to search for IPs?</h1>
      <n-button type="primary" @click="handleOpen">Open IP Lookup</n-button>
    </div>
  </div>
</template>

<style scoped>
.lookup-page {
  display: flex;
  justify-content: center;
  padding: 2rem 2rem 0 2rem;
}

.placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  gap: 1rem;
}

.wave-text {
  display: inline-block;
  animation: wave 1.5s infinite;
  transform-origin: 70% 70%;
}

@keyframes wave {
  0% {
    transform: rotate(0deg);
  }
  10% {
    transform: rotate(14deg);
  }
  20% {
    transform: rotate(-8deg);
  }
  30% {
    transform: rotate(14deg);
  }
  40% {
    transform: rotate(-4deg);
  }
  50% {
    transform: rotate(10deg);
  }
  60% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
