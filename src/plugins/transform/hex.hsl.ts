/**
 * @description hex to hsl
 * @author 阿怪
 * @date 2024/3/14 15:22
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


import { hexToRGB } from './hex.rgb.ts';
import { toFixed2 } from './tools.ts';


/**
 * cover hex to hsl
 * @param r
 * @param g
 * @param b
 */
const RGBToHSL = ({ r, g, b }: { r: number, g: number, b: number }) => {
  r /= 255, g /= 255, b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h: number = 0, s: number, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h: h * 360, s, l };
};

export const HexToHSL = (hexColor: string) => {
  return RGBToHSL(hexToRGB(hexColor));
};

export const hexToHSLStr = (hexColor: string) => {
  const { h, s, l } = HexToHSL(hexColor);
  // return `hsl(${h},${s * 100}%,${l * 100}%)`;
  return `hsl(${toFixed2(h)},${toFixed2(s * 100)}%,${toFixed2(l * 100)}%)`;
};
