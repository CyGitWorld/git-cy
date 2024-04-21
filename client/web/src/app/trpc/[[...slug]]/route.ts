import { NextRequest } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const handler = async (req: NextRequest) => {
  const SERVER_TRPC_DOMAIN = process.env.SERVER_TRPC_DOMAIN;

  // Service Binding 을 사용할 수 있다면 사용합니다.
  if (SERVER_TRPC_DOMAIN == null || SERVER_TRPC_DOMAIN.trim() === "") {
    const fetcher = getRequestContext().env.SERVER_APP_BINDING;

    try {
      return fetcher.fetch(req);
    } catch (e) {
      console.error(e);
      return new Response(`Cannot connect to server. (Service Binding)`, {
        status: 500,
      });
    }
  }

  const url = new URL(req.url);

  url.host = process.env.SERVER_TRPC_DOMAIN ?? "UNKNOWN";

  try {
    return fetch(url, req);
  } catch (e) {
    console.error(e);
    return new Response(`Cannot connect to server.`, {
      status: 500,
    });
  }
};

export const GET = handler;
