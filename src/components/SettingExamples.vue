<template>
  <Card class="placeholders">
    <!--    <template #title>Примеры:</template>-->
    <template #content>
      <div class="examples">
        <div
          class="example"
          v-for="(example, index) in prop.examples"
          :key="index + example.numberOfCircles"
        >
          <img
            @click="emit('change-example', index)"
            :src="getImageUrl(index)"
            :alt="`Default example N${index + 1}`"
          />
          <div
            v-if="example.isCustom"
            class="button-delete"
            @click.stop="emit('delete-example', index)"
          >
            <i class="pi pi-times-circle" />
          </div>
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
//TODO: разобраться, почему грид криво налезает
.examples {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  //grid-column-gap: 12px;
  gap: 12px;
  //width: 100%;
  //justify-items: stretch;
  border: 1px solid black;
  .example {
    position: relative;
    //width: 50px;
    //height: 100%;
    aspect-ratio: 1 / 1;
    //display: flex;
    //justify-content: center;
    //align-items: center;
    cursor: pointer;
    background-size: cover;
    scale: 0.95;
    box-shadow: 4px 4px 8px 0 rgba(34, 60, 80, 0.2);
    &:hover {
      scale: 1;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .button-delete {
      position: absolute;
      top: 0;
      right: 10px;
      width: 40px;
      height: 40px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        color: red;
        font-size: 2rem;
      }
    }
  }
}
</style>
