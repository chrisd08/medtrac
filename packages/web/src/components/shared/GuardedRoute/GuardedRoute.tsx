import React from "react";
import { Route, RouteProps } from "react-router-dom";
import { useAuth } from "../../../contexts/auth";

// To do: test in real app (/dashbouard when logged out)

const GuardedRoute: React.FC<RouteProps> = props => {
  const { component: Component, path } = props;
  const { loggedIn, handleLogin } = useAuth();
  return (
    <Route
      exact
      path={path}
      render={props => {
        if (!loggedIn) {
          handleLogin();
          return null;
        }
        return Component ? <Component {...props} /> : null;
      }}
    />
  );
};

export { GuardedRoute };
