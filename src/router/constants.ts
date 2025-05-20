export const ROUTES = {
  HOME: {
    name: 'Home',
    path: '/'
  },
  NOT_FOUND: {
    name: 'NotFound',
    path: '/:pathMatch(.*)*'
  }
} as const;
