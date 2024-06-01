import { AuthService } from "./auth/auth.service";
import { Hono } from "hono";
import { creaetTestRouter } from "./test";
import { createAuthController } from "./auth/auth.controller";
import { type Env } from "../../worker-env";

export const createApiRouter = ({
  env,
  services,
}: {
  env: Env;
  services: { authService: AuthService };
}) => {
  const api = new Hono()
    .route("/test", creaetTestRouter())
    .route(
      "/auth",
      createAuthController({ service: services.authService, env })
    );

  return api;
};

export type ApiRouter = ReturnType<typeof createApiRouter>;
