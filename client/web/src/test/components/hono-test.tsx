"use client";

import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

import { getApiPath, requestApiJson } from "@/common/api";

interface Props {}

export const HonoTest: FC<Props> = ({}) => {
  const { data, refetch } = useQuery({
    queryKey: [getApiPath((api) => api.test.v1["hono-test-post"].$url())],
    queryFn: () =>
      requestApiJson((api) =>
        api.test.v1["hono-test-post"].$post({ json: { name: "김의진" } })
      ),
  });

  return (
    <div>
      <h2>Hono Test</h2>
      <button onClick={() => refetch()}>Request</button>
      <div style={{ whiteSpace: "pre" }}>{JSON.stringify(data, null, 2)}</div>
      <div>{data?.result}</div>
    </div>
  );
};
