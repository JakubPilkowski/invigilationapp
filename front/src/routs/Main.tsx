import React, { memo, lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import SocketProvider from 'utils/SocketProvider';
import Fallback from 'views/Main/Fallback/Fallback';
import AuthorizeRoute from './AuthorizeRoute';
const Register = lazy(() => import('views/Auth/Register/Register'));
const Login = lazy(() => import('views/Auth/Login/Login'));
const Dashboard = lazy(() => import('views/Main/Dashboard/Dashboard'));
const NotFound = lazy(() => import('views/Main/NotFound'));

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

      <AuthorizeRoute exact path={['/cats', '/dogs']}>
        <Suspense fallback={<Fallback />}>
          <SocketProvider>
            <Dashboard />
          </SocketProvider>
        </Suspense>
      </AuthorizeRoute>

      <Route exact path="/not_found">
        <Suspense fallback={<Fallback />}>
          <NotFound />
        </Suspense>
      </Route>

      <Route exact path="/">
        <Redirect to="/cats" />
      </Route>

      <Route path="*">
        <Redirect to="/not_found" />
      </Route>
    </Switch>
  );
};

export default memo(Main);
