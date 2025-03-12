/** @format */

const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  // Remove o hash (#) se estiver presente
  hex = hex.replace(/^#/, "");

  // Verifica se o hex é curto (ex. #fff) e expande para 6 dígitos
  if (hex.length === 4) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  // Converte hex para RGB
  const bigint = parseInt(hex, 16);
  return {
    r: (bigint >> 16) & 0xff,
    g: (bigint >> 8) & 0xff,
    b: (bigint >> 0) & 0xff,
  };
};

const luminance = (r: number, g: number, b: number): number => {
  // Normaliza os valores RGB
  const a = [r, g, b].map((value) => {
    const normalized = value / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : Math.pow((normalized + 0.055) / 1.055, 2.4);
  });

  // Calcula a luminância
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

const textColorBasedOnBackground = (hexColor: string): "light" | "dark" => {
  const { r, g, b } = hexToRgb(hexColor);
  const bgLuminance = luminance(r, g, b);

  // Define o limiar para decidir se o texto deve ser claro ou escuro
  const threshold = 0.5; // Valor pode ser ajustado conforme necessário

  return bgLuminance > threshold ? "dark" : "light";
};

export { luminance, textColorBasedOnBackground };
