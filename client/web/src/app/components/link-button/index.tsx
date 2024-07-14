"use client";

import Link from "next/link";

import { GithubLoginButton } from "@/app/oauth/GithubLoginButton";
import { useUser } from "@/hooks/use-login";

import { MinihomeButton } from "../minihome-button";

export const LinkButton = () => {
  const { isLogin, username } = useUser();
  return (
    <>
      {isLogin ? (
        <Link href={`/minihome/${username}/guestbook`}>
          <MinihomeButton />
        </Link>
      ) : isLogin === false ? (
        <GithubLoginButton />
      ) : null}
    </>
  );
};
