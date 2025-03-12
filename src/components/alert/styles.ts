/** @format */

import { styled } from "@/src/theme";
import { AlertProps } from "./index";
import { darken, lighten } from "@/src/theme/styled";

export default styled<Omit<AlertProps, "label">>()(({ severity, variant, theme }) => ({
  whapperAlert: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 7,
    minWidth: "100%",
    //marginTop: 10,
    ...(variant === "container" && severity === "error" && {
      backgroundColor: lighten(theme.pallet.error, 80),
    }),
    ...(variant === "container" && severity === "info" && {
      backgroundColor: lighten(theme.pallet.info, 80),
    }),
    ...(variant === "container" && severity === "success" && {
      backgroundColor: lighten(theme.pallet.success, 80),
    }),
    ...(variant === "container" && severity === "warning" && {
      backgroundColor: lighten(theme.pallet.warning, 80),
    }),
    ...(variant === "filled" && severity === "error" && {
      backgroundColor: theme.pallet.error,
    }),
    ...(variant === "filled" && severity === "info" && {
      backgroundColor: theme.pallet.info,
    }),
    ...(variant === "filled" && severity === "success" && {
      backgroundColor: theme.pallet.success,
    }),
    ...(variant === "filled" && severity === "warning" && {
      backgroundColor: theme.pallet.warning,
    }),
    ...(variant === "outlined" && {
      borderWidth: 1,
      borderStyle: "solid"
    }),
    ...(variant === "outlined" && severity === "error" && {
      borderColor: theme.pallet.error,
    }),
    ...(variant === "outlined" && severity === "info" && {
      borderColor: theme.pallet.info,
    }),
    ...(variant === "outlined" && severity === "success" && {
      borderColor: theme.pallet.success,
    }),
    ...(variant === "outlined" && severity === "warning" && {
      borderColor: theme.pallet.warning,
    }),
  },
  whapperIconAlert: {
    paddingRight: 10
  },
  whapperLabelAlert: {
    flex: 1
  },
  labelAlert: {
    fontSize: 16,
    ...(variant === "container" && severity === "error" && {
      color: darken(theme.pallet.error, 30)
    }),
    ...(variant === "container" && severity === "info" && {
      color: darken(theme.pallet.info, 40)
    }),
    ...(variant === "container" && severity === "success" && {
      color: darken(theme.pallet.success, 40)
    }),
    ...(variant === "container" && severity === "warning" && {
      color: darken(theme.pallet.warning, 60)
    }),
    ...(variant === "filled" && {
      color: theme.pallet.primary.background
    }),
    ...(variant === "outlined" && severity === "error" && {
      color: theme.pallet.error,
    }),
    ...(variant === "outlined" && severity === "info" && {
      color: theme.pallet.info,
    }),
    ...(variant === "outlined" && severity === "success" && {
      color: theme.pallet.success,
    }),
    ...(variant === "outlined" && severity === "warning" && {
      color: theme.pallet.warning,
    }),
  },
  iconError: {
    fontSize: 26,
    ...(variant === "container" && {
      color: theme.pallet.error
    }),
    ...(variant === "filled" && {
      color: theme.pallet.primary.background
    }),
    ...(variant === "outlined" && {
      color: theme.pallet.error,
    }),
  },
  iconInfo: {
    fontSize: 26,
    ...(variant === "container" && {
      color: theme.pallet.info
    }),
    ...(variant === "filled" && {
      color: theme.pallet.primary.background
    }),
    ...(variant === "outlined" && {
      color: theme.pallet.info,
    }),
  },
  iconSuccess: {
    fontSize: 26,
    ...(variant === "container" && {
      color: theme.pallet.success
    }),
    ...(variant === "filled" && {
      color: theme.pallet.primary.background
    }),
    ...(variant === "outlined" && {
      color: theme.pallet.success,
    }),
  },
  iconWarning: {
    fontSize: 26,
    ...(variant === "container" && {
      color: theme.pallet.warning
    }),
    ...(variant === "filled" && {
      color: theme.pallet.primary.background
    }),
    ...(variant === "outlined" && {
      color: theme.pallet.warning,
    }),
  },
}));
