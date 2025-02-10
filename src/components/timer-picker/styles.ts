import { styled } from "@/src/theme"
import { alpha, darken, lighten } from "@/src/theme/styled";
import { TimePickerProps } from "./index";

const styleSheetTimePicker = styled<Omit<TimePickerProps, "label" | "value" | "onChange"> & { active: boolean, error: boolean, }>()(({ theme, active, fullWidth, width, error }) => ({
    whapperModal: {
        display: "flex",
        flexDirection:"row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: alpha(darken(theme.pallet.primary.background, 10), 0.6),
        width: "100%",
        height: "100%"
    },
    containerModal: {
        maxWidth: 400,
        width: "80%",
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: theme.pallet.primary.background,
        borderColor: darken(theme.pallet.primary.background, 10),
        padding: 10,
        display: "flex",
        justifyContent:"center",
        alignItems: "center"
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
    helperText: {
        color: "red",
        fontSize: 11
    },
    footerTimePicker: {
        display:"flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    typeTimePicker: {
        display: "flex",
        flexDirection: "row"
    },
    typeButtonTimePicker: {
        borderRadius: 4,
        paddingVertical: 5,
        paddingHorizontal: 10,
        //borderColor: theme.pallet.primary.main,
        margin: 3,
        //borderStyle: "solid",
        //borderWidth: 2
    },
    typeButtonTimePickerSelected: {
        backgroundColor: theme.pallet.primary.main,
        color: theme.pallet.primary.background
    },
    textLabelTime: {
        fontSize: 24,
        fontWeight: 500,
        marginRight: 20
    },
    action: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingHorizontal: 10,
        paddingTop: 10,
        width: "100%"
    }
}))

export default styleSheetTimePicker;