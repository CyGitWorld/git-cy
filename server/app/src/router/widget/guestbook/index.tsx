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

      const { result, comments } =
        await commentService.getAllGuestbookCommentsByGithubUserName(
          githubUserName
        );

      if (result === "notFound") {
        return ctx.body(null, { status: 404 });
      }

      const style = `




      `;

      const svg = await (
        <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#666666" />
          <foreignObject width="100%" height="100%">
            <div xmlns="http://www.w3.org/1999/xhtml">
              <style
                dangerouslySetInnerHTML={{
                  __html: style,
                }}
              ></style>
              <h1 style={{ color: "gold" }}>{githubUserName}</h1>
              {comments.map((comment) => (
                <div>
                  {comment.author.githubUserName}({comment.author.name}):{" "}
                  {comment.content}
                </div>
              ))}
            </div>
          </foreignObject>
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
