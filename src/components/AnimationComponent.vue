<template>
  <div class="loader">
    <div class="inner-circle" />
    <div
      v-for="index in constCss.numberOfCircles"
      :key="index"
      class="circle"
      :style="{ '--i': index }"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { constCssType } from '@/types'

interface Props {
  constCss: constCssType
}

const prop = defineProps<Props>()

const transformFromInPercent = computed(() => {
  return (100 / 2 / prop.constCss.sizeCircles) * prop.constCss.transformFrom
})
const transformToInPercent = computed(() => {
  return (100 / 2 / prop.constCss.sizeCircles) * prop.constCss.transformTo
})

const constCSSWrapper = computed(() => {
  return {
    transformFrom: transformFromInPercent.value + '%',
    transformTo: transformToInPercent.value + '%',
    sizeCircles: prop.constCss.sizeCircles + '%',
    time: prop.constCss.time + 's',
    count: prop.constCss.count,
    turns: prop.constCss.turns
  }
})
</script>

<style scoped lang="scss">
.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 100%;
  height: 100%;
  border-radius: 50%;

  --from: v-bind('constCSSWrapper.transformFrom');
  --to: v-bind('constCSSWrapper.transformTo');
  --sizeCircles: v-bind('constCSSWrapper.sizeCircles');
  --time: v-bind('constCSSWrapper.time');
  --count: v-bind('constCSSWrapper.count');
  --turns: v-bind('constCSSWrapper.turns');
  .circle {
    position: absolute;
    top: calc(50% - var(--sizeCircles) / 2);
    left: calc(50% - var(--sizeCircles) / 2);
    --delay: calc(var(--time) / var(--count) * -1 * var(--i));
    rotate: calc(var(--turns) * 1turn / var(--count) * var(--i));
    animation: circle var(--time) var(--delay) ease-in-out infinite;
    width: var(--sizeCircles);
  }
  .circle::before {
    content: '';
    display: block;
    aspect-ratio: 1/1;
    border-radius: 50%;
    transform-origin: center center;
    animation: circleSize var(--time) var(--delay) ease-in-out infinite;
    background-color: hsl(calc(1turn / (var(--count) / var(--turns)) * var(--i)) 100% 70%);
  }
}
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
