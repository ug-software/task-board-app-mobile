/** @format */

import { styled } from "@/src/theme";
import { darken } from "@/src/theme/styled";

export default styled()(({ theme }) => ({
    whapperDragDivider: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: 30
    },
    divider: {
      height: 5,
      backgroundColor: darken(theme.pallet.primary.background, 60),
      width: 60,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10
    },
}));
