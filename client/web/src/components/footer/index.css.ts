import { style } from "@vanilla-extract/css";

import { vars } from "@/consts/themes.css";

export const toolbarCss = style({
  justifyContent: 'space-between',
  height: `92px`,
  border: `2px solid ${vars.color.primaryContainerBorder}`,
  background: vars.color.primaryContainer,
  boxShadow: vars.shadow.primaryContainer
})

export const navButtonListCss = style({
  display: 'flex',
  gap: '16px',
})