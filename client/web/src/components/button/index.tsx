import { Button as BaseButton, ButtonProps as BaseButtonProps } from "react95";

export const Button = ({ ...props }: BaseButtonProps) => {
  return <BaseButton {...props} />;
};
