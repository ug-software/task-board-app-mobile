/** @format */

import { styled } from "@/src/theme";
import { darken, lighten } from "@/src/theme/styled";

export default styled<{ isActive?: boolean }>()(({ theme, isActive }) => ({
  whapperAppBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 70,
    borderTopWidth: 1,
    borderColor: darken(theme.pallet.primary.background, 8),
    zIndex: 1000,
  },
  buttonAppBar: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconButtonAppBar: {
    fontSize: 25,
    backgroundColor: isActive
      ? lighten(theme.pallet.primary.main, 85)
      : "transparent",
    padding: 5,
    borderRadius: 3,
    color: isActive ? theme.pallet.primary.primary : theme.pallet.primary.text,
  },
  textButtonAppBar: {
    color: isActive ? theme.pallet.primary.primary : theme.pallet.primary.text,
  },
}));
