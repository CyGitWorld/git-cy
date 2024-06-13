import { Hono } from "hono";
import { jwt } from "hono/jwt";

import { type Env } from "../../../worker-env";

export const createWidgetController = ({ env }: { env: Env }) => {
  return new Hono()
    .get(
      "/",
      jwt({
        secret: env.JWT_SECRET_KEY,
      }),
      async (ctx) => {
        return ctx.json({
          success: true,
          data: { url: "https://github.com" },
        });
      }
    )
    .post(
      "/",
      jwt({
        secret: env.JWT_SECRET_KEY,
      }),
      async (ctx) => {
        return ctx.json({
          success: true,
          data: true,
        });
      }
    );
};
