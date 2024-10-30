<script setup>
import { ref } from 'vue'
import InputNumber from 'primevue/inputnumber'
const value4 = ref(0)
// export default {
//   name: 'SideBar',
//   props: {
//     msg: String
//   }
// }
</script>

<template>
  <div class="form">
    <!--    TODO: плейсхолдеры-->
    <!--    TODO: настройки-->
    <!--    TODO: сохранить в конечный вид-->
    <div class="placeholders"></div>
    <div class="settings">
      <InputNumber v-model="value4" input-id="minmax" :min="0" :max="100" fluid />
      <InputNumber v-model="value4" input-id="minmax" :min="0" :max="100" fluid />
      <InputNumber v-model="value4" input-id="minmax" :min="0" :max="100" fluid />
      <InputNumber v-model="value4" input-id="minmax" :min="0" :max="100" fluid />
      <InputNumber v-model="value4" input-id="minmax" :min="0" :max="100" fluid />
      <InputNumber v-model="value4" input-id="minmax" :min="0" :max="100" fluid />
    </div>
    <div class="save"></div>
  </div>
</template>

<style scoped>
.form {

}
</style>
