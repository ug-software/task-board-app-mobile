/** @format */

import { styled } from "@/src/theme";
import { ligten, darken } from "@/src/theme/styled";

export default styled<{ isActiveDate: boolean }>(({ theme, isActiveDate }) => ({
  whapperDateButtom: {
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    ...(isActiveDate
      ? {
          borderColor: theme.pallet.primary.main,
          backgroundColor: ligten(theme.pallet.primary.main, 85),
          height: 90,
          width: 70,
        }
      : {
          borderColor: darken(theme.pallet.primary.background, 8),
          height: 85,
          width: 65,
        }),
  },
  textColor: {
    ...(isActiveDate
      ? {
          color: theme.pallet.primary.primary,
        }
      : {
          color: darken(theme.pallet.primary.background, 75),
        }),
  },
}));
