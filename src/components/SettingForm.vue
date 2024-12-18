<template>
  <Card class="settings">
    <template #title>Настроить текущий лоадер:</template>
    <template #content>
      <span class="label">Количество кругов</span>
      <InputNumber
        class="field"
        v-model="constCss.numberOfCircles"
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
        v-model="constCss.count"
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
        v-model="constCss.turns"
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
        v-model="constCss.time"
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
        v-model="constCss.sizeLoader"
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
        v-model="constCss.transformFrom"
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
        v-model="constCss.transformTo"
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
        v-model="constCss.size"
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
</template>

<script setup lang="ts">
import InputNumber from 'primevue/inputnumber'
import Card from 'primevue/card'
import type { constCssType } from '@/types'

const constCss = defineModel<constCssType>('constCss')
</script>

<style scoped lang="scss">
.settings {
  .label {
    display: inline-block;
    margin-bottom: 4px;
  }

  .field {
    margin-bottom: 12px;
  }
}
</style>
