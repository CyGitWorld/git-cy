import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

export const creaetTestRouter = () => {
  return new Hono()
    .get("/v1/hono-test-get", (c) => {
      return c.json({ result: "test success 1" }, 200);
    })
    .post(
      "/v1/hono-test-post",
      zValidator(
        "json",
        z.object({
          name: z.string(),
        })
      ),
      (c) => {
        const { name } = c.req.valid("json");

        return c.json({ result: `Hello ${name}` });
      }
    );
};
