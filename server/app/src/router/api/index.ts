import { Hono } from "hono";
import { creaetTestRouter } from "./test";

export const createApiRouter = () => {
  const api = new Hono().route("/test", creaetTestRouter());

  return api;
};

export type ApiRouter = ReturnType<typeof createApiRouter>;
