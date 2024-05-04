"use client";

import { FC } from "react";
import { trpc } from "@/common/trpc";
import GithubLoginButton from "@/app/oauth/GithubLoginButton";

interface Props {}

export const TrpcTest: FC<Props> = ({}) => {
  const { data, refetch } = trpc.ping.useQuery({ name: "hello" });

  return (
    <div>
      <h2>Trpc Test</h2>
      <button onClick={() => refetch()}>Request</button>
      <div style={{ whiteSpace: "pre" }}>{JSON.stringify(data, null, 2)}</div>
      <GithubLoginButton />
    </div>
  );
};
