<script setup lang="ts">
/**
 * @description
 * @author 阿怪
 * @date 2024/3/14 14:44
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

defineProps<{ options: { title: string, value: number }[] }>();
const value = defineModel();

const changeType = (v: number) => {
  value.value = v;
};
</script>

<template>

  <div class="type-select">
    <m-tag v-for="option in options"
           :type="value===option.value?'error':'default'" class="type-select-item"
           @click="changeType(option.value)">
      {{ option.title }}
    </m-tag>
  </div>

</template>

<style scoped>

.type-select-item {
  --m-tag-h: 2.4rem;
  margin-right: 0.2rem;
  font-size: 1.2rem;
  --m-tag-w-min: 6rem;
  --m-cursor-auto: var(--m-cursor-pointer);
}

</style>
