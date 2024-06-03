import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { MOCK_GUEST_BOOK_LIST, createNewMockGuestBook } from "./mock";
import { jwt } from "hono/jwt";
import { type Env } from "../../../worker-env";

export const createGuestbookController = ({ env }: { env: Env }) => {
  return new Hono()
    .get(
      "/",
      zValidator(
        "param",
        z.object({
          githubUserName: z.string(),
        })
      ),
      async (ctx) => {
        return ctx.json({
          success: true,
          data: MOCK_GUEST_BOOK_LIST,
        });
      }
    )
    .post(
      "/",
      jwt({
        secret: env.JWT_SECRET_KEY,
      }),
      zValidator(
        "json",
        z.object({
          content: z.string(),
          guestbookId: z.number(),
          parentCommentId: z.nullable(z.number()),
        })
      ),
      async (ctx) => {
        const { content } = ctx.req.valid("json");
        return ctx.json({
          success: true,
          data: createNewMockGuestBook({ content }),
        });
      }
    )
    .put(
      "/",
      jwt({
        secret: env.JWT_SECRET_KEY,
      }),
      zValidator(
        "json",
        z.object({
          content: z.string(),
          commentId: z.number(),
        })
      ),
      async (ctx) => {
        const { content } = ctx.req.valid("json");
        return ctx.json({
          success: true,
          data: createNewMockGuestBook({ content }),
        });
      }
    )
    .delete(
      "/",
      jwt({
        secret: env.JWT_SECRET_KEY,
      }),
      zValidator(
        "json",
        z.object({
          commentId: z.number(),
        })
      ),
      async (ctx) => {
        ctx.req.valid("json");
        return ctx.json({
          success: true,
          data: true,
        });
      }
    );
};
