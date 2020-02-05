import React, { useEffect } from "react";
import { useHistory } from "react-router";
import auth from "../services/auth";

export const Callback: React.FC = () => {
  const history = useHistory();
  useEffect(() => {
    const authenticate = async (): Promise<void> => {
      await auth.handleAuthentication();
      history.replace("/");
    };
    authenticate();
  });
  return null;
};
