/** @format */

import { styled } from "@/theme";
import { ligten, textColorBasedOnBackground } from "@/theme/styled";

const createStyles = styled<{ active: boolean }>(({ theme, active }) => ({
  whapperButtonContained: {
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: !active
      ? theme.pallet.primary.primary
      : ligten(theme.pallet.primary.primary, 20),
  },
  textButtonContained: {
    color:
      textColorBasedOnBackground(theme.pallet.primary.primary) === "dark"
        ? theme.pallet.primary.text
        : theme.pallet.primary.background,
  },
  iconContainedStart: {
    marginRight: 10,
    fontSize: 15,
    color:
      textColorBasedOnBackground(theme.pallet.primary.primary) === "dark"
        ? theme.pallet.primary.text
        : theme.pallet.primary.background,
  },
  iconContainedEnd: {
    marginLeft: 10,
    fontSize: 15,
    color:
      textColorBasedOnBackground(theme.pallet.primary.primary) === "dark"
        ? theme.pallet.primary.text
        : theme.pallet.primary.background,
  },
}));

export default createStyles;
