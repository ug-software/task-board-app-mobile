import { styled } from "@/src/theme";
import { lighten } from "@/src/theme/styled";

export const styleSheetPageSchedule = styled<{color: string}>()(({ color, theme }) => ({
    whapperPageTaskPerAction: {
        backgroundColor: theme.pallet.primary.background,
        height: "100%",
        width: "100%",
        paddingHorizontal: 20,
        justifyContent: "space-between",
        paddingBottom: 10
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
        height: 40,
        borderRadius: 4,
        width: "100%",
        paddingHorizontal: 5,
        display: "flex",
        justifyContent: "center"
    },
    labelOptionStatus: {
        fontSize: 16
    }
}));

export const styleProjectOption = styled<{color: string}>()(({ color, theme }) => ({
    whapperProjectOption: {
        height: 40,
        borderRadius: 4,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    labelProjectOption: {
        fontSize: 16
    },
    IconProjectOption: {
        marginRight: 10,
        borderRadius: 5,
        padding: 3,
        backgroundColor: lighten(color, 80),
    }
}));