import React from "react";
import { useHistory } from "react-router";
import { useAuth } from "../../../contexts/auth";
import { useMountEffect } from "../../../hooks/useMountEffect";
import { Default } from "../../layouts";

export const Callback: React.FC = () => {
  const history = useHistory();
  const { handleAuth, setLoggedIn } = useAuth();
  useMountEffect(() => {
    const authenticate = async (): Promise<void> => {
      await handleAuth();
      setLoggedIn(true);
      history.replace("/dashboard");
    };
    authenticate();
  });
  return <Default />;
};
