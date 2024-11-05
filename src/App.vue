<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import Drawer from 'primevue/drawer'
import Button from 'primevue/button'
import FormSettings from '@/components/FormSettings.vue'
import { useAdaptive } from '@/composable/useAdaptive'
import type { constCssType } from '@/types'

const { isMobile } = useAdaptive()

const isShowSidebar = ref(true)
const numberOfCircles = ref(100)

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

const isTransparent = ref(true)
const isTransparentStyle = computed(() => {
  return { opacity: isTransparent.value ? 0.8 : 1 }
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
    <Button
      @click="isShowSidebar = !isShowSidebar"
      class="button"
      label="Настройки"
      icon="pi pi-palette"
    />
    <Drawer
      v-model:visible="isShowSidebar"
      header="Настройки"
      class="drawer"
      :style="{ ...isTransparentStyle }"
      :position="isMobile ? 'bottom' : 'right'"
    >
      <FormSettings
        v-model="constCss"
        :is-transparent="isTransparent"
        @update-transparent="isTransparent = !isTransparent"
      />
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

    --from: v-bind('constCSSWrapper.transformFrom');
    --to: v-bind('constCSSWrapper.transformTo');
    --size: v-bind('constCSSWrapper.size');
    --time: v-bind('constCSSWrapper.time');
    --count: v-bind('constCSSWrapper.count');
    --turns: v-bind('constCSSWrapper.turns');
    &:hover {
      border: 1px solid #00ff00ff;
    }
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
  .button {
    @media screen and (max-width: 768px) {
      position: absolute;
      top: 5vh;
      margin-inline: auto;
      left: 0;
      right: 0;
      width: fit-content;
    }
  }
}

//.p-overlay-mask {
//  background-color: red;
//  //:deep(.p-drawer-bottom .p-drawer) {
//  @media screen and (max-width: 768px) {
//    .p-drawer-bottom .p-drawer {
//      height: 100vh;
//    }
//    //}
//  }
//}

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
