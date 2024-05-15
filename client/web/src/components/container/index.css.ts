import { DESKTOP_MEDIA_QUERY, DESKTOP_MIN_WIDTH } from '@consts/media-query'
import { style } from "@vanilla-extract/css";

export const containerRootCss = style({
  maxWidth: `${DESKTOP_MIN_WIDTH}px`,
  height: "100%",
  margin: "0 auto",

  "@media": {
    [DESKTOP_MEDIA_QUERY]: {
      padding: "0 16px",
    },
  },
})