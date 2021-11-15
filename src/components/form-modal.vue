<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header" id="modalTitle">
          <button @click="close" type="button" class="btn-close btn-blue">
            &#11199;
          </button>
          <slot name="header"> This is default title! </slot>
        </header>

        <!-- ======================================================== !-->
        <!-- ============ Form starts here ========================== !-->
        <!-- ======================================================== !-->

        <section class="modal-body form" id="modalDescription">
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
                  <option value="" disabled="disabled">Nothing Selected</option>
                </select>
              </div>
            </div>

            <div class="field">
              <label class="label">Model #</label>
              <div class="control">
                <textarea
                  class="textarea"
                  placeholder="Model #"
                  v-model="form.modelNum"
                ></textarea>
              </div>
            </div>

            <div class="field">
              <label class="label">Bar Code</label>
              <div class="control">
                <textarea
                  class="textarea"
                  placeholder="Bar Code"
                  v-model="form.barCode"
                ></textarea>
              </div>
            </div>

            <div class="field">
              <label class="label">Serial #</label>
              <div class="control">
                <textarea
                  class="textarea"
                  placeholder="Serial #"
                  v-model="form.serialNum"
                ></textarea>
              </div>
            </div>

            <div class="field">
              <label class="label">Location</label>
              <div class="control">
                <textarea
                  class="textarea"
                  placeholder="Location"
                  v-model="form.location"
                ></textarea>
              </div>
            </div>

            <div class="field">
              <label class="label">Condition</label>
              <div class="control">
                <textarea
                  class="textarea"
                  placeholder="Condition"
                  v-model="form.condition"
                ></textarea>
              </div>
            </div>
          </div>
        </section>

        <!-- ======================================================== !-->
        <!-- ============ Form ends here ============================ !-->
        <!-- ======================================================== !-->

        <footer class="modal-footer">
          <slot name="footer"> This is default footer! </slot>
          <button
            @click="close"
            type="button"
            class="btn-blue"
            aria-label="Close modal"
          >
            Close Modal
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, defineEmits } from "vue";
// Variables
let form = ref({
  eqpmntType: "",
  make: "",
  modelNum: "",
  barCode: "",
  serialNum: "",
  location: "",
  condition: "",
});

// Setup an event-emmiter that is listened for on App.vue @close event-listener
const emit = defineEmits(["close"]);
const close = () => {
  emit("close");
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

.btn-blue {
  color: white;
  background: #2e456d;
  border: 1px solid #2e456d;
  border-radius: 2px;
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
