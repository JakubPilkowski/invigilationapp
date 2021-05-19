import React, { memo } from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

const AuthorizeRoute = ({ children, ...props }: RouteProps) => (
  <Route
    {...props}
    render={({ location }) => {
      return localStorage.getItem('token') ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      );
    }}
  />
);

export default memo(AuthorizeRoute);
