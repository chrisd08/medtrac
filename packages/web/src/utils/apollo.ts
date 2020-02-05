import ApolloClient, { NormalizedCacheObject } from "apollo-boost";
import auth from "../services/auth";

export const createApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    uri: "http://localhost:3001/graphql",
    request: operation => {
      operation.setContext({
        headers: {
          authorization: `Bearer ${auth.getAccessToken()}`,
        },
      });
    },
  });
};
