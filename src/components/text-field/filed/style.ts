/** @format */

import { styled } from "@/src/theme";
import { lighten, darken } from "@/src/theme/styled";
import { TextFieldBase } from "..";

const styleSheet = styled<Omit<TextFieldBase, "label"> & { active: boolean, error: boolean }>()(({ theme, active, fullWidth, width, error }) => ({
  whapperTextFieldFiled: {
    minWidth: "30%",
    width: fullWidth ? "100%" : width,
    paddingHorizontal: 10,
    paddingVertical: 1,
    borderRadius: 10,
    borderStyle: "solid",
    borderColor: active
      ? theme.pallet.primary.main
      : error ? "red" : darken(theme.pallet.primary.background, 5),
    borderWidth: 1,
    backgroundColor: theme.pallet.primary.background,
  },
  labelTextFieldFiled: {
    color: active
      ? theme.pallet.primary.primary
      : error ? "red" : lighten(theme.pallet.primary.text, 25),
    fontWeight: active ? "500" : "400",
  },
  inputTextFieldFiled: {
    textAlignVertical: "top",
    fontSize: 15,
  },
  helperText: {
    color: "red",
    fontSize: 11
  }
}));

export default styleSheet;
