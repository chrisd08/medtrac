import * as path from "path";
import "reflect-metadata";
import {
  Connection,
  createConnection,
  getConnectionOptions,
  getRepository,
} from "typeorm";
import {
  Builder,
  fixturesIterator,
  Loader,
  Parser,
  Resolver,
} from "typeorm-fixtures-cli/dist";
import { logger } from ".";

export const runFixtures = async (connection: Connection): Promise<void> => {
  const loader = new Loader();
  loader.load(path.resolve("./src/fixtures"));

  const resolver = new Resolver();
  const fixtures = resolver.resolve(loader.fixtureConfigs);
  const builder = new Builder(connection, new Parser());

  for (const fixture of fixturesIterator(fixtures)) {
    const entity = await builder.build(fixture);
    await getRepository(entity.constructor.name).save(entity);
  }
};

export const createDatabaseConnection = async (): Promise<Connection | null> => {
  let retries = 5;
  const env = process.env.NODE_ENV;
  while (retries) {
    try {
      const config = await getConnectionOptions(env);
      const connection = await createConnection({
        ...config,
        ...(env === "production" && { url: process.env.DATABASE_URL }),
        name: "default",
      });
      logger.info("database connected");
      if (env === "production") {
        await connection.runMigrations();
      } else {
        await runFixtures(connection);
      }
      return connection;
    } catch (err) {
      console.log(err);
      retries -= 1;
      console.log(`retries left: ${retries}`);
      // wait 5 seconds
      await new Promise(res => setTimeout(res, 5000));
    }
  }

  return null;
};
