import { style } from "@vanilla-extract/css";

import { vars } from "@/consts/themes.css";

export const appbarCss = style({
  border: `2px solid ${vars.color.primaryContainerBorder} !important`,
  background: `${vars.color.primaryContainer} !important`,
  boxShadow: `${vars.shadow.primaryContainer} !important`
})

export const toolbarCss = style({
  justifyContent: 'space-between',
  height: `92px`,
})

export const navButtonListCss = style({
  display: 'flex',
  gap: '16px',
})
