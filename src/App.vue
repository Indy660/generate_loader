<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Drawer from 'primevue/drawer'
import Button from 'primevue/button'
import SidebarComponent from '@/components/SidebarComponent.vue'
import Toast from 'primevue/toast'
import { examples as staticExamples } from '@/examples'
import { useAdaptive } from '@/composable/useAdaptive'
import { useToast } from 'primevue/usetoast'
import type { constCssType } from '@/types'

const { isMobile } = useAdaptive()
const toast = useToast()

let examplesFromStorage = ref<constCssType[]>([])

// TODO: доделать мерж из локалстоража
const examples = computed(() => {
  return [...staticExamples, ...examplesFromStorage.value]
})

const isShowSidebar = ref(false)
const currentPlaceholder = ref(0)
const constCss = ref<constCssType>({ ...examples.value[currentPlaceholder.value] })

const transformFromInPercent = computed(() => {
  return (100 / 2 / constCss.value.sizeCircles) * constCss.value.transformFrom
})
const transformToInPercent = computed(() => {
  return (100 / 2 / constCss.value.sizeCircles) * constCss.value.transformTo
})
const sizeInnerCircles = computed(() => {
  return (constCss.value.transformFrom / constCss.value.transformTo) * constCss.value.sizeLoader
})
const constCSSWrapper = computed(() => {
  return {
    sizeLoader: constCss.value.sizeLoader + 'px',
    transformFrom: transformFromInPercent.value + '%',
    transformTo: transformToInPercent.value + '%',
    sizeCircles: constCss.value.sizeCircles + '%',
    sizeInnerCircles: sizeInnerCircles.value + 'px',
    time: constCss.value.time + 's',
    count: constCss.value.count,
    turns: constCss.value.turns
  }
})

const isTransparent = ref(true)
const isTransparentStyle = computed(() => {
  return { opacity: isTransparent.value ? 0.8 : 1 }
})

function changeLoader(id: number) {
  currentPlaceholder.value = id
  constCss.value = { ...examples.value[id] }
}

const KEY_STORAGE = 'CUSTOM_SETTINGS'
function getAndPutSettingsToLocalStorage(): void {
  const localStorageSettings = localStorage.getItem(KEY_STORAGE)
  examplesFromStorage.value = localStorageSettings?.length ? JSON.parse(localStorageSettings) : []
}

function saveSettingToLocalStorage() {
  const currentCss = constCss.value
  currentCss.isCustom = true
  examplesFromStorage.value.push(currentCss)
  localStorage.setItem(KEY_STORAGE, JSON.stringify(examplesFromStorage.value))
}

function copySetting() {
  let htmlText = `<div class="loader">`
  for (let i = 0; i < constCss.value.numberOfCircles; i++) {
    htmlText += `<div class="circle" style="--i: ${i}"></div>`
  }
  htmlText += `</div>`
  const cssText = `
  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 100%;
    height: 100%;
    border-radius: 50%;

    --from:${constCSSWrapper.value.transformFrom};
    --to: ${constCSSWrapper.value.transformTo};
    --sizeCircles:${constCSSWrapper.value.sizeCircles};
    --time: ${constCSSWrapper.value.time};
    --count: ${constCSSWrapper.value.count};
    --turns: ${constCSSWrapper.value.turns};
  }
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
  `
  navigator.clipboard.writeText(`${htmlText}\n${cssText}`)
  toast.add({ severity: 'info', summary: 'Saved', detail: 'Saved in memory', life: 3000 })
}

onMounted(() => {
  if (!isMobile.value) {
    isTransparent.value = false
  }
  getAndPutSettingsToLocalStorage()
})
</script>

<template>
  <main>
    <Toast />
    <div class="loader">
      <div class="inner-circle" />
      <div
        v-for="index in constCss.numberOfCircles"
        :key="index"
        class="circle"
        :style="{ '--i': index }"
      />
    </div>
    <div class="button-wrapper">
      <Button @click="isShowSidebar = !isShowSidebar" label="Settings" icon="pi pi-palette" />
    </div>
    <Drawer
      v-model:visible="isShowSidebar"
      header="Settings"
      class="drawer"
      :style="{ ...isTransparentStyle }"
      :position="isMobile ? 'bottom' : 'right'"
    >
      <SidebarComponent
        v-model:const-css="constCss"
        v-model:is-transparent="isTransparent"
        :examples="examples"
        @update-transparent="isTransparent = !isTransparent"
        @change-example="changeLoader"
        @copy-setting="copySetting"
        @save-setting="saveSettingToLocalStorage"
      />
    </Drawer>
  </main>
</template>
<!--TODO: поставить претиер и еслинт-->
<!--https://vueschool.io/articles/vuejs-tutorials/eslint-and-prettier-with-vite-and-vue-js-3/-->

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

    width: var(--sizeLoader);
    height: var(--sizeLoader);
    border-radius: 50%;

    --sizeLoader: v-bind('constCSSWrapper.sizeLoader');
    --from: v-bind('constCSSWrapper.transformFrom');
    --to: v-bind('constCSSWrapper.transformTo');
    --sizeCircles: v-bind('constCSSWrapper.sizeCircles');
    --time: v-bind('constCSSWrapper.time');
    --count: v-bind('constCSSWrapper.count');
    --turns: v-bind('constCSSWrapper.turns');
    &:hover {
      border: 1px solid #00ff00ff;
    }
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
    // just for show inner circle
    .inner-circle {
      width: v-bind('constCSSWrapper.sizeInnerCircles');
      height: v-bind('constCSSWrapper.sizeInnerCircles');
      border-radius: 50%;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      &:hover {
        border: 1px solid #ff0000;
      }
    }
  }
  .button-wrapper {
    position: absolute;
    top: 0;
    left: 3vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media screen and (max-width: 768px) {
      flex-direction: row;
      width: 100%;
      height: fit-content;
      top: 5vh;
      left: 0;
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

///* Here parent as your relative block */
//.parent {
//  display: flex;
//  justify-content: center;
//  position: relative;
//  width: 500px;
//  height: 500px;
//  border: 1px solid black
//}
//.loader {
//  position: absolute;
//  top: 50%;
//  left: 50%;
//  transform: translate(-50%, -50%);
//
//  width: 100%;
//  height: 100%;
//  border-radius: 50%;
//
//  /*   --from: 100%;
//  --to: 500%; */
//  --sizeCircles: 5%;
//  --time: 4s;
//  --count: 200;
//  --turns: 10;
//}
//.circle {
//  position: absolute;
//  top: calc(50% - var(--sizeCircles) / 2);
//  left: calc(50% - var(--sizeCircles) / 2);
//  --delay: calc(var(--time) / var(--count) * -1 * var(--i));
//  rotate: calc(var(--turns) * 1turn / var(--count) * var(--i));
//  animation: circle var(--time) var(--delay) ease-in-out infinite;
//  width: var(--sizeCircles);
//}
//.circle::before {
//  content: "";
//  display: block;
//
//  aspect-ratio: 1/1;
//  border-radius: 50%;
//  transform-origin: center center;
//  animation: circleSize var(--time) var(--delay) ease-in-out infinite;
//  background-color: hsl(
//      calc(1turn / (var(--count) / var(--turns)) * var(--i)) 100% 70%
//  );
//}
//@keyframes circle {
//  from {
//    /*     transform: translate(0, var(--from)); */
//    transform: translate(0, 200%);
//  }
//  to {
//    /*     transform: translate(0, var(--to)); */
//    transform: translate(0, 1000%);
//  }
//}
//@keyframes circleSize {
//  0%,
//  100% {
//    transform: scale(0);
//  }
//  25%,
//  50% {
//    transform: scale(1);
//  }
//}

//position: absolute;
//top: 50%;
//       left: 50%;
//               transform: translate(-50%, -50%);
//width: 100%;
//          height: 100%;
//                     border-radius: 50%;
//                                      --sizeCircles: 10%;
//                                                       --time: 4s;
//--count: 75;
//--turns: 10;
</style>
