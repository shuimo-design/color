/**
 * @description colors hook
 * @author 阿怪
 * @date 2024/3/14 09:44
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { computed, ref } from 'vue';
import { colors } from '../assets/colors.ts';
import { sortByBlue, sortByGreen, sortByHsl, sortByRed } from '../plugins/color.tools.ts';
import { hevToHSVStr } from '../plugins/transform/hex.hsv.ts';
import { hexToRGBStr } from '../plugins/transform/hex.rgb.ts';
import { hexToHSLStr } from '../plugins/transform/hex.hsl.ts';

export enum SORT_TYPE {
  DEFAULT,
  // SOLAR,
  HSL,
  RED,
  GREEN,
  BLUE,
}

export enum COLOR_TYPE {
  HEX,
  RGB,
  HSV,
  HSL
}

const colorList = Object.values(colors).flat();


export default function useColors() {

  const sortByRef = ref<SORT_TYPE>(SORT_TYPE.HSL);
  const colorTypeRef = ref<COLOR_TYPE>(COLOR_TYPE.HEX);
  const searchRef = ref<string>('');

  const colorTransform = (color: string) => {
    switch (colorTypeRef.value) {
      case COLOR_TYPE.HSV:
        return hevToHSVStr(color);
      case COLOR_TYPE.RGB:
        return hexToRGBStr(color);
      case COLOR_TYPE.HSL:
        return hexToHSLStr(color);
      default:
        return color;
    }
  };

  const getRealSearchInfo = (search?: string) => {
    if (!search || search === '') {
      return;
    }
    if (search.startsWith('#')) {
      return { type: 'color', value: search.slice(1) };
    }
    // 如果是字母或数字开头，那么就是颜色名
    if (search[0].match(/[a-zA-Z0-9]/)) {
      return {
        type: 'color',
        value: colorTypeRef.value === COLOR_TYPE.HEX ? search.toUpperCase() : search.toLowerCase(),
      };
    }
    return { type: 'name', value: search };
  };

  const displayColorComputed = computed(() => {

    let list = colorList.map(c => ({ ...c, displayColor: colorTransform(c.color) }));
    const realSearchInfo = getRealSearchInfo(searchRef.value);
    if (realSearchInfo) {
      const matchKey = realSearchInfo.type === 'color' ? 'displayColor' : 'name';
      list = list.filter(color => color[matchKey].includes(realSearchInfo.value));
    }
    switch (sortByRef.value) {
      case SORT_TYPE.DEFAULT:
        return list;
      case SORT_TYPE.HSL:
        return sortByHsl(list);
      case SORT_TYPE.RED:
        return sortByRed(list);
      case SORT_TYPE.GREEN:
        return sortByGreen(list);
      case SORT_TYPE.BLUE:
        return sortByBlue(list);
    }
  });


  return {
    searchRef,
    sortByRef,
    colorTypeRef,
    displayColorComputed,
  };
}
