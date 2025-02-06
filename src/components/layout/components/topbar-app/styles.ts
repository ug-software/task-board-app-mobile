/** @format */

import { styled } from "@/src/theme";
import { TopbarApp } from ".";
import { darken, lighten } from "@/src/theme/styled";

export default styled<Omit<TopbarApp, "children">>()(({
  alignItems,
  flexDirection,
  justifyContent,
  theme,
  padding,
  borderVisible,
  ...props
}) => ({
  whapperTopbarApp: {
    ...(borderVisible
      ? {
          borderBottomWidth: 1,
          borderColor: darken(theme.pallet.primary.background, 8),
        }
      : {}),
  },
  containerTopbarApp: {
    display: "flex",
    height: 70,
    justifyContent,
    alignItems,
    flexDirection,
    backgroundColor: theme.pallet.primary.background,
    paddingLeft: props.pl,
    paddingRight: props.pr,
    paddingTop: props.pt,
    paddingBottom: props.pb,
    padding,
  },
}));
