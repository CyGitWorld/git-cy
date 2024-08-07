/* eslint-disable no-restricted-exports */
/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { ExecutionContext, Hono } from "hono";
import { cors } from "hono/cors";
import { Kysely } from "kysely";
import { D1Dialect } from "kysely-d1";

import { createApiRouter } from "./router/api";
import { AuthService } from "./router/api/auth/auth.service";
import { CommentRepository } from "./router/api/comment/comment.repository";
import { CommentService } from "./router/api/comment/comment.service";
import { GuestbookRepository } from "./router/api/guestbook/guestbook.repository";
import { GuestbookService } from "./router/api/guestbook/guestbook.service";
import { MinihomeRepository } from "./router/api/minihome/minihome.repository";
import { MinihomeService } from "./router/api/minihome/minihome.service";
import { UserRepository } from "./router/api/user/user.repository";
import { UserService } from "./router/api/user/user.service";
import { createWidgetRouter } from "./router/widget";
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

    const userService = new UserService({
      env,
      userRepository: new UserRepository({
        db,
      }),
      minihomeService: new MinihomeService({
        env,
        minihomeRepository: new MinihomeRepository({ db }),
      }),
      guestbookService: new GuestbookService({
        env,
        gestbookRepository: new GuestbookRepository({ db }),
      }),
    });
    const authService = new AuthService({ env });
    const commentService = new CommentService({
      env,
      commentRepository: new CommentRepository({ db }),
      userService,
    });

    app.route(
      "/api",
      createApiRouter({
        env,
        services: {
          authService,
          userService,
          commentService,
        },
      })
    );

    app.route(
      "/widget",
      createWidgetRouter({
        services: {
          commentService,
        },
      })
    );

    return app.fetch(request, env, ctx);
  },
};
