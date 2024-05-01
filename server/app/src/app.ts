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
  login: publicProcedure
    .input(z.object({ code: z.string(), redirect_uri: z.string() }))
    .query(async ({ input, ctx }) => {
      const uri = queryString.stringifyUrl({
        url: `https://github.com/login/oauth/access_token`,
        query: {
          client_id: env.CLIENT_ID,
          client_secret: env.CLIENT_ID,
          redirect_uri: input.redirect_uri,
          code: input.code,
        },
      });
      const { access_token: accessToken } = await fetch(uri)
        .then((r) => r.json())
        .then((r) => r as { access_token: string });

      const { name } = await fetch(`https://api.github.com/user`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then((r) => r.json())
        .then((r) => r as { name: string });

      return { name, accessToken };
    }),
});

export type AppRouter = typeof appRouter;
