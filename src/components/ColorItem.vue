<script setup lang="ts">
/**
 * @description
 * @author 阿怪
 * @date 2024/3/13 15:58
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { computed } from 'vue';
import { MMessage } from 'shuimo-ui';

const props = defineProps<{ info: { color: string, name: string } }>();
const fill = computed(() => props.info.color);

const deepColorCheck = (hexColor: string) => {
  // 将十六进制颜色转换为RGB值
  let r = parseInt(hexColor.substr(1, 2), 16);
  let g = parseInt(hexColor.substr(3, 2), 16);
  let b = parseInt(hexColor.substr(5, 2), 16);

  //  判断是深色还是浅色
  return (r * 0.299 + g * 0.587 + b * 0.114) > 186;
};
const isDeepColor = deepColorCheck(props.info.color);
const fontColor = computed(() => isDeepColor ? '#31322C' : '#EBEEE8');
const fontHoverColor = computed(() => isDeepColor ? '#151D29' : '#F5F3F2');

const copyInfo = (color: string, type: string) => {
  const input = document.createElement('input');
  input.value = color;
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
  MMessage.success({
    content: `${type}已复制到剪贴板`,
    direction: 'top-left',
  });
};

</script>

<template>
  <div class="color-item">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300.09 80.79" class="color-item-svg-svg">
      <use xlink:href="/color-item.svg#color-item"/>
    </svg>

    <div class="color-item-inner">
      <span class="m-cursor-pointer" @click="copyInfo(info.name,`颜色名称【${info.name}】`)">{{ info.name }}</span>
      <span class="inner-color m-cursor-pointer" @click="copyInfo(info.color,`颜色【${info.color}】`)">{{ info.color }}</span>
    </div>

  </div>
</template>

<style scoped>

.color-item {
  height: 8rem;
  /* 比例 1508：406 */
  aspect-ratio: 1508 / 406;
  fill: v-bind(fill);
  position: relative;
}


.color-item-inner {
  position: absolute;
  left: 0;
  color: v-bind(fontColor);
  width: 100%;
  height: 100%;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 2.4rem;

  span:hover {
    color: v-bind(fontHoverColor);
    font-weight: bold;
  }
}

.inner-color {
  font-size: 1.6rem;
}

</style>

