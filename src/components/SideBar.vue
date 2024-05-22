<script setup>
import {} from 'vue'
// export default {
//   name: 'SideBar',
//   props: {
//     msg: String
//   }
// }
</script>

<template>
  <div class="sidebar">
    <div class="container"></div>
  </div>
</template>

<style scoped>
.sidebar {
  width: 300px;
  height: 100vh;
  background-color: #9d0c0c;
  media (max-width: 768px) {
    width: 100vh;
  }
  .container {
    width: 100%;
    height: 100%;
    padding: 20px;
  }
}
</style>
