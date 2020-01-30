/* eslint-disable @typescript-eslint/camelcase */
import * as fastify from "fastify";
import * as fastifyAuth from "fastify-auth0-verify";
import * as fastifyCache from "fastify-caching";
import * as fastifyCookie from "fastify-cookie";
import * as fastifySession from "fastify-server-session";
import * as http from "http";
import { IncomingMessage, Server, ServerResponse } from "http";
import "reflect-metadata";
import { AddressInfo } from "ws";

declare module "fastify" {
  export interface FastifyInstance<
    HttpServer = http.Server,
    HttpRequest = http.IncomingMessage,
    HttpResponse = http.ServerResponse
  > {
    authenticate: FastifyMiddleware;
  }

  interface FastifyRequest<
    HttpRequest = http.IncomingMessage,
    Query = DefaultQuery,
    Params = DefaultParams,
    Headers = DefaultHeaders,
    Body = DefaultBody
  > {
    user: unknown;
  }
}

export const initServer = (
  graphqlHandler: (
    app: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse>
  ) => void
): void => {
  const server = fastify({})
    .register(graphqlHandler)
    .register(fastifyCache)
    .register(fastifyCookie)
    .register(fastifySession, {
      secretKey: "some-secret-password-at-least-32-characters-long",
      sessionMaxAge: 1000 * 60 * 15, // 15 minutes
      cookie: {
        domain: "localhost",
        path: "/",
        expires: 1000 * 60 * 15,
        sameSite: "Lax", // important because of the nature of OAuth 2, with all the redirects
      },
    })
    .register(fastifyAuth, {
      domain: "dev-dye9-qv5.eu.auth0.com",
      secret:
        "K9_miEFV-gfa3LQ3-dIDNVMeG9Z3LovYr_4bzQNq5G6iUi3K1VqFi6y_Dd0luf6X",
    });

  server.addHook("preHandler", async function(request, reply, done) {
    if (request.req.url.startsWith("/graphql")) {
      await this.authenticate(request, reply, done);
    }
  });

  server
    .listen(3001)
    .then(function() {
      console.log(
        "listening on %s",
        (server.server.address() as AddressInfo).port
      );
    })
    .catch(function(err) {
      console.error(err.stack);
    });
};
