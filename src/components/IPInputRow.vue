<script setup lang="ts">
import { computed } from 'vue';

import TimezoneClock from './TimezoneClock.vue';
import { useIPStore } from '../store/IPStore.ts';
import { validateIp } from '../shared/utils/validation.ts';
import { fetchIpLocation } from '../api/ipSearch.ts';
import { useMessage } from 'naive-ui';
import { TrashOutline } from '@vicons/ionicons5';

const props = defineProps<{
  id: number;
  displayIndex: number;
}>();
const ipStore = useIPStore();
const message = useMessage();
let lastQueriedIp: string | undefined;

const record = computed(() => ipStore.records.get(props.id));

function handleInput(value: string) {
  const sanitized = value.replace(/[^0-9.]/g, '');
  ipStore.updateIp(props.id, sanitized);
}

function handleRemove() {
  ipStore.removeRecord(props.id);
}

async function handleBlur() {
  const ip = record.value!.ip.trim();
  const validation = validateIp(ip);

  if (!validation.valid) {
    if (validation.shouldReset) {
      ipStore.setResult(props.id, {
        city: '',
        country: '',
        countryEmoji: '',
        timezone: ''
      });
    }
    ipStore.setError(props.id, validation.error!);
    lastQueriedIp = '';
    return;
  }

  if (ip === lastQueriedIp) return;
  lastQueriedIp = ip;

  ipStore.setError(props.id, null);
  ipStore.setLoading(props.id, true);

  try {
    const result = await fetchIpLocation(ip);
    ipStore.setResult(props.id, {
      ip: result.ip,
      city: result.city,
      country: result.country,
      countryEmoji: result.countryEmoji,
      timezone: result.timezone
    });
    message.success(`IP Location for ${ip} is fetched successfully`);
  } catch {
    ipStore.setResult(props.id, {
      city: '',
      country: '',
      countryEmoji: '',
      timezone: ''
    });
    ipStore.setError(props.id, 'Failed to fetch data');
    message.error(`Failed to fetch data for ${ip}`);
  } finally {
    ipStore.setLoading(props.id, false);
  }
}

defineExpose({
  handleInput,
  handleRemove,
  handleBlur
});
</script>

<template>
  <!-- Index of row -->
  <li class="ip-row">
    <div class="ip-index">
      {{ props.displayIndex }}
    </div>

    <!--  Input and error message  -->
    <div class="ip-input-data">
      <n-input
        :value="record?.ip"
        :disabled="record?.loading"
        :status="record?.error ? 'error' : undefined"
        @update:value="handleInput"
        @blur="handleBlur"
        placeholder="8.8.8.8"
      />
      <n-text v-if="record?.error" type="error">
        {{ record.error }}
      </n-text>
    </div>

    <!--  Loader  -->
    <template v-if="record?.loading">
      <n-spin />
    </template>

    <!--  Data from API and delete button  -->
    <template class="row-data" v-else>
      <n-tooltip v-if="record?.country" trigger="hover">
        <template #trigger>
          <n-text class="flag">
            {{ record.countryEmoji }}
          </n-text>
        </template>
        <span>{{ record.country }} - {{ record.city }}</span>
      </n-tooltip>

      <TimezoneClock v-if="record?.timezone" :timezone="record.timezone" />

      <n-button class="delete-row" strong secondary circle @click="handleRemove">
        <template #icon>
          <n-icon><TrashOutline /></n-icon>
        </template>
      </n-button>
    </template>
  </li>
</template>

<style scoped>
.ip-row {
  display: flex;
  align-items: flex-start;
  width: 100%;
  gap: 1rem;
  min-height: 3.5rem;
}

.ip-index {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: bold;
}

.ip-input-data {
  display: flex;
  flex-direction: column;
  width: 60%;
}

.flag {
  align-self: center;
}

.row-data {
  display: flex;
}

.delete-row {
  justify-self: end;
}
</style>
