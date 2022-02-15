<template>
  <!-- ===== Some conditional HTML markup ========= -->
  <p v-if="failure" class="alert">Error retrieving Google Sheets. Sorry.</p>

  <p v-if="rowCount > 0" class="status-message">
    Deleted {{ rowCount }} row. Successful &#10004;
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
        <th>Make</th>
        <th>Model Number</th>
        <th>Bar Code</th>
        <th>Serial #</th>
        <th>Location</th>
        <th>Condition</th>
        <th>Equipment</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(item, key) in oEquiptByType">
        <tr v-if="item.length > 0" :key="key">
          <td class="equipt-type" colspan="8">Equipment - {{ key }}s</td>
        </tr>
        <tr v-for="(oItem, index) in item" :key="oItem[ID]">
          <td>{{ oItem["Make"] }}</td>
          <td>{{ oItem["ModelNum"] }}</td>
          <td>{{ oItem["Barcode"] }}</td>
          <td>{{ oItem["SerialNum"] }}</td>
          <td>{{ oItem["Location"] }}</td>
          <td>{{ oItem["Condition"] }}</td>
          <td>{{ oItem["Equipment"] }}</td>
          <td
            @click="removeRow"
            class="delete-row"
            :data-id="oItem['ID']"
            :data-eqpmnt-type="oItem['Equipment']"
            :data-array-position="index"
            title="Delete Row"
          >
            &#x1f5d1;
          </td>
        </tr>
      </template>
    </tbody>
  </table>
  <!-- ========= End Table Markup ================== -->
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import SteinStore from "stein-js-client";
import deleteRow from "../../helperFunctions/deleteRow.js";

//======= Vars ================== //
let scrapDataHSClassrooms = ref([]);
let failure = ref(false);
let rowCount = ref(0);
let message = ref(false);
let oEquiptByType = reactive({
  Laptop: [],
  iPad: [],
  "Document Camera": [],
  "Overhead Projector": [],
  Chromebook: [],
  Desktop: [],
  MacBook: [],
  Scanner: [],
  Misc: [],
});

const sheetName = "HS - Classrooms";

// ======== Computed Values ================== //
// First, Let's remove all empty rows from the SS
// eslint-disable-next-line no-unused-vars
let emptyRowsRemoved = computed(() =>
  scrapDataHSClassrooms.value.filter(
    (item) => item["Equipment"] || item["Make"]
  )
);

// ================================================================ //
// ================================= Methods ====================== //
// ================================================================ //

// Now let's use Stein to retrieve the SS data
// eslint-disable-next-line no-unused-vars
const fetchSheetsData = function () {
  const store = new SteinStore(
    "https://api.steinhq.com/v1/storages/6203d4088d29ba23791a71a0"
  );
  store
    .read("HS - Classrooms")
    .then((data) => {
      scrapDataHSClassrooms.value = data;

      emptyRowsRemoved.value.forEach((item) => {
        // Let's construct an object that separates equipment by type
        // Check if property exists on oEquiptByType object
        const exists = Object.prototype.hasOwnProperty.call(
          oEquiptByType,
          item["Equipment"]
        );

        // If item(row) is good lets push the row onto the corresponding Object Array
        // in oEquiptByType. This will construct an object where each object property corresponds
        // to an equipment category. And each oEquiptByType entry is an array where each array
        // element is a row from the SS. e.g., oEquiptByType["Laptop"][3] is a row from
        // SS and is a laptop.
        if (exists) {
          oEquiptByType[item["Equipment"]].push(item);
        }
      });
    })
    .catch((e) => {
      console.error(e);
      failure.value = true;
    });
};

// =============== Called on component mount =============================== //
onMounted(fetchSheetsData);

// ================================================================ //
// ===== Called when trash can clicked on the page ================ //
// ================================================================ //
const removeRow = async (e) => {
  let result = confirm("Are you sure?");
  if (result) {
    const eqptmntType = e.target.dataset.eqpmntType;
    let response = await deleteRow(
      sheetName,
      e.target,
      oEquiptByType[eqptmntType]
    );
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
  color: #069e20;
  font-weight: 600;
  font-size: 2rem;
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
