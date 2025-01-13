<template>
  <Card class="settings">
    <template #title>Set settings</template>
    <template #content>
      <span class="label">Quantity of circles (--numberOfCircles)</span>
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
      <span class="label">Quantity of circles around (--count)</span>
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
      <span class="label"> Turns (--turns)</span>
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
      <span class="label"> Time of animation (--time)</span>
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
      <span class="label"> Outer border circle in percent (--transformFrom)</span>
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
      <span class="label"> Inside border circle in percent (--transformTo)</span>
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
      <span class="label"> Size circles (--sizeCircles)</span>
      <InputNumber
        class="field"
        v-model="constCss.sizeCircles"
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
      <Button
        label="Save setting"
        severity="success"
        variant="outlined"
        @click="emit('save-setting')"
      />
    </template>
  </Card>
</template>

<script setup lang="ts">
import InputNumber from 'primevue/inputnumber'
import Card from 'primevue/card'
import Button from 'primevue/button'
import type { constCssType } from '@/types'

const constCss = defineModel<constCssType>('constCss')
const emit = defineEmits(['save-setting'])
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
