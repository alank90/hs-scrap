<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + Vite" />
</template>

<script>
import tabletop from "tabletop";

export default {
  methods: {
    init() {
      tabletop
        .init({
          key: "https://docs.google.com/spreadsheets/d/1FuR46OmD4QAekAeIeksmmY2lC_iIJBsr530cwFBWyMo/edit?usp=sharing",
          simpleSheet: true,
        })
        // eslint-disable-next-line no-unused-vars
        .then(function (data, tabletop) {
          console.log(data);
        });
    },
  },
  mounted: function () {
    window.addEventListener("DOMContentLoaded", this.init);
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
