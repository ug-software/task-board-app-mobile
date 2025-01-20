import { styled } from "@/src/theme";

export default styled()(({ theme }) => ({
    whapperPageProfile: {
        backgroundColor: theme.pallet.primary.background,
        height: "100%",
        width: "100%"
    },
    whapperUserInfo: {
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    whapperConfigOptions: {
        width: "100%"
    },
    whapperListOptions: {
        paddingHorizontal: 10
    },
    textOption: {
        marginLeft: 10
    }
}))