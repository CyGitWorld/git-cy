import { style } from "@vanilla-extract/css";

export const wrapper = style({
  width: "100%",
  display: "flex",
  gap: "4px",
});

export const title = style({
  paddingRight: "4px",
  fontSize: "20px",
  display: "flex",
  height: "100%",
  alignItems: "center",
  whiteSpace: "nowrap",
});
