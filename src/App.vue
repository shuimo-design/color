<script setup lang="ts">

import ColorItem from './components/ColorItem.vue';
import { colors } from './compositions/colors.ts';
import { ref } from 'vue';

// 将RGB颜色转换为HSL颜色
function rgbToHsl({ r, g, b }: { r: number, g: number, b: number }) {
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
}

function hexToRgb(hexColor: string) {
  const r = parseInt(hexColor.substring(1, 3), 16);
  const g = parseInt(hexColor.substring(3, 5), 16);
  const b = parseInt(hexColor.substring(5, 7), 16);
  return { r, g, b };
}

// 对颜色列表进行排序
const colorList = Object.values(colors).flat().sort((a, b) => {
  const hslA = rgbToHsl(hexToRgb(a.color));
  const hslB = rgbToHsl(hexToRgb(b.color));
  return hslA.h - hslB.h;
});
// 对颜色列表进行排序


const isSolar = ref(false);

</script>

<template>
  <m-rice-paper class="full-screen m-cursor">
    <div class="header">
      <m-switch class="solar-switcher" v-model="isSolar" active-info="节气" inactive-info="平铺"/>
      <m-dark-mode/>
    </div>
    <div class="color-list">

      <div class="solar-block" v-for="solar in Object.keys(colors)" v-if="isSolar">
        <h1>{{solar}}</h1>
        <div class="colors">
          <ColorItem :info="info" v-for="info in colors[solar as keyof typeof colors]"/>
        </div>
      </div>
      <div class="colors" v-else>
        <ColorItem :info="info" v-for="info in colorList"/>
      </div>


    </div>
  </m-rice-paper>
</template>

<style scoped>

.colors {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.solar-block {
  margin-bottom: 10px;
}

h1{
  margin-left: 2rem;
  font-size: 3.6rem;
}


</style>
