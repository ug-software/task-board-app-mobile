/** @format */

import { styled } from "@/src/theme";
import { darken } from "@/src/theme/styled";

export default styled()(({ theme }) => ({
  adjustableView: {
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 10,
    width: "100%",
    padding: 10,
  },
  dragArea: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 10,
    marginVertical: 5,
    width: "100%",
  },
  dragIcon: {
    height: 6,
    backgroundColor: darken(theme.pallet.primary.background, 70),
    borderRadius: 10,
    paddingHorizontal: 10,
    width: "30%",
  },
}));
