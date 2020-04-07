const Habit = () => import('../views/habit');

const HABIT_ROUTES_MAP = {
  habit: '/habit',
};

const HABIT_ROUTES: Array<RouteConfigI> = [
  {
    path: HABIT_ROUTES_MAP.habit,
    auth: false,
    component: Habit,
  },
];

export {
  HABIT_ROUTES_MAP,
  HABIT_ROUTES,
};
