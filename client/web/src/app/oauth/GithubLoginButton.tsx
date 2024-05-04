"use client";

import { useRouter } from "next/navigation";
import queryString from "query-string";

import { GITHUB_AUTHORIZE_SERVER_URL } from "./constant";

export function GithubLoginButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        const githubAuthUri = queryString.stringifyUrl({
          url: GITHUB_AUTHORIZE_SERVER_URL,
          query: {
            client_id: process.env.CLIENT_ID,
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
