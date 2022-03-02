<template>
  <!-- ===== Some conditional HTML markup ========= -->
  <p v-if="failure" class="alert">Error retrieving Google Sheets. Sorry.</p>

  <p v-if="rowCount > 0" class="status-message">
    Deleted {{ rowCount }} row. Successful &#10004;
  </p>

  <p v-if="rowsUpdated > 0" class="status-message">
    Updated {{ rowsUpdated }} row. Successful &#10004;
  </p>

  <p v-if="message" class="status-message" title="Click to dismiss">
    Operation Cancelled <span @click="message = false">&#10060;</span>
  </p>

  <!-- ============== Begin Table Markup ================= !-->
  <table>
    <caption>
      SHS Scrap 2021-2022 Table
    </caption>
    <thead>
      <tr>
        <th>High School</th>
        <th>Wiped(Y/N)</th>
        <th>Name</th>
        <th>Make</th>
        <th>Bar Code</th>
        <th>Serial #</th>
        <th>Model #</th>
        <th>Location</th>
        <th>Notes</th>
      </tr>
    </thead>
    <tbody @focusout="onEdit" @focusin="getCellValue" @keydown.enter="endEdit">
      <tr v-for="(aItem, index) in aChromebooks" :key="aItem[ID]">
        <td contenteditable :data-col-name="'High School'">
          {{ aItem["High School"] }}
        </td>
        <td contenteditable :data-col-name="'Wiped'">{{ aItem["Wiped"] }}</td>
        <td contenteditable :data-col-name="'Name'">{{ aItem["Name"] }}</td>
        <td contenteditable :data-col-name="'Make'">{{ aItem["Make"] }}</td>
        <td contenteditable :data-col-name="'Barcode'">
          {{ aItem["Barcode"] }}
        </td>
        <td contenteditable :data-col-name="'SerialNum'">
          {{ aItem["SerialNum"] }}
        </td>
        <td contenteditable :data-col-name="'ModelNum'">
          {{ aItem["ModelNum"] }}
        </td>
        <td contenteditable :data-col-name="'Location'">
          {{ aItem["Location"] }}
        </td>
        <td contenteditable :data-col-name="'Notes'">{{ aItem["Notes"] }}</td>
        <td
          @click="removeRow"
          class="delete-row"
          :data-id="aItem['ID']"
          :data-array-position="index"
          title="Delete Row"
        >
          &#x1f5d1;
        </td>
      </tr>
    </tbody>
  </table>
  <!-- ========= End Table Markup ================== -->
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import SteinStore from "stein-js-client";
import deleteRow from "../../helperFunctions/deleteRow.js";
import { useEditCell } from "../../helperFunctions/editCell.js";

//======= Component Vars ========================= //
let scrapDataHSChromebooks = ref([]);
let failure = ref(false);
let rowCount = ref(0);
let rowsUpdated = ref(0);
let message = ref(false);
let currentCellValue = ref("");
let aChromebooks = ref([]);
const sheetName = "HS - Chromebooks";

// ======== Computed Values ================== //
// First, Let's remove all empty rows from the SS
// eslint-disable-next-line no-unused-vars
let emptyRowsRemoved = computed(() =>
  scrapDataHSChromebooks.value.filter((item) => item.Barcode || item.SerialNum)
);

// ================================================================ //
// ================================= Methods ====================== //
// ================================================================ //

// Now let's use Stein to retrieve the SS data for sheet
// eslint-disable-next-line no-unused-vars
const fetchSheetsData = function () {
  const store = new SteinStore(
    "https://api.steinhq.com/v1/storages/6203d4088d29ba23791a71a0"
  );
  store
    .read("HS - Chromebooks")
    .then((data) => {
      scrapDataHSChromebooks.value = data;
      // Push item onto aChromebooks array
      emptyRowsRemoved.value.forEach((item) => {
        aChromebooks.value.push(item);
      });
    })
    .catch((e) => {
      console.error(e);
      failure.value = true;
    });
};

const getCellValue = (e) => {
  // This function simply gets contents of current cell on focusIn.
  const currentCell = e.target;
  currentCellValue.value = currentCell.textContent;
};

// Edit event listener
const onEdit = async (e) => {
  // Reinitialize rowsUpdated
  rowsUpdated.value = 0;

  // ====== Function Vars =================== //
  const currentCell = e.target;
  const parent = currentCell.parentNode;
  // Get the delete-row cell
  const cellContainingRowID = parent.lastChild;
  // Now grab the unique data-id value for the row
  const id = cellContainingRowID.dataset.id;
  const colName = currentCell.dataset.colName;
  const newCellValue = currentCell.textContent;

  // Check if any edit was made to cell. If not return from function.
  if (currentCellValue.value === newCellValue) {
    return;
  }

  // Send edited cell contents to SS
  // Submit form to Google sheets via Stein
  const { response } = await useEditCell(
    currentCellValue.value,
    id,
    newCellValue,
    colName,
    sheetName,
    cellContainingRowID
  );

  rowsUpdated.value = response.totalUpdatedRows;
};

const endEdit = (e) => {
  // Reinitialize rowsUpdated
  rowsUpdated.value = 0;

  // ======= Function Vars =========================== //
  const currentCell = e.target;
  const newCellValue = currentCell.textContent;

  if (currentCellValue.value === newCellValue) {
    return;
  }

  // Force a blur event on keyboard <enter>
  e.target.blur();
};

// =============== Called on component mount =============================== //
onMounted(fetchSheetsData);

// ================================================================ //
// ===== Called when trash can clicked on the page ================ //
// ================================================================ //
const removeRow = async (e) => {
  let result = confirm("Are you sure?");
  if (result) {
    let response = await deleteRow(sheetName, e.target, aChromebooks);
    rowCount.value = response.clearedRowsCount;
  } else {
    message.value = true;
  }
};
// ================================================================ //
// ====================== End removeRow =========================== //
// ================================================================ //

// ================================================================ //
// ========================== End of Methods ====================== //
// ================================================================ //
</script>

<style scoped>
/*
 * Define the widths: play around with these to get a best fit.
 */
:root {
  --text-width: 180px;
  --num-width: 80px;
}

HTML CSS Result Skip Results Iframe EDIT ON * {
  box-sizing: border-box;
  font-family: "Avenir", "Helvetica", sans-serif;
}

body {
  background-color: #f9f9f9;
}

/* Default table styles for this demo */
table {
  border-collapse: collapse;
  text-align: center;
  vertical-align: middle;
  width: 100%;
}

caption {
  font-weight: bold;
  font-size: 24px;
  text-align: left;
  color: #333;
  margin: 20px;
}

thead {
  background-color: #333;
  color: white;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 2%;
}

table th,
table td {
  padding: 10px 20px;
  border: 1px solid black;
  padding: 8px;
}

table th {
  color: #fff;
  border-right-color: #8db7e0;
}

tbody tr:nth-child(odd) {
  background-color: rgb(223, 234, 236);
}
tbody tr:nth-child(odd):hover {
  background-color: rgb(223, 234, 236, 0.7);
}

tbody tr:nth-child(even) {
  background-color: rgb(212, 223, 240);
}
tbody tr:nth-child(even):hover {
  background-color: rgb(212, 223, 240, 0.7);
}

.equipt-type {
  background-color: #8db7e0;
}

.delete-row {
  cursor: pointer;
}

.status-message {
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  color: #069e20;
  font-weight: 600;
  font-size: 1.3rem;
  margin: 15px;
}

.status-message span {
  cursor: pointer;
}

.alert {
  color: #d35501;
  font-weight: 600;
  font-size: 2rem;
  margin: 15px;
}

/* Simple CSS for flexbox table on mobile */
@media (max-width: 800px) {
  table thead {
    left: -9999px;
    position: absolute;
    visibility: hidden;
  }
  table tr {
    border-bottom: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 40px;
  }
  table td {
    border: 1px solid;
    margin: 0 -1px -1px 0;
    width: 50%;
  }
}
</style>
