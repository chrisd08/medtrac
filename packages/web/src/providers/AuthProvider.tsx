import createAuth0Client from "@auth0/auth0-spa-js";
import Auth0Client from "@auth0/auth0-spa-js/dist/typings/Auth0Client";
import React, { useCallback, useEffect, useState } from "react";
import { createCtx } from "../utils/context";

interface User {
  username: string;
  email: string;
  name: string;
  picture: string;
}

interface Auth0Context {
  isAuthenticated: boolean;
  user: User;
  loading: boolean;
  popupOpen: boolean;
  loginWithPopup: Function;
  handleRedirectCallback: (appState?: AppState) => void;
  getIdTokenClaims: (p?: getIdTokenClaimsOptions) => void;
  loginWithRedirect: (p?: RedirectLoginOptions) => void;
  getTokenSilently: (p?: GetTokenSilentlyOptions) => void;
  getTokenWithPopup: (p?: GetTokenWithPopupOptions) => void;
  logout: (p?: LogoutOptions) => void;
}

const DEFAULT_REDIRECT_CALLBACK = (): void =>
  window.history.replaceState({}, document.title, window.location.pathname);

export const [useContext, Auth0ContextProvider] = createCtx<Auth0Context>();
export const useAuth0 = (): Auth0Context => useContext();

export const Auth0Provider: React.FC<Auth0ClientOptions> = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();
  const [auth0Client, setAuth0] = useState<Auth0Client>();
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const initAuth0 = async (): Promise<void> => {
      const auth0FromHook = await createAuth0Client(initOptions);
      setAuth0(auth0FromHook);

      if (
        window.location.search.includes("code=") &&
        window.location.search.includes("state=")
      ) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated();

      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser();
        setUser(user);
      }

      setLoading(false);
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const loginWithPopup = async (params = {}): Promise<void> => {
    if (auth0Client) {
      setPopupOpen(true);
      try {
        await auth0Client.loginWithPopup(params);
      } catch (error) {
        console.error(error);
      } finally {
        setPopupOpen(false);
      }
      const user = await auth0Client.getUser();
      setUser(user);
      setIsAuthenticated(true);
    }
  };

  const handleRedirectCallback = async (): Promise<void> => {
    if (auth0Client) {
      setLoading(true);
      await auth0Client.handleRedirectCallback();
      const user = await auth0Client.getUser();
      setLoading(false);
      setIsAuthenticated(true);
      setUser(user);
    }
  };

  const getTokenSilently = useCallback(
    (p?: GetTokenSilentlyOptions) => auth0Client?.getTokenSilently(p),
    [auth0Client]
  );

  return (
    <Auth0ContextProvider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (p?: getIdTokenClaimsOptions) =>
          auth0Client?.getIdTokenClaims(p),
        loginWithRedirect: (p?: RedirectLoginOptions) =>
          auth0Client?.loginWithRedirect(p),
        getTokenSilently,
        getTokenWithPopup: (p?: GetTokenWithPopupOptions) =>
          auth0Client?.getTokenWithPopup(p),
        logout: (p?: LogoutOptions) => auth0Client?.logout(p),
      }}
    >
      {children}
    </Auth0ContextProvider>
  );
};
