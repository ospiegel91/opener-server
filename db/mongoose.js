const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose
  .connect("mongodb+srv://admin:ma-kore@development-2wjff.gcp.mongodb.net/test?retryWrites=true&w=majority")
  .then(() => console.log("db connected!"))
  .catch(err => console.log(err));

  module.exports = mongoose;
