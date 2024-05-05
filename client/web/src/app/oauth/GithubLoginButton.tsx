"use client";

import { useRouter } from "next/navigation";
import queryString from "query-string";

export function GithubLoginButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        const githubAuthUri = queryString.stringifyUrl({
          url: "https://github.com/login/oauth/authorize",
          query: {
            client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
            redirect_uri: `${window.location.origin}/oauth/redirect`,
          },
        });
        router.push(githubAuthUri);
      }}
    >
      github login
    </button>
  );
}
