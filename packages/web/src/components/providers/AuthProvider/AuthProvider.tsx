import React, { ReactElement, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthContextProvider } from "../../../contexts/auth";
import { useMountEffect } from "../../../hooks";
import { AuthInterface } from "../../../services/auth";

interface AuthContainerProps {
  auth: AuthInterface;
  children: ReactElement;
}

export const AuthProvider: React.FC<AuthContainerProps> = ({
  auth: { authorise, login, logout, user, silentAuth },
  children,
}) => {
  const { pathname } = useLocation();
  const [authing, setAuthing] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  const authContext = {
    user,
    loggedIn,
    setLoggedIn,
    handleAuth: authorise,
    handleLogin: login,
    handleLogout: logout,
  };

  useMountEffect(() => {
    if (pathname === "/callback") {
      setAuthing(false);
      return;
    }
    const tryAuth = async (): Promise<void> => {
      try {
        if (await silentAuth()) {
          setLoggedIn(true);
        }
        setAuthing(false);
      } catch (err) {
        console.error(err.error);
        setAuthing(false);
      }
    };
    if (authing) {
      tryAuth();
    }
  });

  if (authing) {
    return <div>Loading</div>;
  }

  return (
    <AuthContextProvider value={authContext}>{children}</AuthContextProvider>
  );
};
