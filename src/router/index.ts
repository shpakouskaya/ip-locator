import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import IPLookupPage from '../pages/IPLookupPage.vue'
import NotFoundPage from '../pages/NotFoundPage.vue'
import { ROUTES } from './constants.ts'

const routes: RouteRecordRaw[] = [
  { path: ROUTES.HOME.path, name: ROUTES.HOME.name, component: IPLookupPage },
  { path: ROUTES.NOT_FOUND.path, name: ROUTES.NOT_FOUND.name, component: NotFoundPage }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
