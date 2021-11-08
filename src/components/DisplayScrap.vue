<template>
  <h1>SHS Highschool Scrap Inventory</h1>

  <table>
    <tr>
      <th colspan="3">Laptops</th>
      <th colspan="3">Make</th>
      <th colspan="3">Model #</th>
      <th colspan="2">Bar Code</th>
      <th>Serial #</th>
      <th>Location</th>
      <th>Condition</th>
    </tr>
  </table>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Papa from "papaparse";

const googleSheetsUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRaQMAjTTNGL1262_zV_dSHS_M_nlu29MlZpHuBoa4nsBnGA1JMu8W60Ur2756PgBMNrL0v6CvMyCDI/pub?gid=0&single=true&output=csv";
// eslint-disable-next-line no-unused-vars
let scrapData = ref([1, 2, 3]);

// eslint-disable-next-line no-unused-vars
const fetchSheetsData = function () {
  Papa.parse(googleSheetsUrl, {
    download: true,
    header: true,
    complete: (results) => {
      scrapData.value = results.data;
    },
  });
  console.log("scrapData after", scrapData.value);
};

onMounted(fetchSheetsData);
</script>

<style scoped>
table,
td {
  border: 1px solid #333;
}

thead,
tfoot {
  background-color: #333;
  color: #fff;
}
</style>
