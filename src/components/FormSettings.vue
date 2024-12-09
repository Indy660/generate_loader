<script setup lang="ts">
import { defineEmits, defineModel } from 'vue'
import Card from 'primevue/card'
import InputNumber from 'primevue/inputnumber'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'
import { useAdaptive } from '@/composable/useAdaptive'
import type { constCssType } from '@/types'

const { isMobile } = useAdaptive()

const model = defineModel<constCssType>()
const prop = defineProps({ isTransparent: Boolean, examples: Object })
const emit = defineEmits(['update:model', 'update-transparent', 'change-example', 'save-setting'])
function getImageUrl(id: number) {
  // TODO: как сделать через @, через статичный computed (с айди внутри) работает
  return new URL(`../assets/gif_examples/${id}.gif`, import.meta.url).href
}

function saveSetting() {
  emit('save-setting')
}
</script>

<template>
  <div class="form">
    <!--    TODO: плейсхолдеры-->
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
    <!--    TODO: настройки-->
    <Card class="settings">
      <template #title>Настроить текущий лоадер:</template>
      <template #content>
        <div v-if="isMobile" class="flex items-center gap-2 field">
          <Checkbox :model-value="prop.isTransparent" binary @change="emit('update-transparent')" />
          <label for="opacity"> Прозрачность </label>
        </div>
        <span class="label">Количество кругов</span>
        <InputNumber
          class="field"
          v-model="model.numberOfCircles"
          :min="0"
          fluid
          :step="1"
          input-id="horizontal-buttons"
          showButtons
          buttonLayout="horizontal"
        >
          <template #incrementbuttonicon>
            <span class="pi pi-plus" />
          </template>
          <template #decrementbuttonicon>
            <span class="pi pi-minus" />
          </template>
        </InputNumber>
        <span class="label">Количество кругов вокруг (--count)</span>
        <InputNumber
          class="field"
          v-model="model.count"
          :min="0"
          fluid
          :step="1"
          input-id="horizontal-buttons"
          showButtons
          buttonLayout="horizontal"
        >
          <template #incrementbuttonicon>
            <span class="pi pi-plus" />
          </template>
          <template #decrementbuttonicon>
            <span class="pi pi-minus" />
          </template>
        </InputNumber>
        <span class="label">Сколько кругов "в одной" линии(--turns)</span>
        <InputNumber
          class="field"
          v-model="model.turns"
          :min="0"
          fluid
          :step="1"
          input-id="horizontal-buttons"
          showButtons
          buttonLayout="horizontal"
        >
          <template #incrementbuttonicon>
            <span class="pi pi-plus" />
          </template>
          <template #decrementbuttonicon>
            <span class="pi pi-minus" />
          </template>
        </InputNumber>
        <span class="label">Время анимации в секундах (--time)</span>
        <InputNumber
          class="field"
          v-model="model.time"
          :min="0"
          fluid
          :step="0.25"
          input-id="horizontal-buttons"
          showButtons
          buttonLayout="horizontal"
        >
          <template #incrementbuttonicon>
            <span class="pi pi-plus" />
          </template>
          <template #decrementbuttonicon>
            <span class="pi pi-minus" />
          </template>
        </InputNumber>
        <span class="label">Размер лоадера в пикселя (--sizeLoader)</span>
        <InputNumber
          class="field"
          v-model="model.sizeLoader"
          fluid
          :step="10"
          input-id="horizontal-buttons"
          showButtons
          buttonLayout="horizontal"
        >
          <template #incrementbuttonicon>
            <span class="pi pi-plus" />
          </template>
          <template #decrementbuttonicon>
            <span class="pi pi-minus" />
          </template>
        </InputNumber>
        <span class="label">Внешний размер лоадера в процентах (--transformFrom)</span>
        <InputNumber
          class="field"
          v-model="model.transformFrom"
          fluid
          :step="10"
          input-id="horizontal-buttons"
          showButtons
          buttonLayout="horizontal"
        >
          <template #incrementbuttonicon>
            <span class="pi pi-plus" />
          </template>
          <template #decrementbuttonicon>
            <span class="pi pi-minus" />
          </template>
        </InputNumber>
        <span class="label">Внутренний отступ лоадера в процентах (--transformTo)</span>
        <InputNumber
          class="field"
          v-model="model.transformTo"
          fluid
          :step="10"
          input-id="horizontal-buttons"
          showButtons
          buttonLayout="horizontal"
        >
          <template #incrementbuttonicon>
            <span class="pi pi-plus" />
          </template>
          <template #decrementbuttonicon>
            <span class="pi pi-minus" />
          </template>
        </InputNumber>
        <span class="label">Размер кругов в пикселях (--size)</span>
        <InputNumber
          class="field"
          v-model="model.size"
          fluid
          :step="1"
          input-id="horizontal-buttons"
          showButtons
          buttonLayout="horizontal"
        >
          <template #incrementbuttonicon>
            <span class="pi pi-plus" />
          </template>
          <template #decrementbuttonicon>
            <span class="pi pi-minus" />
          </template>
        </InputNumber>
      </template>
    </Card>
    <!--    TODO: сохранить в конечный вид-->
    <Card class="save">
      <template #content>
        <Button label="Сохранить" severity="success" variant="outlined" @click="saveSetting" />
      </template>
    </Card>
  </div>
</template>

<style scoped lang="scss">
.form {
  height: 100%;
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
      //&:hover {
      //  background-color: rgba(0, 0, 0, 0.1);
      //}
    }
  }
  .placeholders {
    margin-bottom: 12px;
  }
  .settings {
    .label {
      display: inline-block;
      margin-bottom: 4px;
    }

    .field {
      margin-bottom: 12px;
    }
  }
}
</style>
