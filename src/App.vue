<template>
  <!-- ============== Modal Component ============= -->
  <FormModal
    v-show="isModalVisible"
    @close="closeModal"
    @emiterUIUpdate="updateUI"
  >
    <template v-slot:header> Add Equipment Item to Scrap List </template>
  </FormModal>

  <div id="main">
    <img alt="Scrap" src="./assets/images/scrap-equipment.jpg" />

    <div class="top-container">
      <button @click="switchSheet">{{ currentSheet }}</button>

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

      <a
        href="https://docs.google.com/spreadsheets/d/1nmpXwBX6Y6Hf7ZryDN7ChOSb6FVR7D-50dTy7kpjzSE/edit#gid=0"
        class="sheets-link"
        target="_blank"
        >To Google Sheets
      </a>
    </div>
  </div>

  <component :is="sheetView" :key="componentKey" />
</template>

<script setup>
// This template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref } from "vue";
import FormModal from "./components/form-modal.vue";
import DisplaySheetClassrooms from "./components/displaySS/display-sheet-classrooms.vue";
// eslint-disable-next-line no-unused-vars
import DisplaySheetChromebooks from "./components/displaySS/display-sheet-chromebooks.vue";

// ========== Variable Declarations =========== //
let isModalVisible = ref(false);
let isButtonVisible = ref(true);
let componentKey = ref(0);
let sheetView = DisplaySheetClassrooms;
let currentSheet = ref("HS Classrooms");

// ========== Methods ====================== //
const showModal = () => {
  isModalVisible.value = true;
  isButtonVisible.value = false;
};
const closeModal = () => {
  isModalVisible.value = false;
  isButtonVisible.value = true;
};

// Method to be called when there is an emiterUIUpdate event emiited
// from form-modal.vue. Refresh the page.
const updateUI = () => {
  // Key-changing to force re-renders of component Display-Scrap.vue.
  // Every time upDateUI is called, our prop componentKey will change.
  // When this happens, Vue will know that it has to destroy the component
  // and create a new one.
  componentKey.value += 1;
};

const switchSheet = () => {
  if (sheetView == DisplaySheetClassrooms) {
    console.log("sheetview changed??");
    sheetView = DisplaySheetChromebooks;
    currentSheet.value = "HS Chromebooks";
  } else {
    sheetView = DisplaySheetClassrooms;
    currentSheet.value = "HS Classrooms";
  }
};
</script>

<style>
#main {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

img[alt="Scrap"] {
  border-radius: 50%;
  display: block;
  margin: 0 auto 30px;
}

.top-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sheets-link {
  background-color: #34a853;
  color: #ffffff;
  min-width: 200px;
  text-align: center;
  border-radius: 15px;
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 3px;
  transition: color 0.6s ease-in;
}
.sheets-link:hover {
  color: rgb(183, 230, 183);
}

.btn {
  margin: 1px;
  font-size: 1.1rem;
  font-weight: 600;
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
