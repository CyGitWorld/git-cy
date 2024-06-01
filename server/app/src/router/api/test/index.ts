import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { Kysely } from "kysely";
import { D1Dialect } from "kysely-d1";
import { z } from "zod";

type DataBase = {
  Customers: { CustomerId: number; CompanyName: string; ContactName: string };
};

export const creaetTestRouter = () => {
  return new Hono()
    .get("/v1/hono-test-get", async (c) => {
      const db = new Kysely<DataBase>({
        dialect: new D1Dialect({ database: c.env!.DEV_DB }),
      });

      const result = await db
        .selectFrom("Customers")
        .selectAll()
        .where("CustomerId", "=", 1)
        .executeTakeFirst();

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
