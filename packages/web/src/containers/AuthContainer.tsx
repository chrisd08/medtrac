import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthProvider } from "../contexts/auth";
import useMountEffect from "../hooks/useMountEffect";
import { AuthInterface } from "../services/auth";

interface AuthContainerProps {
  auth: AuthInterface;
  children: () => React.ReactNode;
}

export const AuthContainer: React.FC<AuthContainerProps> = ({
  auth,
  children,
}) => {
  const { pathname } = useLocation();
  const [authing, setAuthing] = useState(true);

  useMountEffect(() => {
    if (pathname === "/callback") {
      setAuthing(false);
      return;
    }
    const tryAuth = async (): Promise<void> => {
      try {
        await auth.silentAuth();
        setAuthing(false);
      } catch (err) {
        if (err.error !== "login_required") {
          console.log(err.error);
          setAuthing(false);
        }
      }
    };
    tryAuth();
  });

  if (authing) {
    return <div>Loading</div>;
  } else {
    return <AuthProvider value={auth}>{children()}</AuthProvider>;
  }
};
