"use client";

import type { AppRouter } from "@repo/server-app";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { FC, useEffect, useState } from "react";

interface Props {}

const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "/trpc",
    }),
  ],
});

export const TrpcTest: FC<Props> = ({}) => {
  const [response, setResponse] = useState<unknown[]>([]);

  useEffect(() => {
    (async () => {
      console.log(await trpc.ping.query({ name: "HELLO" }));
    })();
  }, []);

  return (
    <div>
      <h2>TrpcTest</h2>
      <button
        onClick={() => {
          trpc.ping.query({ name: "Hello" }).then((res) => {
            setResponse([...response, res]);
          });
        }}
      >
        Request
      </button>
      <div style={{ whiteSpace: "pre" }}>
        {JSON.stringify(response, null, 2)}
      </div>
    </div>
  );
};
