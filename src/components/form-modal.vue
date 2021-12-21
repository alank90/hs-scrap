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
            <div class="field">
              <label for="" class="label">Equipment Type</label>
              <div class="control">
                <div class="select">
                  <select
                    name="
                "
                    id=""
                    v-model="form.Equipment"
                  >
                    <option value="" disabled="disabled">Please Select</option>
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
                <label class="label">Make</label>
                <div class="control">
                  <input
                    class="input"
                    placeholder="Equipment Maker"
                    v-model="form.Make"
                  />
                </div>
              </div>

              <div class="field">
                <label class="label">Model #</label>
                <div class="control">
                  <input
                    class="input"
                    placeholder="Model #"
                    v-model="form.ModelNum"
                  />
                </div>
              </div>

              <div class="field">
                <label class="label">Bar Code</label>
                <div class="control">
                  <input
                    class="input"
                    placeholder="Bar Code"
                    v-model="form.Barcode"
                  />
                </div>
              </div>

              <div class="field">
                <label class="label">Serial #</label>
                <div class="control">
                  <input
                    class="input"
                    placeholder="Serial #"
                    v-model="form.SerialNum"
                  />
                </div>
              </div>

              <div class="field">
                <label class="label">Location</label>
                <div class="control">
                  <input
                    class="input"
                    placeholder="Location"
                    v-model="form.Location"
                  />
                </div>
              </div>

              <label for="" class="label">Condition</label>
              <div class="control">
                <div class="select">
                  <select
                    name="
                "
                    id=""
                    v-model="form.Condition"
                  >
                    <option value="" disabled="disabled">Please Select</option>
                    <!-- Generate Drop Down Menu !-->
                    <option
                      v-for="condition in conditions.conditionType"
                      :value="condition.value"
                      :key="condition.value"
                    >
                      {{ condition.text }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div class="field is-grouped">
              <div class="control">
                <button @click="handleUpdateUI" class="button is-primary">
                  Submit
                </button>
              </div>
            </div>
          </form>

          <p v-if="message">Added {{ message }} Successful!</p>
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
import { reactive, defineEmits, ref, toRaw } from "vue";
import addRow from "../helperFunctions/addRow.js";

// ========== Variables ================ //
let form = reactive({
  Equipment: "",
  Make: "",
  ModelNum: "",
  Barcode: "",
  SerialNum: "",
  Location: "",
  Condition: "",
});
const options = reactive({
  eqpmntType: [
    { value: "Laptop", text: "Laptop" },
    { value: "iPad", text: "iPad" },
    { value: "Document Camera", text: "Document Camera" },
    { value: "Overhead Projector", text: "Overhead Projector" },
    { value: "Scanner", text: "Scanner" },
    { value: "MacBook", text: "MacBook" },
    { value: "Chromebook", text: "Chromebook" },
    { value: "Desktop", text: "Desktop" },
  ],
});

const conditions = reactive({
  conditionType: [
    { value: "Excellent", text: "Excellent" },
    { value: "Good", text: "Good" },
    { value: "Fair", text: "Fair" },
    { value: "Poor", text: "Poor" },
  ],
});

let formArray = [];
let message = ref("");

// Setup an event-emmiter that is listened for on App.vue @close event-listener
// Also a event-emitter that is listened for on Display-Scrap.vue to update the
// UI when a row is added to SS.
const emit = defineEmits(["close", "updateUI"]);
const close = () => {
  emit("close");
};

// ========= Methods ================ //
const submitForm = async () => {
  //=== Vars ==== //
  let formAsPlainObject = toRaw(form); // Strip out Proxy
  let response = {};

  // Push the Form contents onto the formArray[]
  formArray.push(formAsPlainObject);

  // Submit form to Google sheets via Stein
  response = await addRow(formArray);
  message.value = response.updatedRange;

  // Update UI by pushing row onto oEquiptByType
  //oEquiptByType[row[0]["Equipment"]].push(row[0]);
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
