import { style } from "@vanilla-extract/css";

import { FOOTER_HEIGHT } from "@/components/footer/index.css";
import { HEADER_HEIGT } from "@/components/header/index.css";
import { vars } from "@/consts/themes.css";

export const mainContainerCss = style({
  padding: "96px 0 120px",
  background: vars.color.surface,
  minHeight: `calc(100vh - ${HEADER_HEIGT}px - ${FOOTER_HEIGHT}px)`,
});
