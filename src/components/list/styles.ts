import { styled } from "@/src/theme";
import { darken } from "@/src/theme/styled";

export default styled()(({theme}) => ({
    whapperListItem: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        paddingVertical: 10,
        paddingHorizontal: 15,
        minHeight: 60,
        borderRadius: 20,
        marginTop: 5,
    }
}))