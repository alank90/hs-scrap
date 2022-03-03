// ================================================================ //
// ===== Called when trash can clicked on the page ================ //
// ================================================================ //
import { useDeleteRow } from "./deleteRow";

export async function useRemoveRow(
  e,
  sheetName,
  eqpmntArray,
  rowCount,
  message
) {
  let result = confirm("Are you sure?");
  if (result) {
    if (sheetName === "HS - Classrooms") {
      const eqptmntType = e.target.dataset.eqpmntType;

      const { response } = await useDeleteRow(
        sheetName,
        e.target,
        eqpmntArray[eqptmntType]
      );
      rowCount.value = response.clearedRowsCount;
    } else if (sheetName === "HS - Chromebooks") {
      const { response } = await useDeleteRow(sheetName, e.target, eqpmntArray);
      rowCount.value = response.clearedRowsCount;
    } else {
      message.value = true;
    }
  }
}
// ================================================================ //
// ====================== End removeRow =========================== //
// ================================================================ //
