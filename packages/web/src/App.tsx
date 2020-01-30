import React, { ReactElement } from "react";
import { Route, Router, Switch } from "react-router-dom";
import GuardedRoute from "./components/GuardedRoute";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import history from "./utils/history";

function App(): ReactElement {
  return (
    <div className="App">
      {/* Don't forget to include the history module */}
      <Router history={history}>
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route path="/" exact />
          <GuardedRoute path="/profile" component={Profile} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
