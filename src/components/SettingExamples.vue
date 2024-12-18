<template>
  <Card class="placeholders">
    <template #title>Примеры:</template>
    <template #content>
      <div class="examples">
        <img
          v-for="example in prop.examples"
          class="example"
          @click="emit('change-example', example.id)"
          :src="getImageUrl(example.id)"
          :key="example.id"
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

function getImageUrl(id: number) {
  // TODO: как сделать через @, через статичный computed (с айди внутри) работает
  return new URL(`../assets/gif_examples/${id}.gif`, import.meta.url).href
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
