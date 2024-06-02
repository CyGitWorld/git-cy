import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { MOCK_GUEST_BOOK_LIST, createNewMockGuestBook } from "./mock";

export const createGuestbookController = ({}) => {
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
      zValidator(
        "json",
        z.object({
          content: z.string(),
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
