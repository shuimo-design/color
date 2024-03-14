/**
 * @description color tools
 * @author 阿怪
 * @date 2024/3/14 10:01
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { ColorType } from '../assets/colors.ts';
import { HexToHSL } from './transform/hex.hsl.ts';
import { hexToRGB } from './transform/hex.rgb.ts';
import { deltaE00ByRGB } from './transform/hex.lab.ts';


export const sortByHsl = (colorList: ColorType[]) => {
  return colorList.sort((a, b) => {
    const aHsl = HexToHSL(a.color);
    const bHsl = HexToHSL(b.color);
    return aHsl.h - bHsl.h;
  });
};


const getRedDistance = (color: ColorType) => {
  return deltaE00ByRGB(hexToRGB(color.color), { r: 255, g: 0, b: 0 });
};

const getGreenDistance = (color: ColorType) => {
  return deltaE00ByRGB(hexToRGB(color.color), { r: 0, g: 255, b: 0 });
};

const getBlueDistance = (color: ColorType) => {
  return deltaE00ByRGB(hexToRGB(color.color), { r: 0, g: 0, b: 255 });
};

export const sortByRed = (colorList: ColorType[]) => {
  return colorList.sort((a, b) => {
    return getRedDistance(a) - getRedDistance(b);
  });
};

export const sortByGreen = (colorList: ColorType[]) => {
  return colorList.sort((a, b) => {
    return getGreenDistance(a) - getGreenDistance(b);
  });
};

export const sortByBlue = (colorList: ColorType[]) => {
  return colorList.sort((a, b) => {
    return getBlueDistance(a) - getBlueDistance(b);
  });
};

