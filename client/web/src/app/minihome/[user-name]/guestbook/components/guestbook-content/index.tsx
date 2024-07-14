"use client";

import { Comment } from "@repo/server-app/src/router/api/comment/comment.schema";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Fragment } from "react";
import { Avatar } from "react95";

import { GithubLoginButton } from "@/app/oauth/GithubLoginButton";
import { getApiPath, requestApiJson } from "@/common/api";
import { Divider } from "@/components/divider";

import { UserInput } from "../user-input";
import { commentDate, guestbook } from "./index.css";

const TEMP_COMMENTS: Comment[] = [
  {
    id: 1,
    guestbookId: 1,
    authorId: 1,
    content: "good",
    parentId: null,
    createdAt: "2021-06-01T00:00:00",
    updatedAt: "2021-06-01T00:00:00",
    isDeleted: 0,
  },
  {
    id: 2,
    guestbookId: 2,
    authorId: 2,
    content: "nice",
    parentId: null,
    createdAt: "2021-06-01T00:00:00",
    updatedAt: "2021-06-01T00:00:00",
    isDeleted: 0,
  },
  {
    id: 3,
    guestbookId: 3,
    authorId: 3,
    content: "perfect",
    parentId: null,
    createdAt: "2021-06-01T00:00:00",
    updatedAt: "2021-06-01T00:00:00",
    isDeleted: 0,
  },
];

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
      <UserInput />
      {TEMP_COMMENTS.map((comment) => (
        <Fragment key={comment.id}>
          <article className={guestbook}>
            <div>
              · {comment.content} ({comment.authorId}){" "}
              <span className={commentDate}>
                {format(new Date(comment.createdAt), "yyyy.MM.dd")}
              </span>
            </div>
          </article>
          <Divider />
        </Fragment>
      ))}
    </>
  );
}
