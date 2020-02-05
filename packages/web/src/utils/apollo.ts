import ApolloClient, { NormalizedCacheObject } from "apollo-boost";
import { AuthInterface } from "../services/auth";

export const createApolloClient = (
  auth: AuthInterface
): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    uri: "http://localhost:3001/graphql",
    request: operation => {
      operation.setContext({
        headers: {
          authorization: `Bearer ${auth.accessToken}`,
        },
      });
    },
  });
};
