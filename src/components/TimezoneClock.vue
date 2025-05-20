<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watchEffect } from 'vue'

const props = defineProps<{
  timezone: string | undefined | null
}>()

const time = ref('')

let timer: ReturnType<typeof setInterval> | null = null

function getFormattedTime(timezone: string | undefined | null): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: timezone || 'UTC',
    hour12: false
  }).format(new Date())
}

onMounted(() => {
  time.value = getFormattedTime(props.timezone)

  timer = setInterval(() => {
    time.value = getFormattedTime(props.timezone)
  }, 1000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})

watchEffect(() => {
  time.value = getFormattedTime(props.timezone)
})
</script>

<template>
  <span class="timezone-clock">{{ time }}</span>
</template>

<style scoped>
.timezone-clock {
  font-size: 0.95rem;
  align-self: center;
  width: 70px;
}
</style>
