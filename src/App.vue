<script setup>
import { reactive, ref, computed } from 'vue'
const numberOfCircles = ref(100)
const constCss = reactive({
  transformFrom: 80,
  transformTo: 200,
  size: 32,
  time: 7,
  count: 51,
  turns: 6
})
const constCSSWrapper = computed(() => {
  return {
    '--from': constCss.transformFrom + 'px',
    '--to': constCss.transformTo + 'px',
    '--size': constCss.size + 'px',
    '--time': constCss.time + 's',
    '--count': constCss.count,
    '--turns': constCss.turns
  }
})
</script>

<template>
  <div class="loader rainbow">
    <template v-for="index in numberOfCircles" :key="index">
      <div class="circle" :style="{ '--i': index }" />
    </template>
  </div>
</template>

<!--https://codepen.io/miocene/pen/WNLQKEJ-->
<style scoped>
body {
  background: #333333;
}

.loader {
  position: absolute;
  top: 50%;
  left: 50%;

  --form: v-bind('constCSSWrapper.from');
  --to: v-bind('constCSSWrapper.to');
  --size: v-bind('constCSSWrapper.size');
  --time: v-bind('constCSSWrapper.time');
  --count: v-bind('constCSSWrapper.count');
  --turns: v-bind('constCSSWrapper.turns');

  /*--from: 80px;*/
  /*--to: 200px;*/
  /*--size: 32px;*/
  /*--time: 7s;*/
  /*--count: 51; !* up to 100 *!*/
  /*--turns: 6;*/
}

.circle {
  position: absolute;

  --delay: calc(var(--time) / var(--count) * -1 * var(--i));
  rotate: calc(var(--turns) * 1turn / var(--count) * var(--i));

  animation: circle var(--time) var(--delay) ease-in-out infinite;
}
.circle:nth-child(n + var(--count)) {
  display: none;
}
.circle::before {
  content: '';
  display: block;
  width: var(--size);
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-color: white;
  transform-origin: center center;

  animation: circleSize var(--time) var(--delay) ease-in-out infinite;
}

/* rainbow */
.rainbow .circle::before {
  background-color: hsl(calc(1turn / (var(--count) / var(--turns)) * var(--i)) 100% 70%);
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
