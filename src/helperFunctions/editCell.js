import SteinStore from "stein-js-client";

const editCell = async function (id, text, colName, sheetName) {
  const store = new SteinStore(
    "https://api.steinhq.com/v1/storages/6203d4088d29ba23791a71a0"
  );

  let response = "";

  console.log("The row id is: ", id);
  console.log("Column name is:", colName);
  console.log("The text is: ", text);
  console.log("sheeTname is :", sheetName);
  await store
    .edit(
      (sheetName,
      {
        search: { ID: id },
        set: { colName: text },
      })
    )
    .then((res) => {
      response = res;
    })
    .catch((e) => {
      console.error(e);
    });

  return response;
};

export default editCell;
