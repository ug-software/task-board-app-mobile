/** @format */

import { ContextTheme } from "@/src/theme";
import { useContext } from "react";

export default () => {
  var { theme } = useContext(ContextTheme);

  return theme;
};
