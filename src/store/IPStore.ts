import { defineStore } from 'pinia';

export interface IpRecord {
  ip: string;
  loading: boolean;
  error: string | null;
  country: string;
  city: string;
  countryEmoji: string;
  timezone: string;
}

export const useIPStore = defineStore('IPStore', {
  state: () => ({
    records: new Map<number, IpRecord>(),
    nextId: 1
  }),

  actions: {
    addRecord() {
      const id = this.nextId++;
      this.records.set(id, {
        ip: '',
        loading: false,
        error: null,
        country: '',
        city: '',
        countryEmoji: '',
        timezone: ''
      });
    },

    removeRecord(id: number) {
      this.records.delete(id);
    },

    updateIp(id: number, ip: string) {
      const record = this.records.get(id);
      if (record) record.ip = ip;
    },

    setLoading(id: number, isLoading: boolean) {
      const record = this.records.get(id);
      if (record) record.loading = isLoading;
    },

    setError(id: number, error: string | null) {
      const record = this.records.get(id);
      if (record) record.error = error;
    },

    setResult(
      id: number,
      result: { ip?: string; city: string; country: string; countryEmoji: string; timezone: string }
    ) {
      const record = this.records.get(id);
      if (record) {
        record.country = result.country;
        record.city = result.city;
        record.countryEmoji = result.countryEmoji;
        record.timezone = result.timezone;
        record.error = null;
        if (result.ip) record.ip = result.ip;
      }
    },

    clearAll() {
      this.records.clear();
      this.nextId = 1;
    }
  }
});
