<script setup lang="ts">

import ColorItem from './components/ColorItem.vue';
// import { ref } from 'vue';
import useColors, { COLOR_TYPE, SORT_TYPE } from './compositions/useColors.ts';
import TypeSelect from './components/TypeSelect.vue';


// const isSolar = ref(false);


const { searchRef, sortByRef, displayColorComputed, colorTypeRef } = useColors();

const options = [
  // { title: 'default', value: SORT_TYPE.DEFAULT },
  { title: 'HSL', value: SORT_TYPE.HSL },
  { title: 'RED', value: SORT_TYPE.RED },
  { title: 'GREEN', value: SORT_TYPE.GREEN },
  { title: 'BLUE', value: SORT_TYPE.BLUE },
  // { title: 'HUE', value: SORT_TYPE.HUE },
  // { title: 'SATURATION', value: SORT_TYPE.SATURATION },
  // { title: 'LIGHTNESS', value: SORT_TYPE.LIGHTNESS },
  // { title: 'BRIGHTNESS', value: SORT_TYPE.BRIGHTNESS },
  // { title: 'DARKNESS', value: SORT_TYPE.DARKNESS },
  // { title: 'SOLAR', value: SORT_TYPE.SOLAR },
  // { title: 'SOLAR REVERSE', value: SORT_TYPE.SOLAR_REVERSE },
  // { title: 'RANDOM', value: SORT_TYPE.RANDOM },
];

const colorTypeOptions = [
  { title: 'HEX', value: COLOR_TYPE.HEX },
  { title: 'RGB', value: COLOR_TYPE.RGB },
  { title: 'HSV', value: COLOR_TYPE.HSV },
  { title: 'HSL', value: COLOR_TYPE.HSL },
];

const toGithub = () => {
  window.open('https://github.com/shuimo-design/color');
};

</script>

<template>
  <m-rice-paper class="full-screen m-cursor">
    <div class="header">
      <m-input v-model="searchRef" class="filter-input" placeholder="请输入想要查询的颜色"/>
      <div class="header-right">
        <div class="selector">
          <div class="selector-sort">
            <span>排序：</span>
            <TypeSelect :options="options" v-model="sortByRef"/>
          </div>
          <span>颜色类型：</span>
          <TypeSelect :options="colorTypeOptions" v-model="colorTypeRef"/>
          <m-button class="header-btn" @click="toGithub">仓库地址</m-button>
          <!--      <m-switch class="solar-switcher" v-model="isSolar" active-info="节气" inactive-info="平铺"/>-->
        </div>
        <m-dark-mode class="dark-mode"/>
      </div>
    </div>
    <div class="color-list">
      <div class="header-placeholder"/>
      <div class="colors">
        <ColorItem :info="info" v-for="info in displayColorComputed"/>
      </div>


      <!--      <div class="solar-block" v-for="solar in Object.keys(colors)" v-if="isSolar">-->
      <!--        <h1>{{ solar }}</h1>-->
      <!--        <div class="colors">-->
      <!--          <ColorItem :info="info" v-for="info in colors[solar as keyof typeof colors]"/>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      <div class="colors" v-else>-->
      <!--      </div>-->

      <div class="bottom-placeholder"/>
    </div>
  </m-rice-paper>
</template>

<style scoped>


.solar-block {
  margin-bottom: 10px;
}

h1 {
  margin-left: 2rem;
  font-size: 3.6rem;
}


</style>
