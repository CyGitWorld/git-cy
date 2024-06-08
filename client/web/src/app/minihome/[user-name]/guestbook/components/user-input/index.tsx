"use client";

import { Button } from "@/components/button";
import { TextInput } from "@/components/text-input";

import { wrapper } from "./index.css";

export const UserInput = () => {
  return (
    <div className={wrapper}>
      <TextInput multiline fullWidth />
      <Button>OK</Button>
    </div>
  );
};
