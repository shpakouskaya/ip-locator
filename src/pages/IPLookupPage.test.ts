import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { h } from 'vue'

import { NMessageProvider } from 'naive-ui'
import IPLookupPage from './IPLookupPage.vue'
import IPContainer from '../components/IPContainer.vue'
import { naiveUi } from '../plugins/naive-ui.ts'

describe('IPLookupPage.vue', () => {
  function mountWithNaiveAndPinia() {
    return mount(NMessageProvider, {
      global: {
        plugins: [naiveUi, createTestingPinia({ stubActions: false })]
      },
      slots: {
        default: () => h(IPLookupPage)
      }
    })
  }

  it('shows placeholder and button when isVisible is false', () => {
    const wrapper = mountWithNaiveAndPinia()

    expect(wrapper.find('.placeholder').exists()).toBe(true)
    expect(wrapper.findComponent(IPContainer).exists()).toBe(false)
    expect(wrapper.find('button').text()).toBe('Open IP Lookup')
  })

  it('shows IPContainer when isVisible is true', async () => {
    const wrapper = mountWithNaiveAndPinia()

    const page = wrapper.findComponent(IPLookupPage)

    page.vm.isVisible = true
    await page.vm.$nextTick()

    expect(page.findComponent(IPContainer).exists()).toBe(true)
    expect(page.find('.placeholder').exists()).toBe(false)
  })

  it('handleOpen sets isVisible to true', async () => {
    const wrapper = mountWithNaiveAndPinia()
    const page = wrapper.findComponent(IPLookupPage)

    page.vm.handleOpen()
    await page.vm.$nextTick()

    expect(page.vm.isVisible).toBe(true)
    expect(page.findComponent(IPContainer).exists()).toBe(true)
  })
})
