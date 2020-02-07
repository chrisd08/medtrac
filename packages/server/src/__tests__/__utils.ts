import { ApolloServer } from "apollo-server-fastify";
import { Connection, createConnection, getConnectionOptions } from "typeorm";
import { genSchema } from "../utils/genSchema";

const schema = genSchema();

export const createTestServer = (
  context = (args: unknown) => args
): ApolloServer => {
  return new ApolloServer({
    schema,
    context,
  });
};

export const createTestConn = async (resetDB = false): Promise<Connection> => {
  const connectionOptions = await getConnectionOptions("default");
  return createConnection({
    ...connectionOptions,
    synchronize: resetDB,
    dropSchema: resetDB,
    logging: false,
  });
};
