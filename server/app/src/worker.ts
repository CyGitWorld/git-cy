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
import { UserService } from "./router/api/auth/user.service";
import { UserRepository } from "./router/api/auth/user.repository";
import { DataBase } from "./types/database";

export interface Env {
  // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
  // MY_KV_NAMESPACE: KVNamespace;
  //
  // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
  // MY_DURABLE_OBJECT: DurableObjectNamespace;
  //
  // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
  // MY_BUCKET: R2Bucket;
  //
  // Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
  // MY_SERVICE: Fetcher;
  //
  // Example binding to a Queue. Learn more at https://developers.cloudflare.com/queues/javascript-apis/
  // MY_QUEUE: Queue;

  // D1
  DEV_DB: D1Database;

  // Environment Variables
  CLIENT_ID: string;
  CLIENT_SECRET: string;
  OAUTH_REDIRECT_URI: string;
  JWT_SECRET_KEY: string;
}

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
