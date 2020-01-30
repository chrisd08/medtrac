import React, { ComponentType, useEffect } from "react";
import { Route, RouteComponentProps } from "react-router-dom";
import { useAuth0 } from "../providers/AuthProvider";

interface PrivateRouteProps {
  component: ComponentType<RouteComponentProps>;
  path: string;
}

const GuardedRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  path,
  ...rest
}) => {
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (loading || isAuthenticated) {
      return;
    }
    const fn = async (): Promise<void> => {
      await loginWithRedirect({
        appState: { targetUrl: path },
      });
    };
    fn();
  }, [loading, isAuthenticated, loginWithRedirect, path]);

  const render: (props: RouteComponentProps) => React.ReactNode = props =>
    isAuthenticated === true ? <Component {...props} /> : null;

  return <Route path={path} render={render} {...rest} />;
};

export default GuardedRoute;
