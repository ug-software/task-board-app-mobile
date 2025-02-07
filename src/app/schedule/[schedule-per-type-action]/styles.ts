import { styled } from "@/src/theme";
import { darken, lighten } from "@/src/theme/styled";

export const styleSheetPageSchedule = styled<{color: string}>()(({ color, theme }) => ({
    whapperPageTaskPerAction: {
        backgroundColor: theme.pallet.primary.background,
        height: "100%",
        width: "100%",
        paddingHorizontal: 20
    },
    containerTextField: {
        marginBottom: 15,
        width: "100%"
    },
    whapperModal: {
        display: "flex",
        alignItems: "center",
        backgroundColor: lighten(theme.pallet.primary.background, 60)
    }
}));

export const styleStatusOption = styled<{color: string}>()(({ color, theme }) => ({
    whapperOptionStatus: {
        backgroundColor: lighten(color, 80),
        height: 40,
        borderRadius: 4,
        width: "100%",
        paddingHorizontal: 20,
        display: "flex",
        justifyContent: "center"
    },
    labelOptionStatus: {
        fontSize: 16,
        color: darken(color, 50)
    }
}));