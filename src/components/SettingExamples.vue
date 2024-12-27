<template>
  <Card class="placeholders">
    <template #title>Примеры:</template>
    <template #content>
      <div class="examples">
        <div
          class="example"
          v-for="(example, index) in prop.examples"
          :key="index + example.numberOfCircles"
        >
          <img @click="emit('change-example', index)" :src="getImageUrl(index)" />
          <div
            v-if="example.isCustom"
            class="button-delete"
            @click="emit('delete-example', index)"
          />
        </div>
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
const emit = defineEmits(['change-example', 'delete-example'])

function getImageUrl(index: number) {
  // TODO: всё ещё криво решено, моно ли улучшить
  const image = new URL(`../assets/gif_examples/${index}.gif`, import.meta.url).href
  // console.log(image)
  return image.includes('undefined')
    ? new URL(`../assets/default-loader.png`, import.meta.url).href
    : image
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
    position: relative;
    width: 50px;
    //height: 100%;
    aspect-ratio: 1 / 1;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    scale: 0.95;
    box-shadow: 4px 4px 8px 0 rgba(34, 60, 80, 0.2);
    &:hover {
      scale: 1;
    }
    .button-delete {
      position: absolute;
      top: 0;
      right: 0;
      width: 20px;
      height: 20px;
      background-color: red;
      cursor: pointer;
    }
  }
}
</style>
