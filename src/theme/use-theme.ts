/** @format */

import { useContext, useMemo } from "react";
import ContextTheme from "./context";

export default () => {
  const theme = useContext(ContextTheme);

  return useMemo(() => theme, [theme]);
};
