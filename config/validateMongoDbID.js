const mongoose = require("mongoose");

const validateMongodbId = (id) => {
  const isvalid = mongoose.Types.ObjectId.isValid(id);
  if (!isvalid) throw new Error("This Id os not valid or not found.");
};

module.exports = validateMongodbId;
