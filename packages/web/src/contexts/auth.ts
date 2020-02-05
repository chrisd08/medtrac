import { AuthInterface } from "../services/auth";
import { createContext } from "../utils/context";

export const [useAuth, AuthProvider] = createContext<AuthInterface>();
