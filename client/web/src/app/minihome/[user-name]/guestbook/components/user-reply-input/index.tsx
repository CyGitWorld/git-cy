"use client";

import { useState } from "react";

import { Button } from "@/components/button";
import { TextInput } from "@/components/text-input";
import { useUser } from "@/hooks/use-login";

import {
  PostGuestbookPayload,
  usePostGuestbook,
} from "../../hooks/use-post-guesbook";
import { wrapper } from "./index.css";

interface UserReplyInputProps {
  parentId?: PostGuestbookPayload["parentId"];
}

export const UserReplyInput = ({ parentId }: UserReplyInputProps) => {
  const { isLogin } = useUser();

  const [comment, setComment] = useState("");
  const { mutateAsync } = usePostGuestbook({
    payload: { parentId },
    onSuccess: () => {
      setComment("");
    },
  });

  return (
    <div className={wrapper}>
      ㄴ{" "}
      <TextInput
        variant="flat"
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <Button
        onClick={async () => {
          if (isLogin === false) {
            alert("Please login first !!");
            return;
          }

          if (comment === "") {
            return;
          }

          await mutateAsync({ content: comment });
        }}
      >
        Reply
      </Button>
    </div>
  );
};
