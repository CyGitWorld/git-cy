import { AuthService } from "./auth/auth.service";
import { Hono } from "hono";
import { creaetTestRouter } from "./test";
import { createAuthController } from "./auth/auth.controller";
import { Env } from "../../worker";
import { UserService } from "./user/user.service";

export const createApiRouter = ({
  env,
  services,
}: {
  env: Env;
  services: { authService: AuthService; userService: UserService };
}) => {
  const api = new Hono().route("/test", creaetTestRouter()).route(
    "/auth",
    createAuthController({
      authService: services.authService,
      userService: services.userService,
      env,
    })
  );

  return api;
};

export type ApiRouter = ReturnType<typeof createApiRouter>;
