/** @format */

import { styled } from "@/theme";
import { darken, ligten } from "@/theme/styled";

export default styled<{ isActive?: boolean }>(({ theme, isActive }) => ({
  whapperAppBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 70,
    borderTopWidth: 1,
    borderColor: darken(theme.pallet.primary.background, 8),
  },
  buttonAppBar: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconButtonAppBar: {
    backgroundColor: isActive
      ? ligten(theme.pallet.primary.main, 85)
      : "transparent",
    padding: 5,
    borderRadius: 3,
    color: isActive ? theme.pallet.primary.primary : theme.pallet.primary.text,
  },
  textButtonAppBar: {
    color: isActive ? theme.pallet.primary.primary : theme.pallet.primary.text,
  },
}));
