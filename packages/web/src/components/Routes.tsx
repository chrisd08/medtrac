import React from "react";
import { Route, Switch } from "react-router-dom";
import { Callback, Dashboard, GuardedRoute } from ".";

export const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact />
      <Route exact path="/callback" component={Callback} />
      <GuardedRoute path="/dashboard" component={Dashboard} />
    </Switch>
  );
};
