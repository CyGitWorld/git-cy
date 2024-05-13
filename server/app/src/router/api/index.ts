import { AuthService } from "./auth/auth.service";
import { Hono } from "hono";
import { creaetTestRouter } from "./test";
import { createAuthController } from "./auth/auth.controller";
import { Env } from "../../worker";

export const createApiRouter = ({ env }: { env: Env }) => {
  const api = new Hono()
    .route("/test", creaetTestRouter())
    .route("/auth", createAuthController({ service: new AuthService(), env }));

  return api;
};

export type ApiRouter = ReturnType<typeof createApiRouter>;
