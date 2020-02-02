import { Connection, createConnection, getConnectionOptions } from "typeorm";

export const createTypeormConn = async (): Promise<Connection | null> => {
  let retries = 5;
  while (retries) {
    try {
      const config = await getConnectionOptions("default");
      return createConnection(config);
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
