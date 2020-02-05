import { useState } from "react";
import { useLocation } from "react-router-dom";
import auth from "../services/auth";
import useMountEffect from "./useMountEffect";

export const useAuth = (): boolean => {
  const location = useLocation();
  const [authing, setAuthing] = useState(true);
  useMountEffect(() => {
    if (location.pathname === "/callback") {
      setAuthing(false);
      return;
    }
    const tryAuth = async (): Promise<void> => {
      try {
        await auth.silentAuth();
        setAuthing(false);
      } catch (err) {
        if (err.error === "login_required") return;
        console.log(err.error);
        setAuthing(false);
      }
    };
    tryAuth();
  });
  return authing;
};
