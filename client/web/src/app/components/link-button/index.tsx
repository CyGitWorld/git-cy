"use client";

import Link from "next/link";

import { GithubLoginButton } from "@/app/oauth/GithubLoginButton";
import { checkLogin, getUsername } from "@/utils/login";

import { MinihomeButton } from "../minihome-button";

export const LinkButton = () => {
  return (
    <>
      {checkLogin() ? (
        <Link href={`/minihome/${getUsername()}/guestbook`}>
          <MinihomeButton />
        </Link>
      ) : (
        <GithubLoginButton />
      )}
    </>
  );
};
