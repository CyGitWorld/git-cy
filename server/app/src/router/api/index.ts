import { Hono } from "hono";
import { creaetTestRouter } from "./test";
import { createAuthServer } from "./auth";

export const createApiRouter = () => {
  const api = new Hono()
    .route("/test", creaetTestRouter())
    .route("/auth", createAuthServer());

  return api;
};

export type ApiRouter = ReturnType<typeof createApiRouter>;
