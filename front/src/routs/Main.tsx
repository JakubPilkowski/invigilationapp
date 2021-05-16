import React, { memo, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router';
import SocketProvider from 'utils/SocketProvider';
import Fallback from 'views/Main/Fallback/Fallback';
import AuthorizeRoute from './AuthorizeRoute';
const Register = lazy(() => import('views/Auth/Register/Register'));
const Login = lazy(() => import('views/Auth/Login/Login'));
const Dashboard = lazy(() => import('views/Main/Dashboard/Dashboard'));

const Main = () => {
  return (
    <Switch>
      <Route exact path="/register">
        <Suspense fallback={<Fallback />}>
          <Register />
        </Suspense>
      </Route>

      <Route exact path="/login">
        <Suspense fallback={<Fallback />}>
          <Login />
        </Suspense>
      </Route>

      <Route path="/">
        <Suspense fallback={<Fallback />}>
          <Dashboard />
        </Suspense>
      </Route>
    </Switch>
  );
};

export default memo(Main);
