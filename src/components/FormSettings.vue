<script setup lang="ts">
import { ref, defineProps, defineEmits, defineModel } from 'vue'
import InputNumber from 'primevue/inputnumber'

const model = defineModel()
const emit = defineEmits(['update:model'])
</script>

<template>
  <div class="form">
    <!--    TODO: плейсхолдеры-->
    <!--    TODO: настройки-->
    <!--    TODO: сохранить в конечный вид-->
    <div class="placeholders"></div>
    <div class="settings">
      <span class="label">Внешний размер лоадера в пикселях (--transformFrom)</span>
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
      <span class="label">Внутренний отступ лоадера в пикселях (--transformTo)</span>
      <InputNumber
        class="field"
        v-model="model.transformTo"
        :min="0"
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
