import { styled } from "@/src/theme";
import { alpha, darken, lighten } from "@/src/theme/styled";
import { TextFieldBase } from "../text-field";

export const styleSheetSelectField = styled<Omit<TextFieldBase, "label"> & { active: boolean, error: boolean, }>()(({ theme, active, fullWidth, width, error }) => ({
    whapperModal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: alpha(theme.pallet.primary.background, 0.6),
        height: "100%",
        width: "100%"
    },
    containerModal: {
        maxWidth: 400,
        width: "80%",
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: theme.pallet.primary.background,
        borderColor: darken(theme.pallet.primary.background, 10),
        padding: 10
    },
    textInput: {
        color: "black"
    },
    option: {
        padding: 5,
        borderBottomStyle: "solid",
        borderBottomColor: darken(theme.pallet.primary.background, 10)
    },
    whapperTextFieldFiled: {
        minWidth: "30%",
        width: fullWidth ? "100%" : width,
        paddingHorizontal: 10,
        paddingTop: 1,
        paddingBottom: 10,
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