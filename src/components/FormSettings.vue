<script setup lang="ts">
import { defineEmits, defineModel } from 'vue'
import InputNumber from 'primevue/inputnumber'
import Checkbox from 'primevue/checkbox'
import type { constCssType } from '@/types'

const model = defineModel<constCssType>()
//TODO: поправить
const prop = defineProps({ isTransparent: Boolean })
const emit = defineEmits(['update:model'])
</script>

<template>
  <div class="form">
    <!--    TODO: плейсхолдеры-->
    <!--    TODO: настройки-->
    <!--    TODO: сохранить в конечный вид-->
    <div class="placeholders"></div>
    <div class="settings">
      <div class="flex items-center gap-2">
        <Checkbox
          :model-value="prop.isTransparent"
          binary
          @change="emit('update:update-transparent')"
        />
        <label for="opacity"> Прозрачность </label>
      </div>
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
    </div>
    <div class="save"></div>
  </div>
</template>

<style scoped lang="scss">
.form {
  height: 100%;
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
