const LOGIN = () => import('@/views/auth/login');

const AUTH_ROUTES_MAP = {
  login: '/auth/login',
};

const AUTH_ROUTES: Array<RouteConfigI> = [
  {
    path: AUTH_ROUTES_MAP.login,
    component: LOGIN,
  },
];

export {
  AUTH_ROUTES_MAP,
  AUTH_ROUTES,
};
