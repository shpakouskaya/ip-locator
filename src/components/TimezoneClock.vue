<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { createTimeFormatter } from '../shared/utils/timeFormatter.ts';

const props = defineProps<{
  timezone: string | undefined | null;
}>();

const time = ref('');
let timer: ReturnType<typeof setInterval> | null = null;
let formatter = createTimeFormatter(props.timezone);

function updateTime() {
  time.value = formatter.format(new Date());
}

onMounted(() => {
  updateTime();
  timer = setInterval(updateTime, 1000);
});

onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
});

watch(
  () => props.timezone,
  (newTz) => {
    formatter = createTimeFormatter(newTz);
    updateTime();
  },
  { immediate: true }
);
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
