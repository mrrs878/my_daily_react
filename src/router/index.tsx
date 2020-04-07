import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import MAIN_CONFIG from '@/config';
import MLoading from '../components/MLoading';
import Login from '../views/auth/login';
import { TASK_ROUTES_MAP, TASK_ROUTES } from './taskRoutes';
import { HABIT_ROUTES, HABIT_ROUTES_MAP } from './habitRoutes';
import { PROFILE_ROUTES_MAP, PROFILE_ROUTES } from './profileRoutes';
import { AUTH_ROUTES, AUTH_ROUTES_MAP } from './authRoutes';

const ROUTES_MAP = {
  ...TASK_ROUTES_MAP,
  ...HABIT_ROUTES_MAP,
  ...PROFILE_ROUTES_MAP,
  ...AUTH_ROUTES_MAP,
};

const ROUTES: Array<RouteConfigI> = [
  ...TASK_ROUTES,
  ...HABIT_ROUTES,
  ...PROFILE_ROUTES,
  ...AUTH_ROUTES,
];

const TAB_BAR_ROUTES = [
  TASK_ROUTES_MAP.task,
  HABIT_ROUTES_MAP.habit,
  PROFILE_ROUTES_MAP.profile,
];

interface PropsI {
  children: any;
}

const Router: React.FC<PropsI> = (props: PropsI) => {
  function beforeEach(route: RouteConfigI): React.ReactNode {
    if (localStorage.getItem(MAIN_CONFIG.TOKEN_NAME) || route.auth === false) {
      const Com = React.lazy(route.component);
      return <Com />;
    } return <Login />;
  }

  const { children } = props;

  return (
    <BrowserRouter>
      <Suspense fallback={<MLoading />}>
        <Switch>
          {
            ROUTES.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact || true}
                render={(): React.ReactNode => beforeEach(route)}
              />
            ))
          }
        </Switch>
        { children }
      </Suspense>
    </BrowserRouter>
  );
};

export {
  ROUTES_MAP,
  Router,
  TAB_BAR_ROUTES,
};
