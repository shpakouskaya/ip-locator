import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import TimezoneClock from './TimezoneClock.vue'

describe('TimezoneClock.vue', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('displays initial time correctly based on timezone', () => {
    const wrapper = mount(TimezoneClock, {
      props: {
        timezone: 'UTC'
      }
    })

    const displayedTime = wrapper.text()
    const actualTime = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'UTC',
      hour12: false
    }).format(new Date())

    expect(displayedTime).toBe(actualTime)
  })

  it('updates time every second', async () => {
    const wrapper = mount(TimezoneClock, {
      props: { timezone: 'UTC' }
    })

    const initial = wrapper.text()
    vi.advanceTimersByTime(1000)
    await wrapper.vm.$nextTick()

    const updated = wrapper.text()
    expect(updated).not.toBe(initial)
  })

  it('clears interval on unmount', () => {
    const clearSpy = vi.spyOn(globalThis, 'clearInterval')
    const wrapper = mount(TimezoneClock, {
      props: { timezone: 'UTC' }
    })

    wrapper.unmount()
    expect(clearSpy).toHaveBeenCalled()
  })

  it('reacts to timezone prop change', async () => {
    const wrapper = mount(TimezoneClock, {
      props: { timezone: 'UTC' }
    })

    const before = wrapper.text()

    await wrapper.setProps({ timezone: 'Asia/Tokyo' })
    await wrapper.vm.$nextTick()

    const after = wrapper.text()
    expect(before).not.toBe(after)
  })
})
