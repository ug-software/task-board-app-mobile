/** @format */

import { styled } from "@/src/theme";
import { DragProps } from ".";

export default styled<Omit<DragProps, "children">>()(({ height, width }) => ({
  dragArea: {
    height,
    width,
    display: "flex",
    flexDirection: "row",
  },
}));
