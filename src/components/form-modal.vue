<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <button @click="close" type="button" class="btn-close">&#11199;</button>
        <header class="modal-header" id="modalTitle">
          <slot name="header"> This is default title! </slot>
        </header>

        <!-- ======================================================== !-->
        <!-- ============ Form starts here ========================== !-->
        <!-- ======================================================== !-->

        <section class="modal-body form" id="modalDescription">
          <form v-on:submit.prevent="submitForm()">
            <slot name="body"> This is default body! </slot>
            <div class="field">
              <label for="" class="label">Equipment Type</label>
              <div class="control">
                <div class="select">
                  <select
                    name="
                "
                    id=""
                    v-model="form.eqpmntType"
                  >
                    <option value="" disabled="disabled">
                      Nothing Selected
                    </option>
                    <!-- Generate Drop Down Menu !-->
                    <option
                      v-for="option in options.eqpmntType"
                      :value="option.value"
                      :key="option.value"
                    >
                      {{ option.text }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="field">
                <label class="label">Model #</label>
                <div class="control">
                  <input
                    class="input"
                    placeholder="Model #"
                    v-model="form.modelNum"
                  />
                </div>
              </div>

              <div class="field">
                <label class="label">Bar Code</label>
                <div class="control">
                  <input
                    class="input"
                    placeholder="Bar Code"
                    v-model="form.barCode"
                  />
                </div>
              </div>

              <div class="field">
                <label class="label">Serial #</label>
                <div class="control">
                  <input
                    class="input"
                    placeholder="Serial #"
                    v-model="form.serialNum"
                  />
                </div>
              </div>

              <div class="field">
                <label class="label">Location</label>
                <div class="control">
                  <input
                    class="input"
                    placeholder="Location"
                    v-model="form.location"
                  />
                </div>
              </div>

              <div class="field">
                <label class="label">Condition</label>
                <div class="control">
                  <input
                    class="input"
                    placeholder="Condition"
                    v-model="form.condition"
                  />
                </div>
              </div>
            </div>

            <div class="field is-grouped">
              <div class="control">
                <button class="button is-primary">Submit</button>
              </div>
            </div>
          </form>
        </section>

        <!-- ======================================================== !-->
        <!-- ============ Form ends here ============================ !-->
        <!-- ======================================================== !-->

        <footer class="modal-footer">
          <button
            @click="close"
            type="button"
            class="button is-info"
            aria-label="Close modal"
          >
            Close Form
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { reactive, defineEmits } from "vue";
// Variables
let form = reactive({
  eqpmntType: "",
  make: "",
  modelNum: "",
  barCode: "",
  serialNum: "",
  location: "",
  condition: "",
});
const options = reactive({
  eqpmntType: [
    { value: "laptops", text: "Laptops" },
    { value: "iPads", text: "iPads" },
    { value: "docCamera", text: "Document Camera" },
    { value: "projector", text: "Overhead Projector" },
    { value: "scanner", text: "Scanner" },
    { value: "macbooks", text: "MacBooks" },
    { value: "chromebooks", text: "Chromebooks" },
    { value: "desktops", text: "Desktops" },
  ],
});

const formArray = [];

// Setup an event-emmiter that is listened for on App.vue @close event-listener
const emit = defineEmits(["close"]);
const close = () => {
  emit("close");
};

// ========= Methods ================ //
const submitForm = function () {
  formArray.push(form);
  console.log(form);
  console.log(formArray[0].eqpmntType);
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  max-width: 500px;
  height: auto;
  margin: 10px auto;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #2e456d;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #2e456d;
  background: transparent;
}

/* Transition Effect */
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.75s ease;
}
</style>
