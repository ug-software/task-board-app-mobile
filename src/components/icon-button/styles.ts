/** @format */

import { styled } from "@/src/theme";
import { darken, lighten } from "@/src/theme/styled";
import { IconButtonBase } from ".";

const styleSheet = styled<Omit<IconButtonBase, "ref"> & { active: boolean }>()(({ active, theme, borderVisible, variant }) => ({
  whapperIconButton: {
    ...(variant === "outlined" && {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 50,
      width: 40,
      height: 40,
      backgroundColor: active
        ? lighten(theme.pallet.primary.primary, 95)
        : "transparent",
    }),
    ...(variant === "contained" && {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 50,
      width: 40,
      height: 40,
      backgroundColor: active
        ? lighten(theme.pallet.primary.primary, 95)
        : lighten(theme.pallet.primary.primary, 85),
    }),
    ...(borderVisible && {
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: theme.pallet.primary.primary,
    }),
  },
}));

export default styleSheet;
