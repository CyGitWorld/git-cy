import { Hono } from "hono";

import { type Env } from "../../worker-env";
import { AuthService } from "./auth/auth.service";
import { CommentService } from "./comment/comment.service";
import { createGuestbookController } from "./guestbook/guestbook.controller";
import { creaetTestRouter } from "./test";
import { createUserController } from "./user/user.controller";
import { UserService } from "./user/user.service";

export const createApiRouter = ({
  env,
  services,
}: {
  env: Env;
  services: {
    authService: AuthService;
    userService: UserService;
    commentService: CommentService;
  };
}) => {
  const api = new Hono()
    .route("/test", creaetTestRouter())
    .route(
      "/users",
      createUserController({
        authService: services.authService,
        userService: services.userService,
        env,
      })
    )
    .route(
      "/guestbooks",
      createGuestbookController({
        env,
        commentService: services.commentService,
        userService: services.userService,
      })
    );

  return api;
};

export type ApiRouter = ReturnType<typeof createApiRouter>;
