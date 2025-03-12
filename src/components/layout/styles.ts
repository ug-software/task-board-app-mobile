/** @format */

import styled from "@/src/theme/styled";
import { LayoutProps } from ".";
import { Dimensions } from "react-native";

export default styled<LayoutProps & { layoutOn: false }>()(({ layoutOn, width }) => ({
    whapperLayout: {
      height: "100%",
      width: "100%",
    },
    containerApp: {
      height: layoutOn ? width - 30 : width,
    },
}));
