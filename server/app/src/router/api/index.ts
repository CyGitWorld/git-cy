import { AuthService } from "./auth/auth.service";
import { Hono } from "hono";
import { creaetTestRouter } from "./test";
import { createAuthController } from "./auth/auth.controller";

export const createApiRouter = () => {
  const api = new Hono()
    .route("/test", creaetTestRouter())
    .route("/auth", createAuthController(new AuthService()));

  return api;
};

export type ApiRouter = ReturnType<typeof createApiRouter>;
