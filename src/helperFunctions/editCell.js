import SteinStore from "stein-js-client";

const editCell = async function (id, text, colName, sheetName, lastChild) {
  // =============== Module vars =========================== //
  const store = new SteinStore(
    "https://api.steinhq.com/v1/storages/6203d4088d29ba23791a71a0"
  );

  const cellParams = {
    search: { ID: id },
    set: { [colName]: text },
  };
  const currentID = lastChild.dataset.id;
  console.log("Parameters are : ", id, text, colName, currentID);
  let response = null;

  await store
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
