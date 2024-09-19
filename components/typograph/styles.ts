/** @format */

import { styled } from "@/theme";
import { TypographProps } from ".";
import { gutter } from "@/theme/constants";

export default styled<TypographProps>(
  ({ theme, color, variant, fontWeight, gutterBottom, pb, pl, pr, pt }) => ({
    textWhapper: {
      ...(color !== undefined
        ? {
            color: theme.font.color[color],
          }
        : {
            color: theme.pallet.primary.text,
          }),
      fontSize: theme.font.fontSize[variant],
      fontWeight: fontWeight !== undefined ? fontWeight : "normal",
      marginBottom: gutterBottom ? gutter[variant] : 0,
      paddingBottom: pb,
      paddingLeft: pl,
      paddingRight: pr,
      paddingTop: pt,
    },
  })
);
