import ApolloClient, { NormalizedCacheObject } from "apollo-boost";
import { config } from "../config";
import { AuthInterface } from "../services/auth";

export const createApolloClient = (
  auth: AuthInterface
): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    uri: `${config.SERVER_URL}/graphql`,
    request: operation => {
      operation.setContext({
        headers: {
          authorization: `Bearer ${auth.accessToken}`,
        },
      });
    },
  });
};
