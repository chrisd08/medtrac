import { gql } from "apollo-server-express";
import { ApolloServer } from "apollo-server-fastify";
import { parse } from "graphql";
import { compileQuery } from "graphql-jit";
import { makeExecutableSchema } from "graphql-tools";
import "reflect-metadata";
import { data } from "./data";
import { initServer } from "./server";

const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    md5: String!
    company: String!
    books: [Book!]!
  }
  type Book {
    id: ID!
    name: String!
    numPages: Int!
  }
  type Query {
    authors: [Author!]!
  }
`;

const resolvers = {
  Author: {
    md5: parent => parent.name,
  },
  Query: {
    authors: async (_, __, { user }) => {
      console.log(user);
      return data;
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const cache = {};

const graphqlServer = new ApolloServer({
  schema,
  context: ({ user }) => ({ user }),
  executor: ({ source, context }) => {
    if (!(source in cache)) {
      const document = parse(source);
      cache[source] = compileQuery(schema, document);
    }

    return cache[source].query({}, context, {});
  },
});

initServer(graphqlServer.createHandler());
