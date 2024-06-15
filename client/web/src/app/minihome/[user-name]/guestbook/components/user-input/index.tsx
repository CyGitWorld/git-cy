"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { Button } from "@/components/button";
import { TextInput } from "@/components/text-input";

import { wrapper } from "./index.css";

export const UserInput = () => {
  const [comment, setComment] = useState("");
  // const { mutate } = useMutation({
  //   mutationFn: ({ code }: GuestbookType) =>
  //     requestApiJson((api) =>
  //       api.users.login.$post({
  //         json: {
  //           code,
  //         },
  //       })
  //     ),
  // });

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
      <Button>OK</Button>
    </div>
  );
};
