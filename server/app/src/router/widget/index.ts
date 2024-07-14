import { Hono } from "hono";

import { createGuestbookRoute } from "./guestbook";

export const createWidgetRouter = () => {
  const router = new Hono().route("/guestbook", createGuestbookRoute());

  return router;
};
