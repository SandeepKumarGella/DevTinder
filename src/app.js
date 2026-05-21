const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Sandeep",
    lastName: "Gella",
    emailId: "Sandeep@gmail.com",
    password: "Sandeep@6",
    age: 25,
    gender: "male",
  };
  //creating user model instance for database
  const user = new User(userObj);
  await user.save();
  res.status(200).send("User Saved Successfully!!");
});
connectDB()
  .then(() => {
    console.log("Database connected Successfully!");
    app.listen(7777, () => {
      console.log("server upon running");
    });
  })
  .catch((err) => console.log("database not connected", err));
