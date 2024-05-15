import { style } from "@vanilla-extract/css";

import { DESKTOP_MEDIA_QUERY, DESKTOP_MIN_WIDTH } from '@/consts/media-query'

export const containerRootCss = style({
  width: "100%",
  maxWidth: `${DESKTOP_MIN_WIDTH}px`,
  height: "100%",
  margin: "0 auto",
  padding: "0 16px",
  
  "@media": {
    [DESKTOP_MEDIA_QUERY]: {
      padding: "0",
    },
  },
})
