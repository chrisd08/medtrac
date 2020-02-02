import * as fs from "fs";
import * as glob from "glob";
import { GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import { mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import * as path from "path";

export const genSchema = (): GraphQLSchema => {
  const pathToModules = path.join(__dirname, "../modules");
  const graphqlTypes = glob
    .sync(`${pathToModules}/**/*.graphql`)
    .map(x => fs.readFileSync(x, { encoding: "utf8" }));

  const resolvers = glob
    .sync(`${pathToModules}/**/resolvers.?s`)
    .map(resolver => require(resolver).resolvers);

  const typeDefs = mergeTypes(graphqlTypes);

  fs.writeFileSync(path.join(__dirname, "../schema.graphql"), typeDefs);

  return makeExecutableSchema({
    typeDefs,
    resolvers: mergeResolvers(resolvers),
  });
};
