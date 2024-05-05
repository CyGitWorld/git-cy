"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Hourglass } from "react95";
import styled from "styled-components";

import { requestApiJson } from "@/common/api";

function useGetOAuthCode() {
  const searchParams = useSearchParams();
  return searchParams.get("code");
}

export default function Page() {
  const code = useGetOAuthCode();
  const router = useRouter();

  useEffect(() => {
    if (code == null) {
      router.push("/");
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
