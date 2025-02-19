import { styled } from "@/src/theme";
import { darken, lighten } from "@/src/theme/styled";

export const styleSheetIcon = styled<{color: string | undefined}>()(({ theme, color }) => ({
    containerIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 5 * 16,
        minWidth: 5 * 16,
    },
     wrapperIcon: { 
        position: "absolute", 
        left: 10, 
        bottom: 10,
        minHeight: 5 * 16,
        minWidth: 5 * 16,
        borderWidth: 2,
        borderStyle: "solid",
        borderRadius: 10,
        borderColor: color && darken(color, 30),
        backgroundColor: theme.pallet.primary.background
    }
}));

export const styleSheetColor = styled<{color: string}>()(({color}) => ({
    whapperColor: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 5 * 16,
        width: 5 * 16
    }
}));

export const styleSheetPageProject = styled<{color: string}>()(({ color, theme }) => ({
    whapperPageProject: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        width: "100%",
        backgroundColor: theme.pallet.primary.background,
        paddingRight: 20,
        paddingLeft: 10,
        paddingBottom: 10
    },
    containerTextField: {
        marginBottom: 15,
        width: "100%"
    },
    wrapperColorContainer: {
        position: "relative",
        height: 125, 
        width: "100%",
        borderRadius: 10,
        marginBottom: 15,
        alignItems: "center",
        justifyContent: "center"
    }
}))