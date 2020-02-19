import { DataSources } from "apollo-server-core/dist/graphqlOptions";
import { ApolloServer } from "apollo-server-fastify";
import {
  ApolloServerTestClient,
  createTestClient,
} from "apollo-server-testing";
import { Connection, createConnection, getConnectionOptions } from "typeorm";
import { Context, DataSourceRepos } from "../@types";
import { Profile, User } from "../entity";
import { createDataSources } from "../utils";
import { genSchema } from "../utils/genSchema";

const schema = genSchema();

export const createTestServer = (
  dataSources: () => DataSources<Context>,
  context: () => Partial<Context>
): ApolloServer => {
  return new ApolloServer({
    schema,
    context,
    dataSources,
  });
};

export const createTestConn = async (): Promise<Connection> => {
  const connectionOptions = await getConnectionOptions("development");
  return createConnection({
    ...connectionOptions,
    name: "default",
    logging: ["error"],
  });
};

export const setupTests = async (
  context: () => Partial<Context> = () => ({
    user: { sub: "test" },
  })
): Promise<[Connection, ApolloServerTestClient, DataSourceRepos]> => {
  const connection = await createTestConn();
  const repos = {
    userRepo: connection.getRepository(User),
    profileRepo: connection.getRepository(Profile),
  };

  const dataSources = createDataSources(connection);

  const client = createTestClient(createTestServer(() => dataSources, context));

  return [connection, client, repos];
};
