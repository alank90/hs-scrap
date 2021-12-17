import SteinStore from "stein-js-client";

const store = new SteinStore(
  "https://api.steinhq.com/v1/storages/618e81028d29ba2379044caa"
);
var response = "";

const deleteRow = async (row) => {
  // get the row ID stored in data-id attr
  const rowID = row.dataset.id;

  await store
    .delete("HS - Classrooms", {
      search: { ID: rowID },
    })
    .then((res) => {
      response = res;
    })
    .catch((e) => {
      console.error(e);
    });

  return response;
};

export default deleteRow;
