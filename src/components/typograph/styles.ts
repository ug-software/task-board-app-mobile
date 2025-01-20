/** @format */

import { styled } from "@/src/theme";
import { TypographProps } from ".";
import { gutter } from "@/src/theme/constants";

export default styled<TypographProps>()(({
  theme,
  color,
  variant,
  fontWeight,
  fontSize,
  gutterBottom,
  pb,
  pl,
  pr,
  pt,
}) => ({
  textWhapper: {
    ...(color !== undefined
      ? {
          color: theme.font.color[color],
        }
      : {
          color: theme.pallet.primary.text,
        }),
    fontSize: fontSize ? fontSize : theme.font.fontSize[variant],
    fontWeight: fontWeight !== undefined ? fontWeight : "normal",
    marginBottom: gutterBottom ? gutter[variant] : 0,
    paddingBottom: pb,
    paddingLeft: pl,
    paddingRight: pr,
    paddingTop: pt,
  },
}));
