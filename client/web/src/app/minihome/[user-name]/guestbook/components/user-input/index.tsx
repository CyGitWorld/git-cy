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

interface UserInputProps {
  parentId?: PostGuestbookPayload["parentId"];
}

export const UserInput = ({ parentId }: UserInputProps) => {
  const { isLogin } = useUser();

  const [comment, setComment] = useState("");
  const { mutate } = usePostGuestbook({
    payload: { parentId },
    onSuccess: () => {
      setComment("");
    },
  });

  return (
    <div className={wrapper}>
      <TextInput
        multiline
        fullWidth
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <Button
        onClick={() => {
          if (isLogin === false) {
            alert("Please login first !!");
            return;
          }

          if (comment === "") {
            return;
          }

          mutate({ content: comment });
        }}
      >
        OK
      </Button>
    </div>
  );
};
