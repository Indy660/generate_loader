<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Drawer from 'primevue/drawer'
import Button from 'primevue/button'
import SidebarComponent from '@/components/SidebarComponent.vue'
import { examples } from '@/examples'
import { useAdaptive } from '@/composable/useAdaptive'
import type { constCssType } from '@/types'

const { isMobile } = useAdaptive()

const isShowSidebar = ref(false)
const currentPlaceholder = ref(4)
let constCss = ref<constCssType>(examples[currentPlaceholder.value].constCss)
const transformFromInPercent = computed(() => {
  return (constCss.value.sizeLoader / 2 / constCss.value.size) * constCss.value.transformFrom
})
const transformToInPercent = computed(() => {
  return (constCss.value.sizeLoader / 2 / constCss.value.size) * constCss.value.transformTo
})
const sizeInnerCircles = computed(() => {
  return (constCss.value.transformFrom / constCss.value.transformTo) * constCss.value.sizeLoader
})
const constCSSWrapper = computed(() => {
  return {
    sizeLoader: constCss.value.sizeLoader + 'px',
    transformFrom: transformFromInPercent.value + '%',
    transformTo: transformToInPercent.value + '%',
    sizeCircles: constCss.value.size + 'px',
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
  constCss.value = examples[id].constCss
}

// TODO: доделать
const KEY_STORAGE = 'customSettings'
function getSettingsToLocalStorage(): constCssType[] {
  const localStorageSettings = localStorage.getItem(KEY_STORAGE)
  return localStorageSettings?.length ? JSON.parse(localStorageSettings) : []
}
//   if (localStorageObjects) {
//     constCss = JSON.parse(localStorageObjects)
//   }
//
//   localStorageObjects.push(object)
//   localStorage.setItem(KEY_STORAGE, JSON.stringify(objects))
// }
// function deleteSettingFromLocalStorage(index: number): void {
//   const localStorageObjects = localStorage.getItem(KEY_STORAGE)
//
//   if (localStorageObjects) {
//     let objects = JSON.parse(localStorageObjects)
//
//     if (index >= 0 && index < objects.length) {
//       objects.splice(index, 1)
//       localStorage.setItem(KEY_STORAGE, JSON.stringify(objects))
//     } else {
//       console.error('Index out of bounds')
//     }
//   } else {
//     console.warn('No objects found in localStorage')
//   }
// }

onMounted(() => {
  if (!isMobile.value) {
    isTransparent.value = false
  }
})
</script>

<template>
  <main>
    <div class="loader">
      <div class="inner-circle"></div>
      <!--      <div class="rainbow">-->
      <div
        v-for="index in constCss.numberOfCircles"
        :key="index"
        class="circle"
        :style="{ '--i': index }"
      />
      <!--      </div>-->
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
      <SidebarComponent
        v-model:const-css="constCss"
        v-model:is-transparent="isTransparent"
        :examples="examples"
        @update-transparent="isTransparent = !isTransparent"
        @change-example="changeLoader"
        @save-setting="saveSettingToLocalStorage"
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
    }
    .circle::before {
      content: '';
      display: block;
      width: var(--sizeCircles);
      aspect-ratio: 1/1;
      border-radius: 50%;
      transform-origin: center center;
      animation: circleSize var(--time) var(--delay) ease-in-out infinite;
      background-color: hsl(calc(1turn / (var(--count) / var(--turns)) * var(--i)) 100% 70%);
    }
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
