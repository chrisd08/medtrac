import {
  ApolloServerTestClient,
  createTestClient,
} from "apollo-server-testing";
import gql from "graphql-tag";
import { Connection } from "typeorm";
import { createTestConn, createTestServer } from "./__utils";

const ME_QUERY = gql`
  {
    me {
      id
      username
    }
  }
`;

let conn: Connection;
let client: ApolloServerTestClient;

beforeAll(async () => {
  conn = await createTestConn(true);
  client = createTestClient(
    createTestServer(() => ({
      user: { sub: "test" },
    }))
  );
});

afterAll(() => conn.close());

describe("user", () => {
  it("creates a new user", async () => {
    const { query } = client;
    const response = await query({ query: ME_QUERY });
    expect(response).not.toBeNull();
  });
});
