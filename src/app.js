const express = require("express");
const app = express();

app.use("/", (req, res) => {
  res.send("This message from Home page");
});
app.use("/test", (req, res) => {
  res.send("This message is from test route");
});

app.use("/hello", (req, res) => {
  res.send("This message is from Hello route");
});

app.listen(7777, () => {
  console.log("server started successfully!");
});
