import { Hono } from "hono";

import { CommentService } from "../api/comment/comment.service";
import { createGuestbookRoute } from "./guestbook";

export const createWidgetRouter = ({
  services,
}: {
  services: {
    commentService: CommentService;
  };
}) => {
  const router = new Hono().route(
    "/guestbook",
    createGuestbookRoute({ commentService: services.commentService })
  );

  return router;
};
