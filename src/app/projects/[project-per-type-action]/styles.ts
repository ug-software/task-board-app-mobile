import { styled } from "@/src/theme";

export const styleSheetIcon = styled()({
    whapperIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 5 * 16,
        width: 5 * 16
    }
});

export const styleSheetColor = styled<{color: string}>()(({color}) => ({
    whapperColor: {
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
    whapperColorAndIcon: {
        display: "flex",
        alignItems: "center",
        width: "50%"
    },
    containerColorAndIcon: {
        display: "flex",
        flexDirection: 'row'
    }
}))