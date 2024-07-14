import { Context, Next } from "hono";
import { HTTPException } from "hono/http-exception";

import { JwtPayload } from "../router/api/auth/types";
import { UserTable } from "../router/api/user/user.schema";
import { UserService } from "../router/api/user/user.service";

declare module "hono" {
  interface ContextVariableMap {
    user: UserTable;
  }
}

export const getUserJwtMiddleware =
  ({ userService }: { userService: UserService }) =>
  async (ctx: Context, next: Next) => {
    const payload = ctx.get("jwtPayload") as JwtPayload;
    if (payload == null) {
      throw new Error("jwt middleware 와 함께 사용해주세요.");
    }
    const user = await userService.getUserById(payload.sub);

    if (user == null) {
      throw new HTTPException(401, { message: "유저 정보가 없습니다." });
    }

    ctx.set("user", user);

    await next();
  };
