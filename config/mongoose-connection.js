const mongoose = require("mongoose");

const config = require("config");

mongoose
  .connect(`${config.get("MONGODB_URI")}/js-bin-clone`)
  .then(function () {
   console.log("connected")
  })
  .catch(function (err) {
    dbgr(err);
  });

module.exports = mongoose.connection;
