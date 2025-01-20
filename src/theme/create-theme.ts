/** @format */

import { useState } from "react";
import { Theme } from "./interfaces";

export default (customTheme: Theme | undefined) => {
  const [theme, setTheme] = useState<Theme>();

  if (customTheme !== undefined) {
    setTheme(customTheme);
  }

  return { theme };
};
