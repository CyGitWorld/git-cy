"use client";

import { useState } from "react";

import { Button } from "@/components/button";
import { TextInput } from "@/components/text-input";

import {
  PostGuestbookPayload,
  usePostGuestbook,
} from "../../hooks/use-post-guesbook";
import { wrapper } from "./index.css";

interface UserInputProps {
  parentId?: PostGuestbookPayload["parentId"];
}

export const UserInput = ({ parentId }: UserInputProps) => {
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
