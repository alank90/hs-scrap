const createID = (form) => {
  // First check if you have a serial number or bar code
  if (form.Barcode || form.SerialNum) {
    const ID = form.Barcode + form.SerialNum;
    return ID;
  } else {
    // create the current date/time in epoch format
    // for making a unique ID for item
    const ID = new Date().getTime();
    return ID;
  }
};

export default createID;
