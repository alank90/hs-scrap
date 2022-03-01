import SteinStore from "stein-js-client";

const editCell = async function (
  currentCellValue,
  id,
  updatedCellValue,
  colName,
  sheetName,
  cellContainingRowID
) {
  // =============== Module vars =========================== //
  const store = new SteinStore(
    "https://api.steinhq.com/v1/storages/6203d4088d29ba23791a71a0"
  );

  const currentID = cellContainingRowID.dataset.id;
  // Construct new ID
  const newID = currentID.replace(currentCellValue, updatedCellValue);
  // Set parameters to update cell contents and the Row ID
  const cellParams = {
    search: { ID: id },
    set: { [colName]: updatedCellValue, ID: newID },
  };

  let response = null;

  await store
    .edit(sheetName, cellParams)
    .then((res) => {
      response = res;
    })
    .catch((e) => {
      console.error(e);
    });

  // Finally we want to update the DOM with the new row ID if necessary
  if (colName === "Barcode" || colName === "SerialNum") {
    cellContainingRowID.dataset.id = newID;
  }
  return response;
};

export default editCell;
