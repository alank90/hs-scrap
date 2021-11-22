const SteinStore = require("stein-js-client");
const store = new SteinStore(
  "https://api.steinhq.com/v1/storages/618e81028d29ba2379044caa"
);

const appendRow = function (row) {
  store.append("HS - Classrooms", row).then((res) => {
    console.log(res);
  });
};

export default appendRow;
