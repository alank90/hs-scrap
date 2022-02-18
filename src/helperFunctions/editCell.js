import SteinStore from "stein-js-client";

const editCell = function (id, text, colName, sheetName) {
  const store = new SteinStore(
    "https://api.steinhq.com/v1/storages/6203d4088d29ba23791a71a0"
  );

  let response = "";

  const cellParams = {
    search: { ID: id },
    set: { [colName]: text },
  };

  store
    .edit(sheetName, cellParams)
    .then((res) => {
      response = res;
    })
    .catch((e) => {
      console.error(e);
    });

  return response;
};

export default editCell;
