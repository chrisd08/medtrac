import { useAuth } from "../contexts/auth";
import { UserInterface } from "../services/auth";

export const useUser = (): UserInterface | undefined => useAuth().user;
