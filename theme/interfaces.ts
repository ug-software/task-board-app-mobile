/** @format */

interface PalletColor {
  main: string;
  primary: string;
  secundary: string;
  text: string;
  background: string;
}

export interface Theme {
  mode: "dark" | "light";
  pallet: {
    primary: PalletColor;
    secundary: PalletColor;
    error: string;
    success: string;
  };
  font: {
    fontSize: {
      small: number;
      medium: number;
      large: number;
    };
    fontFamilly: string;
  };
}
