<template>
  <!-- ============== Form add equipment Modal Component ========= -->
  <component
    :is="forms[currentForm]"
    v-show="isModalVisible"
    @close="closeModal"
    @emiterUIUpdate="updateUI"
  >
    <template v-slot:header> Add Equipment Item to Scrap List </template>
  </component>
  <!-- ========= End Modal Component ============= -->

  <!-- ========== Begin Main Page Markup ==================================== -->
  <img alt="Scrap" src="./assets/images/scrap-equipment.jpg" />

  <!-- ============== Auth0 login markup ============== -->
  <div v-if="!AuthState.loading">
    <div v-if="!AuthState.isAuthenticated" class="login">
      <h1>Welcome to HS Scrap.</h1>
      <img src="./assets/images/scrap-logo.jpg" alt="Scrap logo" />
      <button @click="login()" class="btn-login btn-login-secondary">
        Login
      </button>
    </div>

    <div v-else class="logout">
      <p>
        Welcome to HS Scrap <strong> {{ AuthState.user.name }} </strong>
      </p>
      <button @click="logout()" class="btn-login btn-login-secondary">
        Logout
      </button>
    </div>
  </div>

  <div v-else>Loading...</div>

  <!-- ============== End Auth0 login markup ============ -->

  <div v-if="AuthState.isAuthenticated" id="main">
    <div class="top-container">
      <transition name="button-fade">
        <button
          v-show="isButtonVisible"
          @click="switchSheet"
          type="button"
          class="btn glow-on-hover"
          title="Click to Change Sheet"
        >
          Current Sheet: {{ displayedSheetName }}
        </button>
      </transition>

      <transition name="button-fade">
        <button
          v-show="isButtonVisible"
          @click="showModal"
          type="button"
          class="btn glow-on-hover"
          title="Form to Add a Row"
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

    <component :is="components[currentSheet]" :key="componentKey" />
  </div>
</template>

<script setup>
// This template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref, computed } from "vue";
import { useAuth0, AuthState } from "./helperFunctions/useAuth0";
import FormModalClassrooms from "./components/forms/form-modal-classrooms.vue";
import FormModalChromebooks from "./components/forms/form-modal-chromebooks.vue";
import DisplaySheetClassrooms from "./components/displaySS/display-sheet-classrooms.vue";
import DisplaySheetChromebooks from "./components/displaySS/display-sheet-chromebooks.vue";

// ========== Variable Declarations =========== //
let isModalVisible = ref(false);
let isButtonVisible = ref(true);
let componentKey = ref(0);
let currentSheet = ref("DisplaySheetClassrooms");
let currentForm = ref("FormModalClassrooms");

const components = {
  DisplaySheetChromebooks,
  DisplaySheetClassrooms,
};

const forms = {
  FormModalChromebooks,
  FormModalClassrooms,
};

// ========  Auth0 initialization ============== //
const { login, logout, initAuth } = useAuth0(AuthState);

initAuth();
// =========== end Auth0 init ================== //

// =========== Computed Properties ========== //
const displayedSheetName = computed(() => {
  return currentSheet.value.substring(12);
});

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

// Changes displayed component in UI
const switchSheet = () => {
  if (currentSheet.value === "DisplaySheetClassrooms") {
    currentSheet.value = "DisplaySheetChromebooks";
    currentForm.value = "FormModalChromebooks";
  } else {
    currentSheet.value = "DisplaySheetClassrooms";
    currentForm.value = "FormModalClassrooms";
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

.login > h1 {
  font-size: 1.3rem;
  font-weight: 600;
  min-width: 400px;
  margin: 0 auto;
}

img[alt="Scrap"] {
  border-radius: 50%;
  display: block;
  margin: 15px auto 30px;
}

.top-container {
  /* position: relative; */
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.sheets-link {
  background-color: #34a853;
  color: #ffffff;
  min-width: 200px;
  text-align: center;
  border-radius: 15px;
  position: absolute;
  top: 15px;
  right: 0;
  margin-right: 3px;
  transition: color 0.6s ease-in;
}
.sheets-link:hover {
  color: rgb(183, 230, 183);
}

.btn {
  margin: 1px;
  font-size: 16px;
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

/* Login Button Stylings */
.btn-login {
  /* display: block; */
  background: #41b883;
  color: white;
  padding: 8px 12px;
  margin-bottom: 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  border: none;
  cursor: pointer;
  min-width: 100px;
  border-radius: 4px;
  font-weight: bold;
  max-width: 400px;
  margin: 0 auto;
}

img[alt="Scrap logo"] {
  margin: 0 auto;
}

.login {
  display: flex;
  flex-wrap: wrap;
  max-width: 200px;
  margin: 15px auto;
}

.logout {
  margin-left: 5px;
}

/* End login button stylings */
</style>
