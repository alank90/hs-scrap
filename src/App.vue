<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import DisplayScrap from "./components/DisplayScrap.vue";
</script>

<template>
  <img alt="Scrap" src="./assets/images/scrap-equipment.jpg" />
  <DisplayScrap />
</template>

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
