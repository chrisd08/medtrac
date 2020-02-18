import * as fastify from "fastify";
import * as fastifyAuth from "fastify-auth0-verify";
import * as fastifyCache from "fastify-caching";
import * as fastifyCookie from "fastify-cookie";
import * as fastifyCors from "fastify-cors";
import * as fastifySession from "fastify-server-session";
import { IncomingMessage, Server, ServerResponse } from "http";
import "reflect-metadata";
import { AddressInfo } from "ws";
import { logger } from "./utils/logger";

export const initServer = async (
  graphqlHandler: (
    app: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse>
  ) => void
): Promise<void> => {
  const server = fastify({})
    .register(graphqlHandler)
    .register(fastifyCache)
    .register(fastifyCookie)
    .register(fastifyCors, {
      origin: process.env.CLIENT_URL,
      credentials: true,
    })
    .register(fastifySession, {
      secretKey: "some-secret-password-at-least-32-characters-long",
      sessionMaxAge: 1000 * 60 * 15, // 15 minutes
      cookie: {
        domain: process.env.SERVER_URL,
        path: "/",
        expires: 1000 * 60 * 15,
        sameSite: "Lax", // important because of the nature of OAuth 2, with all the redirects
      },
    })
    .register(fastifyAuth, {
      domain: process.env.AUTH0_DOMAIN,
      secret: process.env.AUTH0_SECRET,
    });

  server.addHook("preHandler", async function(request, reply, done) {
    if (request.req.url.startsWith("/graphql")) {
      await this.authenticate(request, reply, done);
    }
  });

  server
    .listen(+process.env.PORT || 3001, "0.0.0.0")
    .then(function() {
      logger.info(
        "listening on %s",
        (server.server.address() as AddressInfo).port
      );
    })
    .catch(function(err) {
      logger.error(err.stack);
    });
};
