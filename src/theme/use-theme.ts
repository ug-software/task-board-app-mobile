/** @format */

import { useContext } from "react";
import ContextTheme from "./context";

export default () => {
  const theme = useContext(ContextTheme);

  return theme;
};
