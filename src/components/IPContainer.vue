<script setup lang="ts">
import { AddSharp } from '@vicons/ionicons5';
import IPInputRow from './IPInputRow.vue';
import { useIPStore } from '../store/IPStore.ts';
import { computed } from 'vue';

const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'close'): void;
}>();

const ipStore = useIPStore();
const records = computed(() => Array.from(ipStore.records.entries()));

const handleAddClick = () => {
  ipStore.addRecord();
};

const handleCloseClick = () => {
  emit('close');
};

defineExpose({
  handleAddClick,
  handleCloseClick
});
</script>

<template>
  <n-card
    title="IP Lookup"
    size="large"
    class="lookup-card"
    bordered
    closable
    @close="handleCloseClick"
  >
    <!-- Description + Add button block -->
    <n-divider />

    <p class="lookup-description">Enter one or more IP addresses and get their country</p>

    <n-button type="primary" size="medium" strong icon-placement="left" @click="handleAddClick">
      <template #icon>
        <n-icon><AddSharp /></n-icon>
      </template>
      Add
    </n-button>

    <n-divider />

    <!-- List of IPs -->
    <transition-group name="fade-input" tag="ul" class="ip-list">
      <IPInputRow v-for="([id], index) in records" :key="id" :id="id" :displayIndex="index + 1" />
    </transition-group>
  </n-card>
</template>

<style scoped>
.lookup-card {
  height: 90vh;
  width: 100%;
  max-width: 600px;
}

.lookup-description {
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.ip-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 50vh;
  padding: 0;
  margin-top: 1rem;
  overflow-y: auto;
}

.fade-input-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.fade-input-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.fade-input-enter-active,
.fade-input-leave-active {
  transition: all 0.3s ease;
}

.fade-input-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
