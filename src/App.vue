<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Drawer from 'primevue/drawer'
import Button from 'primevue/button'
import AnimationComponent from '@/components/AnimationComponent.vue'
import SidebarComponent from '@/components/SidebarComponent.vue'
import Toast from 'primevue/toast'
import { STATIC_EXAMPLES } from '@/static_examples'
import { useAdaptive } from '@/composable/useAdaptive'
import { useToast } from 'primevue/usetoast'
import type { constCssType } from '@/types'

const { isMobile } = useAdaptive()
const toast = useToast()

const examplesFromStorage = ref<constCssType[]>([])

const examples = computed(() => {
  return [...STATIC_EXAMPLES, ...examplesFromStorage.value]
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

const constCSSWrapper = computed(() => {
  return {
    transformFrom: transformFromInPercent.value + '%',
    transformTo: transformToInPercent.value + '%',
    sizeCircles: constCss.value.sizeCircles + '%',
    time: constCss.value.time + 's',
    count: constCss.value.count,
    turns: constCss.value.turns
  }
})

const isTransparent = ref(true)
const isTransparentStyle = computed(() => {
  return { opacity: isTransparent.value ? 0.8 : 1 }
})

// Сделано для перерисовки компонента
const isLoaderVisible = ref(true)
function changeLoader(index: number) {
  isLoaderVisible.value = false
  const tTimeoutId = setTimeout(() => {
    currentPlaceholder.value = index
    constCss.value = { ...examples.value[index] }
    isLoaderVisible.value = true
    clearTimeout(tTimeoutId)
  }, 0)
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
  toast.add({
    severity: 'success',
    summary: 'Saved',
    detail: 'Saved example in local storage',
    life: 3000
  })
}
function deleteExampleFromLocalStorage(index: number) {
  const staticExamplesLength = STATIC_EXAMPLES.length
  examplesFromStorage.value.splice(index - staticExamplesLength, 1)
  localStorage.setItem(KEY_STORAGE, JSON.stringify(examplesFromStorage.value))
  changeLoader(0)
  toast.add({
    severity: 'error',
    summary: 'Deleted',
    detail: 'Deleted example from local storage',
    life: 3000
  })
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
    <div v-if="isLoaderVisible" class="animation-wrapper">
      <AnimationComponent :const-css="constCss" />
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
        @delete-example="deleteExampleFromLocalStorage"
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
  .animation-wrapper {
    position: relative;
    width: 50%;
    height: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
</style>
