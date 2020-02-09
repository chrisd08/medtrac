import { DataSources } from "apollo-server-core/dist/graphqlOptions";
import { ApolloServer } from "apollo-server-fastify";
import { parse } from "graphql";
import { compileQuery } from "graphql-jit";
import "reflect-metadata";
import { Context } from "./@types";
import { UserAPI } from "./api";
import { Profile, User } from "./entity";
import { initServer } from "./server";
import { createDatabaseConnection, genSchema, logger } from "./utils";

createDatabaseConnection()
  .then(connection => {
    const userAPI = new UserAPI({
      userRepo: connection.getRepository(User),
      profileRepo: connection.getRepository(Profile),
    });

    const schema = genSchema();
    const cache = {};

    const graphqlServer = new ApolloServer({
      schema,
      context: ({ user }) => ({ user }),
      dataSources: (): DataSources<Context> => ({ user: userAPI }),
      executor: ({ source, context }) => {
        if (!(source in cache)) {
          const document = parse(source);
          cache[source] = compileQuery(schema, document);
        }

        return cache[source].query({}, context, {});
      },
      formatError: err => {
        logger.error(err);
        return err;
      },
    });

    initServer(graphqlServer.createHandler());
  })
  .catch(error => logger.error(error));
