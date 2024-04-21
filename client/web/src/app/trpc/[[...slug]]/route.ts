import { NextRequest } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const handler = async (req: NextRequest) => {
  const SERVER_TRPC_DOMAIN = process.env.SERVER_TRPC_DOMAIN;

  // Service Binding 을 사용할 수 있다면 사용합니다.
  if (SERVER_TRPC_DOMAIN == null || SERVER_TRPC_DOMAIN.trim() === "") {
    const { fetch } = getRequestContext().env.SERVER_APP_BINDING;

    try {
      return fetch(req);
    } catch (e) {
      return new Response(`서버 API에 연결할 수 없습니다. (Service Binding)`, {
        status: 500,
      });
    }
  }

  const url = new URL(req.url);

  url.host = process.env.SERVER_TRPC_DOMAIN ?? "UNKNOWN";

  try {
    return fetch(url, req);
  } catch (e) {
    return new Response(`서버 API에 연결할 수 없습니다.`, {
      status: 500,
    });
  }
};

export const GET = handler;
