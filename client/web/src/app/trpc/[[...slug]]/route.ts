import { NextRequest } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const handler = async (req: NextRequest) => {
  const context = getRequestContext();
  const url = new URL(req.url);

  url.host = process.env.SERVER_TRPC_DOMAIN ?? "UNKNOWN";

  try {
    const response = await fetch(url, new Request(req));
    return response;
  } catch (e) {
    return new Response(`서버 API에 연결할 수 없습니다.`, {
      status: 500,
    });
  }
};

export const GET = handler;
