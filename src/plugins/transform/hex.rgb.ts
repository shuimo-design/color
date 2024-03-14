/**
 * @description hex to rgb
 * @author 阿怪
 * @date 2024/3/14 15:23
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

/**
 * cover hex to rgb
 * @param hexColor
 */
export const hexToRGB = (hexColor: string) => {
  const r = parseInt(hexColor.substring(1, 3), 16);
  const g = parseInt(hexColor.substring(3, 5), 16);
  const b = parseInt(hexColor.substring(5, 7), 16);
  return { r, g, b };
};


export const hexToRGBStr = (hexColor: string) => {
  const { r, g, b } = hexToRGB(hexColor);
  return `rgb(${r},${g},${b})`;
};
