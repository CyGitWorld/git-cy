"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";
import { Hourglass } from "react95";
import { loginByGithub } from "../remote";

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
      const res = await loginByGithub({ code });
      // WIP: home 으로 라우팅
      router.push("/");
    })();
  }, []);
  // WIP: loading 가운데 표시
  return <Hourglass size={32} style={{ margin: 20 }} />;
}
