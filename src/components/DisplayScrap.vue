<template>
  <table>
    <caption>
      Highschool Scrap Table
    </caption>
    <thead>
      <tr>
        <th >Laptops</th>
        <th >Make</th>
        <th >Model #</th>
        <th >Bar Code</th>
        <th>Serial #</th>
        <th>Location</th>
        <th>Condition</th>
      </tr>
    </thead>
    <tbody>
      <tr></tr>
      <tr></tr>
      <tr></tr>
    </tbody>
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
table {
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #008;
  text-align: center;
  vertical-align: middle;
}

caption {
  font-weight: 600;
  font-size: 24px;
  text-align: left;
  color: #333;
  margin-bottom: 20px;
}

thead {
  background-color: #333;
  color: #fff;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 2%;
}

th,
td {
  border: 1px solid #333;
  padding: 8px;
}

thead,
tfoot {
  background-color: #333;
  color: #fff;
}

.cell-highlight {
  background-color: gold;
  font-weight: 600;
}

tbody tr:nth-child(odd) {
  background-color: #fff;
}

tbody tr:nth-child(even) {
  background-color: #eee;
}

tbody th {
  background-color: #36c;
  color: #fff;
  text-align: left;
}

tbody tr:nth-child(even) th {
  background-color: #25c;
}


</style>
