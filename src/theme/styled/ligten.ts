/**
 * Clareia uma cor hexadecimal.
 *
 * @format
 * @param {string} hex - A cor em formato hexadecimal (#RRGGBB).
 * @param {number} percent - A porcentagem para clarear a cor (0 a 100).
 * @returns {string} - A cor clareada em formato hexadecimal.
 */

export default (hex: string, percent: number): string => {
  // Remove o caractere '#' se estiver presente
  hex = hex.replace(/^#/, "");

  // Converte o hexadecimal para valores RGB
  let r: number = parseInt(hex.substring(0, 2), 16);
  let g: number = parseInt(hex.substring(2, 4), 16);
  let b: number = parseInt(hex.substring(4, 6), 16);

  // Calcula a quantidade de clareamento
  const factor: number = percent / 100;

  // Aplica o clareamento
  r = Math.round(r + (255 - r) * factor);
  g = Math.round(g + (255 - g) * factor);
  b = Math.round(b + (255 - b) * factor);

  // Garante que os valores estão dentro do intervalo [0, 255]
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));

  // Converte os valores RGB de volta para hexadecimal
  const toHex = (x: number): string => x.toString(16).padStart(2, "0");

  // Retorna a cor clareada em formato hexadecimal
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};
