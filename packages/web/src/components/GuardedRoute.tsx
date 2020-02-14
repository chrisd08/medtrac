import React from "react";
import { Route, RouteProps } from "react-router-dom";
import { useAuth } from "../contexts/auth";

const GuardedRoute: React.FC<RouteProps> = props => {
  const { component: Component, path } = props;
  const { isAuthenticated, login } = useAuth();
  return (
    <Route
      exact
      path={path}
      render={props => {
        if (!isAuthenticated) {
          login();
          return null;
        }
        return Component ? <Component {...props} /> : null;
      }}
    />
  );
};

export { GuardedRoute };
