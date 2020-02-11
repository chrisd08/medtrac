import { ApolloServer } from "apollo-server-fastify";
import { parse } from "graphql";
import { compileQuery } from "graphql-jit";
import "reflect-metadata";
import { initServer } from "./server";
import {
  createDatabaseConnection,
  createDataSources,
  genSchema,
  logger,
} from "./utils";

createDatabaseConnection()
  .then(connection => {
    const dataSources = createDataSources(connection);
    const schema = genSchema();
    const cache = {};

    const graphqlServer = new ApolloServer({
      schema,
      context: ({ user }) => ({ user }),
      dataSources: () => dataSources,
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
