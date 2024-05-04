import queryString from "query-string";
import { publicProcedure, router } from "./trpc";
import { z } from "zod";

export const appRouter = router({
  ping: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(async ({ input }) => {
      return {
        message: "pong!",
        name: input.name,
      };
    }),
});

export type AppRouter = typeof appRouter;
