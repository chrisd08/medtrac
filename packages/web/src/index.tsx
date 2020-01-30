import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import config from "./config/auth_config.json";
import "./index.css";
import { Auth0Provider } from "./providers/AuthProvider";
import history from "./utils/history";

interface AppState {
  targetUrl: string;
}

// A function that routes the user to the right place
// after login
const onRedirectCallback = (appState: AppState): void => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    audience={config.audience}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
