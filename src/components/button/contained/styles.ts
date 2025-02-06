/** @format */

import { styled } from "@/src/theme";
import { lighten, textColorBasedOnBackground } from "@/src/theme/styled";
import { IButtonBaseProps } from "../interface";

const styleSheet = styled<Omit<IButtonBaseProps, "children"> & { active: boolean }>()(({ theme, active, fullWidth, mt, mb, mr, ml }) => ({
  whapperButtonContained: {
    paddingHorizontal: 10,
    height: 50,
    width: fullWidth ? "100%" : "auto",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: !active
      ? theme.pallet.primary.primary
      : lighten(theme.pallet.primary.primary, 20),
    marginTop: mt ? mt : 0,
    marginBottom: mb ? mb : 0,
    marginLeft: ml ? ml : 0,
    marginRight: mr ? mr : 0,
  },
  textButtonContained: {
    fontSize: 15,
    color:
      textColorBasedOnBackground(theme.pallet.primary.primary) === "dark"
        ? theme.pallet.primary.text
        : theme.pallet.primary.background,
  },
  iconContainedStart: {
    marginRight: 10,
    fontSize: 15,
    color:
      textColorBasedOnBackground(theme.pallet.primary.primary) === "dark"
        ? theme.pallet.primary.text
        : theme.pallet.primary.background,
  },
  iconContainedEnd: {
    marginLeft: 10,
    fontSize: 15,
    color:
      textColorBasedOnBackground(theme.pallet.primary.primary) === "dark"
        ? theme.pallet.primary.text
        : theme.pallet.primary.background,
  },
}));

export default styleSheet;
