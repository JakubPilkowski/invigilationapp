import React, { lazy, memo, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import useLastPath from 'hooks/useLastPath';
import Users from './Users/Users';
import Fallback from '../Fallback/Fallback';
import Navbar from 'components/Navbar';

const Home = lazy(() => import('views/Main/Dashboard/Home'));
const Dogs = lazy(() => import('views/Main/Dashboard/Dogs'));
const Cats = lazy(() => import('views/Main/Dashboard/Cats'));
const NotFound = lazy(() => import('views/Main/NotFound'));

import './Dashboard.scss';
import useUpdateEvent from 'hooks/useUpdateEvent';

const Dashboard = () => {
  const { lastPath } = useLastPath();

  // const { updatePage } = useUpdateEvent();
  // updatePage(lastPath);

  return (
    <Switch>
      <Route
        path="/"
        render={() => (
          <div className="Dashboard">
            <div className="Dashboard__bookmarks">
              <Navbar />
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/dogs">
                  <Dogs />
                </Route>
                <Route exact path="/cats">
                  <Cats />
                </Route>
                <Route path="*">
                  <Redirect to="/not_found" />
                </Route>
              </Switch>
            </div>
            <div>
              <Users />
            </div>
          </div>
        )}
      />
      <Route exact path="/not_found">
        <Suspense fallback={<Fallback />}>
          <NotFound />
        </Suspense>
      </Route>
    </Switch>
  );
};

export default memo(Dashboard);
