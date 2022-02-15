import SteinStore from "stein-js-client";

const store = new SteinStore(
  "https://api.steinhq.com/v1/storages/6203d4088d29ba23791a71a0"
);
var response = "";

const addRow = async function (row, sheetName) {
  await store
    .append(sheetName, row)
    .then((res) => {
      response = res;
    })
    .catch((e) => {
      console.error(e);
    });

  return response;
};

export default addRow;
