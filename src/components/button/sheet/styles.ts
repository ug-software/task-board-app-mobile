/** @format */

import { styled } from "@/src/theme";
import { alpha, darken } from "@/src/theme/styled";

export default styled(({ theme }) => ({
  whapperButtonSheet: {
    backgroundColor: alpha(darken(theme.pallet.primary.background, 50), 0.1),
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
  containerButtonSheet: {
    backgroundColor: theme.pallet.primary.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  whapperDot: {
    width: "100%",
    height: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    height: 8,
    width: 60,
    backgroundColor: darken(theme.pallet.primary.background, 50),
    borderRadius: 20,
  },
}));
