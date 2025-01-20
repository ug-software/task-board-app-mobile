/** @format */

import { styled } from "@/src/theme";
import { ligten, darken } from "@/src/theme/styled";

export default styled<{ isCurrentDate: boolean; isActive?: boolean }>()(({ theme, isCurrentDate, isActive }) => ({
  whapperDateButtom: {
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    ...(isCurrentDate
      ? {
          borderColor: theme.pallet.primary.main,
          height: 90,
          width: 70,
        }
      : {
          borderColor: darken(theme.pallet.primary.background, 8),
          height: 85,
          width: 65,
        }),
    ...(isActive && {
      backgroundColor: ligten(theme.pallet.primary.main, 85),
    }),
  },
  textColor: {
    ...(isActive
      ? {
          color: theme.pallet.primary.primary,
        }
      : {
          color: darken(theme.pallet.primary.background, 75),
        }),
  },
}));
