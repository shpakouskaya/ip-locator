import { defineStore } from 'pinia'

export interface IpRecord {
  id: number
  ip: string
  loading: boolean
  error: string | null
  country: string
  countryEmoji: string
  timezone: string
}

export const useIPStore = defineStore('IPStore', {
  state: () => ({
    records: [] as IpRecord[],
    nextId: 1
  }),

  actions: {
    addRecord() {
      this.records.push({
        id: this.nextId++,
        ip: '',
        loading: false,
        error: null,
        country: '',
        countryEmoji: '',
        timezone: ''
      })
    },

    removeRecord(id: number) {
      this.records = this.records.filter((r) => r.id !== id)
    },

    updateIp(id: number, ip: string) {
      const record = this.records.find((r) => r.id === id)
      if (record) record.ip = ip
    },

    setLoading(id: number, isLoading: boolean) {
      const record = this.records.find((r) => r.id === id)
      if (record) record.loading = isLoading
    },

    setError(id: number, error: string) {
      const record = this.records.find((r) => r.id === id)
      if (record) record.error = error
    },

    setResult(
      id: number,
      result: { ip?: string; country: string; countryEmoji: string; timezone: string }
    ) {
      const record = this.records.find((r) => r.id === id)
      if (record) {
        record.country = result.country
        record.countryEmoji = result.countryEmoji
        record.timezone = result.timezone
        record.error = null
        if (result.ip) record.ip = result.ip
      }
    },

    clearAll() {
      this.records = []
    }
  }
})
