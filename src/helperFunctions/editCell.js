/**
 * This module handles the call to Stein when a cell is focused out.
 * This module contains a Vue composable function and is used in several views.
 * @param {string} currentCellValue - The current cell value
 * @param {string} id - The row's id field.
 * @param {string} updatedCellValue - The cell's new value.
 * @param {string} colName - The column name of the cell being edited
 * @param {string} sheetName - The sheet name of the edited cell.
 * @param {string} cellContainingRowID - The DOM element of the last cell in the row. This
 * contains the row ID number
 *
 * @return {Object} The message from Stein on operation status.
 */

import SteinStore from "stein-js-client";

export async function useEditCell(
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
  return { response };
}
