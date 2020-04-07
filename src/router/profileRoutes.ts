const Profile = () => import('../views/profile');

const PROFILE_ROUTES_MAP = {
  profile: '/profile',
};

const PROFILE_ROUTES: Array<RouteConfigI> = [
  {
    path: PROFILE_ROUTES_MAP.profile,
    auth: false,
    component: Profile,
  },
];

export {
  PROFILE_ROUTES_MAP,
  PROFILE_ROUTES,
};
