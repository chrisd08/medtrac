import React from "react";
import { Route, RouteProps } from "react-router-dom";
import { useAuth } from "../../../contexts/auth";

type WithRequired<T extends {}, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;

const GuardedRoute: React.FC<WithRequired<RouteProps, "component">> = props => {
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
        return <Component {...props} />;
      }}
    />
  );
};

export { GuardedRoute };
