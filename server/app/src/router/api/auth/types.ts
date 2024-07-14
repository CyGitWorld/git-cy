export type JwtPayload = {
  sub: string;
  name: string;
  exp: number;
  iat: number;
};
