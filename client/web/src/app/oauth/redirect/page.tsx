"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";
import { Hourglass } from "react95";

import { requestApiJson } from "@/common/api";

export default function Page() {
  return (
    <CodeNullishGuard>
      <Content />
    </CodeNullishGuard>
  );
}

function useGetOAuthCode() {
  const searchParams = useSearchParams();
  return searchParams.get("code");
}

function CodeNullishGuard({ children }: PropsWithChildren) {
  const code = useGetOAuthCode();

  if (code == null) {
    return null;
  }

  return <>{children}</>;
}

function Content() {
  const code = useGetOAuthCode();
  const router = useRouter();

  useEffect(() => {
    if (code == null) {
      return;
    }
    (async () => {
      const { accessToken } = await requestApiJson((api) =>
        api.auth.login.$post({
          json: {
            code,
          },
        })
      );
      if (accessToken == null) {
        // WIP: 예외처리
        return;
      }
      router.push("/");
    })();
  }, []);
  // WIP: loading 가운데 표시
  return <Hourglass size={32} style={{ margin: 20 }} />;
}
