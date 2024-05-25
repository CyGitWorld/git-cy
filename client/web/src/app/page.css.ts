import { style } from "@vanilla-extract/css";

import { vars } from "@/consts/themes.css";

export const mainContainerCss = style({
  padding: '96px 0 120px',
  textAlign: 'center',
  background: vars.color.surface
})

export const titleCss = style({
  margin: '48px 0 24px',
});
