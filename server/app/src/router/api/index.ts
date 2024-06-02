import { AuthService } from "./auth/auth.service";
import { Hono } from "hono";
import { creaetTestRouter } from "./test";
import { createUserController } from "./user/user.controller";
import { UserService } from "./user/user.service";
import { type Env } from "../../worker-env";

export const createApiRouter = ({
  env,
  services,
}: {
  env: Env;
  services: { authService: AuthService; userService: UserService };
}) => {
  const api = new Hono().route("/test", creaetTestRouter()).route(
    "/users",
    createUserController({
      authService: services.authService,
      userService: services.userService,
      env,
    })
  );

  return api;
};

export type ApiRouter = ReturnType<typeof createApiRouter>;
