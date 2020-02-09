import { Resolvers } from "../../@types/schema";

export const resolvers: Resolvers = {
  Query: {
    me: async (_, __, { user: {sub}, dataSources }) => {
      return dataSources.user?.getUser(sub);
    },
  },
};
