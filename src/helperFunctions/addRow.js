import SteinStore from "stein-js-client";

const store = new SteinStore(
  "https://api.steinhq.com/v1/storages/618e81028d29ba2379044caa"
);

const addRow = function (row) {
  console.log(row);
  store
    .append("HS - Classrooms", row)
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.error(e);
    });
};

export default addRow;
