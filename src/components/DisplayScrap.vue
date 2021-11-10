<template>
  <table>
    <caption>
      SHS Scrap Table
    </caption>
    <thead>
      <tr>
        <th>Make</th>
        <th>Model #</th>
        <th>Bar Code</th>
        <th>Serial #</th>
        <th>Location</th>
        <th>Condition</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(item, index) in scrapDataEmptyRowsRemoved">
        <tr v-if="item['Equipment Type']" :key="index">
          <td class="equipt-type" colspan="6">
            Equipment Type - {{ item["Equipment Type"] }}
          </td>
        </tr>
        <tr v-else :key="item">
          <td>{{ item["Make"] }}</td>
          <td>{{ item["Model #"] }}</td>
          <td>{{ item["Bar Code"] }}</td>
          <td>{{ item["Serial #"] }}</td>
          <td>{{ item["Location"] }}</td>
          <td>{{ item["Condition"] }}</td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Papa from "papaparse";

const googleSheetsUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRaQMAjTTNGL1262_zV_dSHS_M_nlu29MlZpHuBoa4nsBnGA1JMu8W60Ur2756PgBMNrL0v6CvMyCDI/pub?gid=0&single=true&output=csv";
// eslint-disable-next-line no-unused-vars
let scrapData = ref([]);
let scrapDataEmptyRowsRemoved = computed(() =>
  scrapData.value.filter(
    (item) => item["Equipment Type"] !== "" || item["Make"] !== ""
  )
);

// eslint-disable-next-line no-unused-vars
const fetchSheetsData = function () {
  Papa.parse(googleSheetsUrl, {
    download: true,
    header: true,
    complete: (results) => {
      scrapData.value = results.data;
    },
  });
};

onMounted(fetchSheetsData);
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
  margin-bottom: 20px;
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
  background-color: cadetblue;
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
