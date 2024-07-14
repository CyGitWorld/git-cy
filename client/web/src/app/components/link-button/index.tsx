"use client";

import Link from "next/link";

import { GithubLoginButton } from "@/app/oauth/GithubLoginButton";
import { localStorage } from "@/common/local-storage";

import { MinihomeButton } from "../minihome-button";

export const LinkButton = () => {
  return (
    <>
      {localStorage.getItem("auth-token") != null ? (
        <Link href={`/minihome/${localStorage.getItem("username")}/guestbook`}>
          <MinihomeButton />
        </Link>
      ) : (
        <GithubLoginButton />
      )}
    </>
  );
};
