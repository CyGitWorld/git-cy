"use client";

import { useQuery } from "@tanstack/react-query";

import { GithubLoginButton } from "@/app/oauth/GithubLoginButton";
import { getApiPath, requestApiJson } from "@/common/api";
import { Divider } from "@/components/divider";
import { HonoTest } from "@/test/components/hono-test";

import { UserInput } from "../user-input";
import { guestbook } from "./index.css";

export function GuestbookContent() {
  // const { data, error, isSuccess, refetch } = useQuery({
  //   queryKey: [
  //     getApiPath((api) => api.guestbooks[":githubUserName"].$url()),
  //     "joohaem",
  //   ],
  //   queryFn: () =>
  //     requestApiJson((api) =>
  //       api.guestbooks[":githubUserName"].$get({
  //         param: {
  //           githubUserName: "joohaem",
  //         },
  //       })
  //     ),
  // });

  // console.log(data, isSuccess, error);

  return (
    <>
      <HonoTest />
      <GithubLoginButton />
      <UserInput />
      <article className={guestbook}>mapping</article>
      <Divider />
      <article className={guestbook}>mapping</article>
      <Divider />
      <article className={guestbook}>mapping</article>
      <Divider />
    </>
  );
}
