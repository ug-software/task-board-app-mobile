/** @format */

import { styled } from "@/src/theme";
import { alpha, darken } from "@/src/theme/styled";

export default styled<{ height: number }>()(({ theme, height }) => ({
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
    height: height,
  },
  whapperGesture: {
    width: "100%",
    height: 30,
  },
  whapperDot: {
    width: "100%",
    height: "100%",
    display: "flex",
    paddingTop: 10,
    alignItems: "center",
  },
  dot: {
    height: 6,
    backgroundColor: darken(theme.pallet.primary.background, 70),
    borderRadius: 10,
    paddingHorizontal: 10,
    width: "30%",
  },
}));
