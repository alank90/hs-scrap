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
        <!-- ============ Form's starts here ========================== !-->
        <!-- ======================================================== !-->

        <section class="modal-body form" id="modalDescription">
          <form v-on:submit.prevent="submitForm()">
            <div class="field">
              <label for="" class="label">Wiped</label>
              <div class="control">
                <div class="select">
                  <select
                    name="
                "
                    id=""
                    v-model="form.Wiped"
                  >
                    <option value="" disabled="disabled">Please Select</option>
                    <!-- Generate Drop Down Menu !-->
                    <option
                      v-for="item in wiped.state"
                      :value="item.value"
                      :key="item.value"
                    >
                      {{ item.text }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="field">
                <label class="label">Name</label>
                <div class="control">
                  <input class="input" placeholder="Name" v-model="form.Name" />
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
                <label class="label">Bar Code *</label>
                <div class="control">
                  <input
                    class="input"
                    placeholder="Must be six digits/optional hs prefix)"
                    v-model="form.Barcode"
                    pattern="^hs[0-9]{6}|^[0-9]{6}"
                    required
                    title="Accepts either hs123456 or 123456 as input."
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
                <label class="label">Location *</label>
                <div class="control">
                  <input
                    class="input"
                    placeholder="Location"
                    v-model="form.Location"
                    required
                  />
                </div>
              </div>

              <div class="field">
                <label class="label">Notes</label>
                <div class="control">
                  <input
                    class="input"
                    placeholder="Notes"
                    v-model="form.Notes"
                  />
                </div>
              </div>
            </div>

            <div class="field is-grouped">
              <div class="control">
                <button class="button is-primary">Submit</button>
              </div>
            </div>
            <p>* - Required field</p>
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
import { reactive, defineEmits, ref } from "vue";
import addRow from "../../helperFunctions/addRow.js";
import createID from "../../helperFunctions/createID.js";

// ================================================================ //
// =================== Variables ================================== //
// ================================================================ //
let form = {
  Wiped: "",
  Name: "",
  Make: "",
  ModelNum: "",
  Barcode: "",
  SerialNum: "",
  Location: "",
  Notes: "",
  ID: "",
};

const emptyForm = reactive({
  Wiped: "",
  Name: "",
  Make: "",
  ModelNum: "",
  Barcode: "",
  SerialNum: "",
  Location: "",
  Notes: "",
  ID: "",
});

const wiped = {
  state: [
    { value: "Yes", text: "Yes" },
    { value: "No", text: "No" },
  ],
};

let formArray = [];
let message = ref("");
// ================================================================ //
// ================= End of Variables ============================= //
// ================================================================ //

// ================================================================ //
// =================== Event Emitters ============================= //
// ================================================================ //

// Setup an event-emiter that is listened for on App.vue @close event-listener
// Also a event-emiter that is listened for on Display-Scrap.vue to update the
// UI when a row is added to SS.
const emit = defineEmits(["close", "emiterUIUpdate"]);
const close = () => {
  emit("close");
};
// ================================================================ //
// ================== End Event Emitters ========================== //
// ================================================================ //

// ================================================================ //
// ======================= Methods ================================ //
// ================================================================ //
const submitForm = async () => {
  //=== Vars ==== //
  let response = {};
  const sheetName = "HS - Chromebooks";
  // Create a unique ID for SS entry to go in the ID column.
  // Then add it to formAsPlainObject. The ID will be used
  // when we want to delete a row from SS.
  const ID = createID(form.Barcode, form.SerialNum);
  form.ID = ID;

  // Push the Form contents onto the formArray[]
  // Need to do this because stein expects the form data to
  // be in an array. So we have to wrap form variable in an array
  formArray.push(form);

  // Submit form to Google sheets via Stein
  response = await addRow(formArray, sheetName);
  message.value = response.updatedRange;

  // Trigger an emitter to send form data to parent App.vue component
  emit("emiterUIUpdate", form);

  // Now we pop the form array data entry off in case
  // there are multiple entries submitted on same instance
  // of the form. Also clear the form var.
  formArray.pop();
  // Clear the form
  Object.assign(form, emptyForm);
};

// ================================================================ //
// ======================= End of Methods ========================= //
// ================================================================ //
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
  overflow-y: scroll;
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

button[aria-label="Close modal"] {
  margin-top: -25px;
}

/* Input validation */
input:not(:placeholder-shown):invalid {
  background-color: salmon;
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
