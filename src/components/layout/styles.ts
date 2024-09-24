/** @format */

import styled from "@/src/theme/styled";
import { LayoutProps } from ".";
import { Dimensions } from "react-native";

export default styled<LayoutProps>(({ layoutOn }) => {
  const { width, height } = Dimensions.get("window");
  return {
    whapperLayout: {
      height: "100%",
      width: "100%",
    },
    containerApp: {
      height: layoutOn ? height - 30 : height,
    },
  };
});
