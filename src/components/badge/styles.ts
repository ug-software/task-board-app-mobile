/** @format */

import { styled } from "@/src/theme";

export default styled()(({ theme }) => ({
    wrapperBadge: {
        position: "relative",
        zIndex: 99,
    },
    contentBadge: {
        zIndex: 99,
        opacity: 1,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        width: 20,
        height: 20,
        position: "absolute",
        top: 0,
        right: 0,
        borderRadius: 50,
        backgroundColor: theme.pallet.primary.primary,
        color: theme.pallet.primary.background
    }
}));
