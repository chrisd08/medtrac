import { Resolvers } from "../../generated";

export const resolvers: Resolvers = {
  Query: {
    me: async (_, __, { user: {sub}, dataSources }) => {
      return dataSources.user?.getUser(sub);
    },
  },
};
