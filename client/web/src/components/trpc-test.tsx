"use client";

import { FC } from "react";
import { trpcReact } from "@/trpc";

interface Props {}

export const TrpcTest: FC<Props> = ({}) => {
  const { data, refetch } = trpcReact.ping.useQuery({ name: "hello" });

  return (
    <div>
      <h2>TrpcTest</h2>
      <button onClick={() => refetch()}>Request</button>
      <div style={{ whiteSpace: "pre" }}>{JSON.stringify(data, null, 2)}</div>
    </div>
  );
};
