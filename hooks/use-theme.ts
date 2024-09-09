/** @format */

import { ContextTheme } from "@/theme";
import { useContext } from "react";

export default () => {
  var { theme } = useContext(ContextTheme);

  return theme;
};
