import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

import { CommentService } from "../../api/comment/comment.service";

export const createGuestbookRoute = ({
  commentService,
}: {
  commentService: CommentService;
}) => {
  const route = new Hono();

  route.get(
    "/:githubUserName/basic.svg",
    zValidator(
      "param",
      z.object({
        githubUserName: z.string(),
      })
    ),
    async (ctx) => {
      const { githubUserName } = ctx.req.valid("param");

      const { result, comments, guestbookId } =
        await commentService.getAllGuestbookCommentsByGithubUserName(
          githubUserName
        );

      if (result === "notFound") {
        return ctx.body(null, { status: 404 });
      }

      const svg = await (
        <svg viewBox="0 0 240 80" xmlns="http://www.w3.org/2000/svg">
          <text
            x="0"
            y="10"
            fontFamily="'sans-serif'"
            fontSize="10"
            fill="#000000"
          >
            {githubUserName}
          </text>
          <text
            x="0"
            y="20"
            fontFamily="'sans-serif'"
            fontSize="10"
            fill="#000000"
          >
            {comments.map((c) => c.content).join("\n")}
          </text>
        </svg>
      );

      const response = new Response(svg, {
        headers: {
          "Content-Type": "image/svg+xml",
          "Access-Control-Allow-Origin": "*",
        },
      });

      return response;
    }
  );

  return route;
};
