import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../contexts/auth";

export const Callback: React.FC = () => {
  const history = useHistory();
  const { handleAuthentication } = useAuth();
  useEffect(() => {
    const authenticate = async (): Promise<void> => {
      await handleAuthentication();
      history.replace("/");
    };
    authenticate();
  });
  return null;
};
