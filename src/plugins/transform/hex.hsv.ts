/**
 * @description hex to hsv
 * @author 阿怪
 * @date 2024/3/14 15:24
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { toFixed2 } from './tools.ts';

const hexToHSV = (hexColor: string) => {
  // Convert hex to RGB first
  let r = 0, g = 0, b = 0;
  if (hexColor.length == 4) {
    r = parseInt('0x' + hexColor[1] + hexColor[1]);
    g = parseInt('0x' + hexColor[2] + hexColor[2]);
    b = parseInt('0x' + hexColor[3] + hexColor[3]);
  } else if (hexColor.length == 7) {
    r = parseInt('0x' + hexColor[1] + hexColor[2]);
    g = parseInt('0x' + hexColor[3] + hexColor[4]);
    b = parseInt('0x' + hexColor[5] + hexColor[6]);
  }
  r /= 255;
  g /= 255;
  b /= 255;

  // Then to HSV
  let v = Math.max(r, g, b),
    c = v - Math.min(r, g, b);
  let h = c && ((v == r) ? (g - b) / c : ((v == g) ? 2 + (b - r) / c : 4 + (r - g) / c));
  h = 60 * (h < 0 ? h + 6 : h);
  let s = v && c / v;
  return [h || 0, s || 0, v];
};

export const hevToHSVStr = (hexColor: string) => {
  const [h, s, v] = hexToHSV(hexColor);
  return `hsv(${toFixed2(h)},${toFixed2(s * 100)}%,${toFixed2(v * 100)}%)`;
  // return `hsv(${h},${s * 100}%,${v * 100}%)`;
};
