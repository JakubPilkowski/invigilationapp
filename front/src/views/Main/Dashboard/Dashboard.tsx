import React, { lazy, memo } from 'react';
import { Route, Switch } from 'react-router';

import useLastPath from 'hooks/useLastPath';
import useUpdateEvent from 'hooks/useUpdateEvent';

import Users from './Users/Users';
import Navbar from 'components/Navbar';

const Dogs = lazy(() => import('views/Main/Dashboard/Dogs'));
const Cats = lazy(() => import('views/Main/Dashboard/Cats'));

import './Dashboard.scss';

const Dashboard = () => {
  const { lastPath } = useLastPath();

  const { updatePage } = useUpdateEvent();
  updatePage(lastPath);

  return (
    <div className="Dashboard">
      <div className="Dashboard__bookmarks">
        <Navbar />
        <Switch>
          <Route exact path="/dogs">
            <Dogs />
          </Route>
          <Route exact path="/cats">
            <Cats />
          </Route>
        </Switch>
      </div>
      <div>
        <Users />
      </div>
    </div>
  );
};

export default memo(Dashboard);
