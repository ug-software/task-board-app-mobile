/** @format */

import { styled } from "@/src/theme";
import { darken, ligten } from "@/src/theme/styled";
import { IconButtonBase } from ".";

const createStyles = styled<Omit<IconButtonBase, "ref"> & { active: boolean }>(
  ({ active, theme, borderVisible, variant }) => ({
    whapperIconButton: {
      ...(variant === "outlined" && {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        width: 40,
        height: 40,
        backgroundColor: active
          ? ligten(theme.pallet.primary.primary, 95)
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
          ? ligten(theme.pallet.primary.primary, 95)
          : ligten(theme.pallet.primary.primary, 85),
      }),
      ...(borderVisible && {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: theme.pallet.primary.primary,
      }),
    },
  })
);

export default createStyles;
