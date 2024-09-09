/** @format */

import amber from "./colors/amber";
import green from "./colors/green";
import grey from "./colors/grey";
import purple from "./colors/purple";
import red from "./colors/red";
import { Theme } from "./interfaces";

const theme: Theme = {
  mode: "light",
  font: {
    fontFamilly: "Roboto",
    fontSize: {
      large: 16,
      medium: 12,
      small: 8,
    },
  },
  pallet: {
    success: green[500],
    error: red[500],
    primary: {
      background: grey[50],
      main: purple[300],
      primary: purple[500],
      secundary: purple[500],
      text: grey[900],
    },
    secundary: {
      background: grey[50],
      main: amber[300],
      primary: amber[500],
      secundary: amber[500],
      text: grey[900],
    },
  },
};

export default theme;
