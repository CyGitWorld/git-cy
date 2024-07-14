"use client";

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Fragment } from "react";

import { getApiPath, requestApiJson } from "@/common/api";
import { Divider } from "@/components/divider";

import { UserInput } from "../user-input";
import { UserReplyInput } from "../user-reply-input";
import { commentDate, guestbook } from "./index.css";

export function GuestbookContent() {
  const params = useParams();

  const { data } = useQuery({
    queryKey: [
      getApiPath((api) => api.guestbooks[":githubUserName"].$url()),
      params["user-name"],
    ],
    queryFn: () =>
      requestApiJson((api) =>
        api.guestbooks[":githubUserName"].$get({
          param: {
            githubUserName: params["user-name"] as string,
          },
        })
      ),
  });

  return (
    <>
      <UserInput />
      {data?.data.comments.map((comment) => {
        return (
          <Fragment key={comment.id}>
            <article className={guestbook}>
              <div>
                · {comment.content} (
                <Link
                  href={`/minihome/${comment.author.githubUserName}/guestbook`}
                >
                  {comment.author.githubUserName}
                </Link>
                ){" "}
                <span className={commentDate}>
                  {format(new Date(comment.createdAt), "yyyy.MM.dd")}
                </span>
              </div>
              <UserReplyInput parentId={comment.id} />
              {comment.replies.map((reply) => (
                <div key={reply.id}>
                  ㄴ {reply.content} (
                  <Link
                    href={`/minihome/${reply.author.githubUserName}/guestbook`}
                  >
                    {reply.author.githubUserName}
                  </Link>
                  ){" "}
                  <span className={commentDate}>
                    {format(new Date(reply.createdAt), "yyyy.MM.dd")}
                  </span>
                </div>
              ))}
            </article>
            <Divider />
          </Fragment>
        );
      })}
    </>
  );
}
