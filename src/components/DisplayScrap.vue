<template>
  <h1>SHS Highschool Scrap Inventory</h1>
</template>

<script setup>
import { ref, Mounted } from "vue";
import Papa from "papaparse";

const googleSheetsUrl = ref(
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRaQMAjTTNGL1262_zV_dSHS_M_nlu29MlZpHuBoa4nsBnGA1JMu8W60Ur2756PgBMNrL0v6CvMyCDI/pub?output=csv"
);

// eslint-disable-next-line no-unused-vars
let scrapData = ref([]);

// eslint-disable-next-line no-unused-vars
const fetchSheetsData = Papa.parse(googleSheetsUrl, {
  download: true,
  header: true,
  complete: (results) => (scrapData = console.log(results.data)),
});
Mounted(() => {
  fetchSheetsData();
});
</script>
