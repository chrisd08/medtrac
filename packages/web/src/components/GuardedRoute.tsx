import React from "react";
import { Route, RouteProps } from "react-router-dom";
import auth from "../services/auth";

const GuardedRoute: React.FC<RouteProps> = props => {
  const { component: Component, path } = props;
  return (
    <Route
      exact
      path={path}
      render={props => {
        if (!auth.isAuthenticated) {
          auth.login();
          return null;
        }
        return Component ? <Component {...props} /> : null;
      }}
    />
  );
};

export default GuardedRoute;
