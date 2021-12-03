import SteinStore from "stein-js-client";

const store = new SteinStore(
  "https://api.steinhq.com/v1/storages/618e81028d29ba2379044caa"
);

const deleteRow = (e) => {
  console.log("I deleted row");

  console.log(e.target);
};

export default deleteRow;
