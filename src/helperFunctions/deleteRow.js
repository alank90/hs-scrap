import SteinStore from "stein-js-client";

const store = new SteinStore(
  "https://api.steinhq.com/v1/storages/618e81028d29ba2379044caa"
);
var response = "";

const deleteRow = async (e) => {
  // get the row ID stored in data-id attr
  const rowID = e.target.dataset.id;

  await store
    .delete("HS _ Classrooms", {
      search: { ID: rowID },
    })
    .then((res) => {
      response = res;
    })
    .catch((e) => {
      console.error(e);
    });

  console.log("I deleted row");
  console.log(rowID);
  console.log(e.target);
  return response;
};

export default deleteRow;
