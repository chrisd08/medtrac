import { useAuth } from "../contexts/auth";
import { UserInterface } from "../services/auth";

export default (): UserInterface | undefined => useAuth().idTokenPayload;
