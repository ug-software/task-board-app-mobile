/** @format */

import { styled } from "@/src/theme";
import { ligten, darken, textColorBasedOnBackground } from "@/src/theme/styled";
import { TextFieldBase } from "..";

const createStyles = styled<Omit<TextFieldBase, "label"> & { active: boolean }>(
  ({ theme, active, fullWidth, width }) => ({
    whapperTextFieldFiled: {
      minWidth: "30%",
      width: fullWidth ? "100%" : width,
      paddingHorizontal: 10,
      paddingVertical: 1,
      borderRadius: 10,
      borderStyle: "solid",
      borderColor: active
        ? theme.pallet.primary.main
        : darken(theme.pallet.primary.background, 5),
      borderWidth: 1,
      backgroundColor: theme.pallet.primary.background,
    },
    labelTextFieldFiled: {
      color: active
        ? theme.pallet.primary.primary
        : ligten(theme.pallet.primary.text, 25),
      fontWeight: active ? "500" : "400",
    },
    inputTextFieldFiled: {
      textAlignVertical: "top",
      fontSize: 15,
    },
  })
);

export default createStyles;
