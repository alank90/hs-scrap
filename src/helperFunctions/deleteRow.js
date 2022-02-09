import SteinStore from "stein-js-client";

const store = new SteinStore(
  "https://api.steinhq.com/v1/storages/6203d4088d29ba23791a71a0"
);
var response = "";

const deleteRow = async (row, eqpmntArray) => {
  // ========= Vars ======================= //
  // get the row ID stored in data-id attr
  const rowID = row.dataset.id;
  const rowArrayPosition = row.dataset.arrayPosition;

  // Delete row from Google SS
  await store
    .delete("HS - Classrooms", {
      search: { ID: rowID },
    })
    .then((res) => {
      response = res;

      // Delete row from DOM
      eqpmntArray.splice(rowArrayPosition, 1);
    })
    .catch((e) => {
      console.error(e);
    });

  return response;
};

export default deleteRow;
