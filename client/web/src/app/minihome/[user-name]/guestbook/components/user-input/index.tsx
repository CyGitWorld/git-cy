"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { requestApiJson } from "@/common/api";
import { Button } from "@/components/button";
import { TextInput } from "@/components/text-input";

import { title, wrapper } from "./index.css";

interface PostGuestbookPayload {
  guestbookId: number;
  content: string;
  parentId?: number | null | undefined;
}

export const UserInput = () => {
  const [comment, setComment] = useState("");
  const { mutate } = useMutation({
    mutationFn: (payload: PostGuestbookPayload) =>
      requestApiJson((api) =>
        api.guestbooks.$post({
          json: payload,
        })
      ),
  });

  return (
    <div className={wrapper}>
      <div className={title}>Friends say</div>
      <TextInput
        multiline
        fullWidth
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <Button>OK</Button>
    </div>
  );
};
