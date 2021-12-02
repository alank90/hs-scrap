<template>
  <FormModal v-show="isModalVisible" @close="closeModal">
    <template v-slot:header> Add Equipment Item to Scrap List </template>
  </FormModal>

  <img alt="Scrap" src="./assets/images/scrap-equipment.jpg" />

  <div id="app">
    <transition name="button-fade">
      <button
        v-show="isButtonVisible"
        @click="showModal"
        type="button"
        class="btn glow-on-hover"
      >
        Add Equipment
      </button>
    </transition>
  </div>

  <DisplayScrap />
</template>

<script setup>
// This template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref } from "vue";
import DisplayScrap from "./components/display-scrap.vue";
import FormModal from "./components/form-modal.vue";

// Variable Declarations
let isModalVisible = ref(false);
let isButtonVisible = ref(true);

// Methods
const showModal = () => {
  isModalVisible.value = true;
  isButtonVisible.value = false;
};
const closeModal = () => {
  isModalVisible.value = false;
  isButtonVisible.value = true;
};
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

/* ========== Button Glow Stylings ========== */
.glow-on-hover {
  width: 220px;
  height: 50px;
  border: none;
  outline: none;
  color: #fff;
  background: #111;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
}

.glow-on-hover:before {
  content: "";
  background: linear-gradient(
    45deg,
    #ff0000,
    #ff7300,
    #fffb00,
    #48ff00,
    #00ffd5,
    #002bff,
    #7a00ff,
    #ff00c8,
    #ff0000
  );
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: glowing 20s linear infinite;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  border-radius: 10px;
}

.glow-on-hover:active {
  color: #000;
}

.glow-on-hover:active:after {
  background: transparent;
}

.glow-on-hover:hover:before {
  opacity: 1;
}

.glow-on-hover:after {
  z-index: -1;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: #111;
  left: 0;
  top: 0;
  border-radius: 10px;
}

/* ========== End Button Glow Stylings ========== */

/* Transition Effect */
.button-fade-enter-from,
.button-fade-leave-to {
  opacity: 0;
}

.button-fade-enter-active,
.button-fade-leave-active {
  transition: opacity 0.5s ease;
}

@keyframes glowing {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}
</style>
