import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import NotFoundPage from './NotFoundPage.vue';
import { ROUTES } from '../router/constants.ts';
import { nextTick } from 'vue';

describe('NotFoundPage.vue', () => {
  it('navigates to home page on button click', async () => {
    const routes = [
      { path: '/', name: ROUTES.HOME.name, component: { template: '<div>Home</div>' } }
    ];

    const router = createRouter({
      history: createMemoryHistory(),
      routes
    });

    const wrapper = mount(NotFoundPage, {
      global: {
        plugins: [router],
        stubs: {
          'n-button': true
        }
      }
    });

    await router.isReady();

    const link = wrapper.find('a');

    await link.trigger('click');
    await nextTick();

    expect(router.currentRoute.value.name).toBe(ROUTES.HOME.name);
  });
});
