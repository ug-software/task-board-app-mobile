/** @format */

import { styled } from "@/src/theme";
import { alpha, darken } from "@/src/theme/styled";

export default styled()(({ theme }) => ({
  whapperDialog: {
    height: "100%",
    width: "100%",
    backgroundColor: alpha(darken(theme.pallet.primary.background, 50), 0.1),
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  containerDialog: {
    backgroundColor: theme.pallet.primary.background,
    minHeight: 10,
    minWidth: 10,
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: darken(theme.pallet.primary.background, 10),
  },
}));
