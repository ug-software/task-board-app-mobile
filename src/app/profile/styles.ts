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
        alignItems: "center",
        paddingVertical: 25,
        paddingHorizontal: 50
    },
    whapperConfigOptions: {
        width: "100%",
        marginTop: 25
    },
    whapperListOptions: {
        paddingHorizontal: 10
    },
    textOption: {
        marginLeft: 10
    }
}))