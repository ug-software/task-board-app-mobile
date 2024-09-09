/** @format */

import { createContext } from "react";
import { Theme } from "./interfaces";
//import useTheme from "../hooks/use-theme";
import theme from "./default-theme";

const ContextTheme = createContext<Theme>(theme);

export default ContextTheme;
//export { useTheme };
