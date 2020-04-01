import { UserInterface } from "../services/auth";
import { createContext } from "../utils/context";

interface AuthContextInterface {
  loggedIn: boolean;
  setLoggedIn: (authenticated: boolean) => void;
  handleAuth: () => Promise<void>;
  handleLogin: Function;
  handleLogout: Function;
  user?: UserInterface;
}

// prettier-ignore
export const [useAuth, AuthContextProvider] = createContext<AuthContextInterface>();
