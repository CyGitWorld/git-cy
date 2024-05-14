import { style } from "@vanilla-extract/css";

const HEADER_HEIGT = 85;

export const plcaeholderCss = style({
  height: `${HEADER_HEIGT}px`
});

export const toolbarCss = style({
  height: `${HEADER_HEIGT}px`,
  justifyContent: 'space-between',
})

export const navButtonListCss = style({
  display: 'flex',
  gap: '4px',
})