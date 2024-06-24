"use client";

import {
  TextInput as BaseTextInput,
  TextInputProps as BaseTextInputProps,
} from "react95";

export const TextInput = ({ ...props }: BaseTextInputProps) => {
  return <BaseTextInput {...props} />;
};
