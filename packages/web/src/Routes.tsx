import React from "react";
import { Route, Switch } from "react-router-dom";
import { Callback, Dashboard, GuardedRoute, NavBar } from "./components";

export const Routes: React.FC = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <Switch>
        <Route path="/" exact />
        <Route exact path="/callback" component={Callback} />
        <GuardedRoute path="/dashboard" component={Dashboard} />
      </Switch>
    </>
  );
};
