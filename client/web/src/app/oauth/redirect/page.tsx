"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";
import { Hourglass } from "react95";
import styled from "styled-components";

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
      try {
        await requestApiJson((api) =>
          api.auth.login.$post({
            json: {
              code,
            },
          })
        );

        router.push("/");
      } catch (e) {
        // TODO: Alert
        router.push("/");
      }
    })();
  }, []);
  return (
    <CenterPosition>
      <Hourglass size={80} style={{ margin: 20 }} />
    </CenterPosition>
  );
}

const CenterPosition = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;
