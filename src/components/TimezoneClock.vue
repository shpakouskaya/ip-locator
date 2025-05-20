<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue'

const props = defineProps<{
  timezone: string | undefined | null
}>()

const time = ref('')
let timer: ReturnType<typeof setInterval> | null = null

const effectiveTimezone = computed(() => props.timezone || 'UTC')

function updateTime() {
  time.value = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: effectiveTimezone.value,
    hour12: false
  }).format(new Date())
}

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})

watch(effectiveTimezone, () => {
  updateTime()
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
