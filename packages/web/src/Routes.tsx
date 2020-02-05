import React from "react";
import { Route, Switch } from "react-router-dom";
import { Callback } from "./components/Callback";
import GuardedRoute from "./components/GuardedRoute";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";

export const Routes: React.FC = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <Switch>
        <Route path="/" exact />
        <Route exact path="/callback" component={Callback} />
        <GuardedRoute path="/profile" component={Profile} />
      </Switch>
    </>
  );
};
