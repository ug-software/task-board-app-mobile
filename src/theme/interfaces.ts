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
    warning: string;
    info: string;
  };
  font: {
    fontSize: {
      h1: number;
      h2: number;
      h3: number;
      h4: number;
      h5: number;
      h6: number;
      paragraph: number;
      subtitle: number;
    };
    fontFamilly: string;
    color: {
      primary: string;
      secundary: string;
      light: string;
      dark: string;
    };
  };
}
