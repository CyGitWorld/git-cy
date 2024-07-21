import { style } from "@vanilla-extract/css";

export const inputWrapper = style({
  display: "flex",
  gap: "8px",
  marginBottom: "16px",
  width: "100%",
});

export const input = style({
  flex: "1",
});

export const previewContainer = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "350px",
});

export const svgImg = style({
  width: "100%",
  height: "100%",
});
