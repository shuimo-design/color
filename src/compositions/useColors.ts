/**
 * @description colors hook
 * @author 阿怪
 * @date 2024/3/14 09:44
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { computed, provide, ref } from 'vue';
import { colors } from '../assets/colors.ts';
import { sortByBlue, sortByGreen, sortByHsl, sortByRed } from '../plugins/color.tools.ts';

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
  provide('colorType', colorTypeRef);

  const displayColorComputed = computed(() => {
    switch (sortByRef.value) {
      case SORT_TYPE.DEFAULT:
        return colorList;
      case SORT_TYPE.HSL:
        return sortByHsl(colorList);
      case SORT_TYPE.RED:
        return sortByRed(colorList);
      case SORT_TYPE.GREEN:
        return sortByGreen(colorList);
      case SORT_TYPE.BLUE:
        return sortByBlue(colorList);
    }
  });


  return {
    sortByRef,
    colorTypeRef,
    displayColorComputed,
  };
}
