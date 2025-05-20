import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import IPInputRow from './IPInputRow.vue'
import { createTestingPinia } from '@pinia/testing'
import { useIPStore } from '../store/IPStore.ts'
import * as api from './../api/ipSearch.ts'

const successMock = vi.fn()
const errorMock = vi.fn()

vi.mock('naive-ui', async (importOriginal) => {
  const actual = await importOriginal<typeof import('naive-ui')>()
  return {
    ...actual,
    useMessage: () => ({ success: successMock, error: errorMock })
  }
})

describe('IPInputRow.vue — methods', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    successMock.mockClear()
    errorMock.mockClear()
  })

  const defaultRecord = {
    ip: '',
    loading: false,
    error: null,
    country: '',
    countryEmoji: '',
    city: '',
    timezone: ''
  }

  function mountWithRecord(ip: string = '') {
    const pinia = createTestingPinia({ stubActions: false })
    const wrapper = mount(IPInputRow, {
      global: { plugins: [pinia] },
      props: { id: 1, displayIndex: 1 }
    })

    const store = useIPStore()
    store.records.set(1, { ...defaultRecord, ip })

    return { wrapper, store }
  }

  it('handleInput sanitizes and updates IP', () => {
    const { wrapper, store } = mountWithRecord()

    const spy = vi.spyOn(store, 'updateIp')
    wrapper.vm.handleInput('12.34.abc56')

    expect(spy).toHaveBeenCalledWith(1, '12.34.56')
  })

  it('handleRemove calls store.removeRecord', () => {
    const { wrapper, store } = mountWithRecord()

    const spy = vi.spyOn(store, 'removeRecord')
    wrapper.vm.handleRemove()

    expect(spy).toHaveBeenCalledWith(1)
  })

  it('handleBlur: empty IP sets error', async () => {
    const { wrapper, store } = mountWithRecord('')

    const spy = vi.spyOn(store, 'setError')
    await wrapper.vm.handleBlur()

    expect(spy).toHaveBeenCalledWith(1, 'Please enter an IP address')
  })

  it('handleBlur: invalid IP sets error and clears result', async () => {
    const { wrapper, store } = mountWithRecord('999.999.999.999')

    const errSpy = vi.spyOn(store, 'setError')
    const resSpy = vi.spyOn(store, 'setResult')

    await wrapper.vm.handleBlur()

    expect(resSpy).toHaveBeenCalled()
    expect(errSpy).toHaveBeenCalledWith(1, 'Invalid format of IP address')
  })

  it('handleBlur: valid IP fetches and updates result', async () => {
    const mockResult = {
      ip: '8.8.8.8',
      city: 'Mountain View',
      country: 'USA',
      countryEmoji: '🇺🇸',
      timezone: 'America/New_York'
    }
    vi.spyOn(api, 'fetchIpLocation').mockResolvedValue(mockResult)

    const { wrapper, store } = mountWithRecord('8.8.8.8')

    const loadingSpy = vi.spyOn(store, 'setLoading')
    const resultSpy = vi.spyOn(store, 'setResult')
    const errorSpy = vi.spyOn(store, 'setError')

    await wrapper.vm.handleBlur()

    expect(api.fetchIpLocation).toHaveBeenCalledWith('8.8.8.8')
    expect(loadingSpy).toHaveBeenCalledWith(1, true)
    expect(resultSpy).toHaveBeenCalledWith(1, mockResult)
    expect(successMock).toHaveBeenCalledWith('IP Location for 8.8.8.8 is fetched successfully')
    expect(errorSpy).toHaveBeenCalledWith(1, null)
  })

  it('handleBlur: API failure sets error', async () => {
    vi.spyOn(api, 'fetchIpLocation').mockRejectedValue(new Error('fail'))

    const { wrapper, store } = mountWithRecord('8.8.8.8')

    const errSpy = vi.spyOn(store, 'setError')
    await wrapper.vm.handleBlur()

    expect(errSpy).toHaveBeenCalledWith(1, 'Failed to fetch data')
    expect(errorMock).toHaveBeenCalledWith('Failed to fetch data for 8.8.8.8')
  })
})
