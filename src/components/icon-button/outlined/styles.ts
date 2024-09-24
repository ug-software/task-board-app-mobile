/** @format */

import { styled } from "@/src/theme";
import { IconButtonBase } from "..";
import { darken, ligten } from "@/src/theme/styled";

const createStyles = styled<Omit<IconButtonBase, "ref"> & { active: boolean }>(
  ({ active, theme }) => ({
    whapperIconButton: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 50,
      width: 40,
      height: 40,
      backgroundColor: active
        ? ligten(theme.pallet.primary.primary, 95)
        : "transparent",
    },
  })
);

export default createStyles;
