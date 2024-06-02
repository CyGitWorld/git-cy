/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { Hono } from "hono";
import { createApiRouter } from "./router/api";
import { cors } from "hono/cors";
import { AuthService } from "./router/api/auth/auth.service";
import { Kysely } from "kysely";
import { D1Dialect } from "kysely-d1";
import { UserService } from "./router/api/user/user.service";
import { UserRepository } from "./router/api/user/user.repository";
import { DataBase } from "./types/database";
import { Env } from "./worker-env";

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const app = new Hono();

    const db = new Kysely<DataBase>({
      dialect: new D1Dialect({ database: env.DEV_DB }),
    });

    app.use("*", cors({ origin: "*" }));

    app.route(
      "/api",
      createApiRouter({
        env,
        services: {
          authService: new AuthService({ env }),
          userService: new UserService({
            env,
            userRepository: new UserRepository({ db }),
          }),
        },
      })
    );

    return app.fetch(request, env, ctx);
  },
};
