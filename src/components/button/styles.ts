/** @format */

import { styled } from "@/src/theme";
import { IButtonBaseProps } from "./interface";
import { darken, lighten, textColorBasedOnBackground } from "@/src/theme/styled";

export default styled<Omit<IButtonBaseProps, "children"> & { active: boolean }>()(({ variant, theme, fullWidth, active, mt, mb, ml, mr, size, disabled }) => ({
  whapperButtonBase: {
    marginTop: mt ? mt : 0,
    marginBottom: mb ? mb : 0,
    marginLeft: ml ? ml : 0,
    marginRight: mr ? mr : 0,
    width: fullWidth ? "100%" : "auto",
    paddingHorizontal: 10,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    ...(variant === "contained" && {
      backgroundColor: !disabled ? !active
        ? theme.pallet.primary.primary
        : lighten(theme.pallet.primary.primary, 20) :
        darken(theme.pallet.primary.background, 15),
    }),
    ...(variant === "outlined" && {
      backgroundColor: !active
        ? "transparent"
        : lighten(theme.pallet.primary.primary, 95),
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: theme.pallet.primary.primary,
    }),
    ...(variant === "text" && {
      backgroundColor: !active
        ? lighten(theme.pallet.primary.primary, 90)
        : lighten(theme.pallet.primary.primary, 85),
    }),
    ...(size === "small" && {
      height: 38,
    }),
    ...((size === "medium" || size === undefined) && {
      height: 50,
    }),
    ...(size === "large" && {
      height: 55,
    }),
  },
  textButtonBase: {
    fontSize: 15,
    ...(variant === "contained" && {
      color: !disabled ?
        textColorBasedOnBackground(theme.pallet.primary.primary) === "dark"
          ? theme.pallet.primary.text
          : theme.pallet.primary.background :
          darken(theme.pallet.primary.background, 60),
    }),
    ...(variant === "outlined" && {
      color: theme.pallet.primary.primary,
    }),
    ...(variant === "text" && {
      color: theme.pallet.primary.primary,
    }),
  },
  iconButtonBaseStart: {
    marginRight: 10,

    color:
      textColorBasedOnBackground(theme.pallet.primary.primary) === "dark"
        ? theme.pallet.primary.text
        : theme.pallet.primary.background,
    ...(size === "small" && {
      fontSize: 20,
    }),
    ...((size === "medium" || size === undefined) && {
      fontSize: 25,
    }),
    ...(size === "large" && {
      fontSize: 30,
    }),
  },
  iconButtonBaseEnd: {
    marginLeft: 10,
    fontSize: 15,
    color:
      textColorBasedOnBackground(theme.pallet.primary.primary) === "dark"
        ? theme.pallet.primary.text
        : theme.pallet.primary.background,
    ...(size === "small" && {
      fontSize: 20,
    }),
    ...((size === "medium" || size === undefined) && {
      fontSize: 25,
    }),
    ...(size === "large" && {
      fontSize: 30,
    }),
  },
}));
