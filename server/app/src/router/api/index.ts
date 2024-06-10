import { AuthService } from "./auth/auth.service";
import { Hono } from "hono";
import { creaetTestRouter } from "./test";
import { createUserController } from "./user/user.controller";
import { UserService } from "./user/user.service";
import { type Env } from "../../worker-env";
import { createGuestbookController } from "./guestbook/guestbook.controller";
import { createWidgetController } from "./widget/widget.controller";
import { CommentService } from "./comment/comment.service";

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
    )
    .route("/widgets", createWidgetController({ env }));

  return api;
};

export type ApiRouter = ReturnType<typeof createApiRouter>;
