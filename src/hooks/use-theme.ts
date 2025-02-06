/** @format */

import { ContextTheme } from "@/src/theme";
import { useContext } from "react";

export default () => {
  var { pallet } = useContext(ContextTheme);

  return pallet;
};
