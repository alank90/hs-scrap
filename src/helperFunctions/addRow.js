import SteinStore from "stein-js-client";

const store = new SteinStore(
  "https://api.steinhq.com/v1/storages/618e81028d29ba2379044caa"
);
var response = "";

const addRow = async function (row) {
  console.log(row[0]["Equipment"]);
  await store
    .append("HS - Classrooms", row)
    .then((res) => {
      response = res;
    })
    .catch((e) => {
      console.error(e);
    });

  return response;
};

export default addRow;
