/* eslint-disable @typescript-eslint/no-var-requires */
require("ts-node/register");

const { createTestConn } = require("./__utils");

module.exports = async function() {
  const connection = await createTestConn();
  await connection.dropDatabase();
  console.log("dropped test db");
  await connection.runMigrations();
  console.log("run migrations on test db");
  await connection.close();
};
