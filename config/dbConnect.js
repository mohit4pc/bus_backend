const mongoose = require("mongoose");
const dbConnect = () => {
  try {
    const connection = mongoose.connect(process.env.MONGODB);
    console.log("Database Connection Successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnect;