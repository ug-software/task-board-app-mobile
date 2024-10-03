/** @format */

export default (color: string, alpha: number) => {
  if (alpha < 0 || alpha > 1) {
    throw new Error("Alpha deve estar entre 0 e 1.");
  }

  const hexColor = color.startsWith("#") ? color.slice(1) : color;

  const r = parseInt(hexColor.substr(0, 2), 16);
  const g = parseInt(hexColor.substr(2, 2), 16);
  const b = parseInt(hexColor.substr(4, 2), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
