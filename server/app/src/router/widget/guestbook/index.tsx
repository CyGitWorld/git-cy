import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import {} from "hono/jsx";
import { z } from "zod";

export const createGuestbookRoute = () => {
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

      const data = `<svg viewBox="0 0 240 80" xmlns='http://www.w3.org/2000/svg'>
        <text x="0" y="30" font-family="'sans-serif'" font-size="20" fill="#000000">${githubUserName}</text>
      </svg>`;

      const svg = await (
        <svg viewBox="0 0 240 80" xmlns="http://www.w3.org/2000/svg">
          <text
            x="0"
            y="30"
            fontFamily="'sans-serif'"
            fontSize="20"
            fill="#000000"
          >
            {githubUserName}
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
