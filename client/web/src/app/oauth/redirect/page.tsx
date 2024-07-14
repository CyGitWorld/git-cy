"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Hourglass } from "react95";
import styled from "styled-components";

import { localStorage } from "@/common/local-storage";

import { useLoginMutation } from "../use-login-mutation";

function useGetOAuthCode() {
  const searchParams = useSearchParams();
  return searchParams.get("code");
}

export default function Page() {
  const code = useGetOAuthCode();
  const router = useRouter();
  const { mutateAsync: loginRequest } = useLoginMutation();

  useEffect(() => {
    if (code == null) {
      router.push("/");
      return;
    }
    (async () => {
      const { data } = await loginRequest({ code });
      localStorage.setItem("auth-token", data.accessToken);
      localStorage.setItem("username", data.githubUserName);

      router.push("/");
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
