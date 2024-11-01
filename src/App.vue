<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import Drawer from 'primevue/drawer'
import Button from 'primevue/button'
import FormSettings from '@/components/FormSettings.vue'
const isShowSidebar = ref(true)
const numberOfCircles = ref(100)
type constCssType = {
  sizeLoader: number
  transformFrom: number
  transformTo: number
  size: number
  time: number
  count: number
  turns: number
}

const constCss = reactive<constCssType>({
  sizeLoader: 400,
  transformFrom: 30,
  transformTo: 100,
  size: 32,
  time: 7,
  count: 51,
  turns: 6
})
const transformFromInPercent = computed(() => {
  return (constCss.sizeLoader / 2 / constCss.size) * constCss.transformFrom
})
const transformToInPercent = computed(() => {
  return (constCss.sizeLoader / 2 / constCss.size) * constCss.transformTo
})
const constCSSWrapper = computed(() => {
  return {
    sizeLoader: constCss.sizeLoader + 'px',
    transformFrom: transformFromInPercent.value + '%',
    transformTo: transformToInPercent.value + '%',
    size: constCss.size + 'px',
    time: constCss.time + 's',
    count: constCss.count,
    turns: constCss.turns
  }
})
</script>

<template>
  <main>
    <div class="loader">
      <div class="rainbow">
        <div
          v-for="index in numberOfCircles"
          :key="index"
          class="circle"
          :style="{ '--i': index }"
        />
      </div>
    </div>
    <Button @click="isShowSidebar = !isShowSidebar" label="Настройки" icon="pi pi-palette" />
    <Drawer v-model:visible="isShowSidebar" header="Настройки" position="right">
      <FormSettings v-model="constCss" />
    </Drawer>
  </main>
</template>

<!--https://codepen.io/miocene/pen/WNLQKEJ-->
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
main {
  height: 100vh;
  width: 100vw;
  background: #333333;
  overflow: hidden;
  .loader {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: v-bind('constCSSWrapper.sizeLoader');
    height: v-bind('constCSSWrapper.sizeLoader');
    border-radius: 50%;
    border: 1px solid green;

    --from: v-bind('constCSSWrapper.transformFrom');
    --to: v-bind('constCSSWrapper.transformTo');
    --size: v-bind('constCSSWrapper.size');
    --time: v-bind('constCSSWrapper.time');
    --count: v-bind('constCSSWrapper.count');
    --turns: v-bind('constCSSWrapper.turns');
    .circle {
      position: absolute;
      top: calc(50% - var(--size) / 2);
      left: calc(50% - var(--size) / 2);
      --delay: calc(var(--time) / var(--count) * -1 * var(--i));
      rotate: calc(var(--turns) * 1turn / var(--count) * var(--i));
      animation: circle var(--time) var(--delay) ease-in-out infinite;
    }
    .circle::before {
      content: '';
      display: block;
      width: var(--size);
      aspect-ratio: 1/1;
      border-radius: 50%;
      transform-origin: center center;
      animation: circleSize var(--time) var(--delay) ease-in-out infinite;
      background-color: hsl(calc(1turn / (var(--count) / var(--turns)) * var(--i)) 100% 70%);
    }
  }
}

/* animations */
@keyframes circle {
  from {
    transform: translate(0, var(--from));
  }
  to {
    transform: translate(0, var(--to));
  }
}
@keyframes circleSize {
  0%,
  100% {
    transform: scale(0);
  }
  25%,
  50% {
    transform: scale(1);
  }
}
</style>
