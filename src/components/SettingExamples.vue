<template>
  <Card class="placeholders">
    <template #title>Примеры:</template>
    <template #content>
      <div class="examples">
        <img
          v-for="(example, index) in prop.examples"
          class="example"
          @click="emit('change-example', index)"
          :src="getImageUrl(index)"
          :key="index + example.numberOfCircles"
        />
      </div>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import Card from 'primevue/card'
import type { constCssType } from '@/types'

interface Props {
  examples: constCssType
}

const prop = defineProps<Props>()
const emit = defineEmits(['change-example'])


function getImageUrl(index: number) {
  // TODO: если файла не существует сделать проверку
  console.log(index)
  // let file = ''
  // try {
  //   file = new URL(`../assets/gif_examples/${index}.gif`, import.meta.url).href
  //   console.log('try')
  // }
  // catch (e) {
  //   file = new URL(`../assets/gif_examples/2.gif`, import.meta.url).href
  //   console.log('catch')
  // }
  // return file
  // if (example?.id) {
  //   // TODO: как сделать через @, через статичный computed (с айди внутри) работает
    return new URL(`../assets/gif_examples/${index}.gif`, import.meta.url).href
  // }
  // return ''
}
</script>

<style scoped lang="scss">
.placeholders {
  margin-bottom: 12px;
}
.examples {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  .example {
    width: 45%;
    aspect-ratio: 1 / 1;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    scale: 0.95;
    &:hover {
      scale: 1;
    }
  }
}
</style>
