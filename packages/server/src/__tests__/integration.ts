import { ApolloServerTestClient } from "apollo-server-testing";
import gql from "graphql-tag";
import { Connection } from "typeorm";
import { DataSourceRepos } from "../@types";
import { setupTests } from "./__utils";

const ME_QUERY = gql`
  {
    me {
      id
      username
      profiles {
        name
      }
    }
  }
`;

let connection: Connection,
  client: ApolloServerTestClient,
  repos: DataSourceRepos;

beforeAll(async () => {
  [connection, client, repos] = await setupTests();
});

afterAll(() => connection.close());

describe("user", () => {
  describe("when a user does not exist", () => {
    it("should create one with a default profile", async () => {
      const { query } = client;
      const response = await query({ query: ME_QUERY });
      expect(response.data.me).toMatchSnapshot({ id: expect.any(String) });
    });
  });

  describe("when a user does exist", () => {
    beforeAll(() => {
      repos.userRepo.create({ username: "test" });
    });

    afterAll(() => {
      repos.userRepo.delete({ username: "test" });
    });

    it("returns the user", async () => {
      const { query } = client;
      const response = await query({ query: ME_QUERY });
      expect(response.data.me).toMatchSnapshot({ id: expect.any(String) });
    });
  });
});
