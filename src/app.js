const { adminAuth, userAuth } = require("./middlewares/auth");
const express = require("express");

const app = express();

app.get("/admin/getAdminData", adminAuth, (req, res) => {
  //throw new error();
  res.send("Received all Admin details successfully!");
});

app.get("/user/getUserData", userAuth, (req, res) => {
  res.send("Received all user details successfully!");
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.send("Something went wrong please contact admin team!");
  }
});
app.listen(7777, () => {
  console.log("server running successfully!");
});
