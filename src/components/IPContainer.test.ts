import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { useIPStore } from '../store/IPStore.ts';
import IPContainer from './IPContainer.vue';
import { NMessageProvider } from 'naive-ui';
import { h } from 'vue';
import { naiveUi } from '../plugins/naive-ui.ts';

describe('IPContainer.vue', () => {
  function mountWithNaiveAndPinia() {
    return mount(NMessageProvider, {
      global: {
        plugins: [naiveUi, createTestingPinia({ stubActions: false })]
      },
      slots: {
        default: () => h(IPContainer)
      }
    });
  }

  it('calls ipStore.addRecord when handleAddClick is triggered', async () => {
    const wrapper = mountWithNaiveAndPinia();
    const container = wrapper.findComponent(IPContainer);

    const ipStore = useIPStore();
    vi.spyOn(ipStore, 'addRecord');

    container.vm.handleAddClick();
    expect(ipStore.addRecord).toHaveBeenCalled();
  });

  it('emits close when handleCloseClick is triggered', () => {
    const wrapper = mountWithNaiveAndPinia();
    const container = wrapper.findComponent(IPContainer);

    container.vm.handleCloseClick();

    expect(container.emitted('close')).toBeTruthy();
  });
});
