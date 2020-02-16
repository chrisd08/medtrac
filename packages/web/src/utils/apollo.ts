import ApolloClient, { NormalizedCacheObject } from "apollo-boost";
import { AuthInterface } from "../services/auth";

export const createApolloClient = (
  auth: AuthInterface
): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    uri:
      process.env.NODE_ENV === "production"
        ? process.env.SERVER_URL
        : "http://localhost:3001/graphql",
    request: operation => {
      operation.setContext({
        headers: {
          authorization: `Bearer ${auth.accessToken}`,
        },
      });
    },
  });
};
