/** @format */

import { styled } from "@/src/theme";
import { lighten } from "@/src/theme/styled";

export default styled()(({ theme }) => ({
    whapperLoaddingComponent: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000,
        position: "absolute",
        height: "100%",
        width: "100%",
        backgroundColor: lighten(theme.pallet.primary.main, 80)
    }
}));
