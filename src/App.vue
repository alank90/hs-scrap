<template>
  <img alt="Scrap" src="./assets/images/scrap-equipment.jpg" />
  <div id="app">
    <button @click="showModal" type="button" class="btn">Open Modal</button>
    <FormModal v-show="isModalVisible" @close="closeModal" />
  </div>
  <DisplayScrap />
</template>

<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref } from "vue";
import DisplayScrap from "./components/display-scrap.vue";
import FormModal from "./components/form-modal.vue";
// Variable Declarations
let isModalVisible = ref(false);

// Methods
const showModal = () => {
  console.log("I clicked the button");
  isModalVisible.value = true;
};
const closeModal = () => {
  console.log(" I clicked closed button");
  isModalVisible.value = false};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

img[alt="Scrap"] {
  border-radius: 50%;
}
</style>
