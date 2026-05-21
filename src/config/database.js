const mongoose = require("mongoose");

const connectDB = async () => {
  let url =
    "mongodb+srv://sandeepgella016_db_user:NsNp3MD9HsaO2VAr@cluster0.szmesw5.mongodb.net/devTinder";
  await mongoose.connect(url);
};

module.exports = connectDB;
