import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import IPInputRow from './IPInputRow.vue'
import { createTestingPinia } from '@pinia/testing'
import * as api from './../api/ipSearch.ts'
import { useIPStore } from '../store/IPStore.ts'

const successMock = vi.fn()
const errorMock = vi.fn()

vi.mock('naive-ui', async (importOriginal) => {
  const actual = await importOriginal<typeof import('naive-ui')>()

  return {
    ...actual,
    useMessage: () => ({
      success: successMock,
      error: errorMock
    })
  }
})

describe('IPInputRow.vue — methods', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    successMock.mockClear()
    errorMock.mockClear()
  })

  function mountComponentWithStore(initialRecord = {}) {
    const pinia = createTestingPinia({ stubActions: false })

    const wrapper = mount(IPInputRow, {
      global: { plugins: [pinia] },
      props: {
        id: 1,
        displayIndex: 1
      }
    })

    const store = useIPStore()
    store.records.push({
      id: 1,
      ip: '',
      loading: false,
      error: '',
      country: '',
      countryEmoji: '',
      timezone: '',
      ...initialRecord
    })

    return { wrapper, store }
  }

  it('handleInput sanitizes and updates IP', () => {
    const { wrapper, store } = mountComponentWithStore()

    vi.spyOn(store, 'updateIp')
    wrapper.vm.handleInput('12.34.abc56')
    expect(store.updateIp).toHaveBeenCalledWith(1, '12.34.56')
  })

  it('handleRemove removes record', () => {
    const { wrapper, store } = mountComponentWithStore()

    vi.spyOn(store, 'removeRecord')
    wrapper.vm.handleRemove()
    expect(store.removeRecord).toHaveBeenCalledWith(1)
  })

  it('handleBlur sets error on empty IP', async () => {
    const { wrapper, store } = mountComponentWithStore({ ip: '' })

    vi.spyOn(store, 'setError')
    await wrapper.vm.handleBlur()

    expect(store.setError).toHaveBeenCalledWith(1, 'Please enter an IP address')
  })

  it('handleBlur sets error for invalid IP', async () => {
    const { wrapper, store } = mountComponentWithStore({ ip: '999.999.999.999' })

    vi.spyOn(store, 'setError')
    vi.spyOn(store, 'setResult')

    await wrapper.vm.handleBlur()

    expect(store.setResult).toHaveBeenCalled()
    expect(store.setError).toHaveBeenCalledWith(1, 'Invalid format of IP address')
  })

  it('handleBlur calls API and sets result for valid IP', async () => {
    const mockResult = {
      ip: '8.8.8.8',
      country: 'USA',
      countryEmoji: '🇺🇸',
      timezone: 'America/New_York'
    }

    vi.spyOn(api, 'fetchIpLocation').mockResolvedValue(mockResult)

    const { wrapper, store } = mountComponentWithStore({ ip: '8.8.8.8' })

    vi.spyOn(store, 'setLoading')
    vi.spyOn(store, 'setResult')
    vi.spyOn(store, 'setError')

    await wrapper.vm.handleBlur()

    expect(api.fetchIpLocation).toHaveBeenCalledWith('8.8.8.8')
    expect(store.setResult).toHaveBeenCalledWith(1, mockResult)
    expect(successMock).toHaveBeenCalledWith('IP Location for 8.8.8.8 is fetched successfully')
  })

  it('handleBlur handles API failure', async () => {
    vi.spyOn(api, 'fetchIpLocation').mockRejectedValue(new Error('fail'))

    const { wrapper, store } = mountComponentWithStore({ ip: '8.8.8.8' })

    vi.spyOn(store, 'setError')
    vi.spyOn(store, 'setLoading')

    await wrapper.vm.handleBlur()

    expect(store.setError).toHaveBeenCalledWith(1, 'Failed to fetch data')
    expect(errorMock).toHaveBeenCalledWith('Failed to fetch data for 8.8.8.8')
  })
})
