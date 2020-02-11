import { DataSources } from "apollo-server-core/dist/graphqlOptions";
import { Connection } from "typeorm";
import { Context } from "../@types";
import { UserAPI } from "../api";
import { Profile, User } from "../entity";

export const createDataSources = (
  connection: Connection
): DataSources<Context> => {
  const repos = {
    userRepo: connection.getRepository(User),
    profileRepo: connection.getRepository(Profile),
  };

  return {
    user: new UserAPI(repos),
  };
};
