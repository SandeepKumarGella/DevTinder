const express = require("express");
const app = express();

app.get(/^\/ab+c$/, (req, res) => {
  res.send("Hello abc......");
});

// app.get(/a/, (req, res) => {
//   res.send("Hello I'm from a test route");
// });

app.get(/.*fly$/, (req, res) => {
  res.send("Hello I'm from fly test route");
});

app.get("/user/:id/:age", (req, res) => {
  res.send(req.params);
});

app.get("/:id/search", (req, res) => {
  const params = req.params;
  const query = req.query;
  res.send({ params, query });
});

//http://localhost:7777/search?name=sandeep&role=dev
app.get("/search", (req, res) => {
  const query = req.query;
  res.send(query);
});
``;
app.use("/test/2", (req, res) => {
  res.send("This message from Test2 page");
});

app.use("/test", (req, res) => {
  res.send("This message is from test route");
});

app.use("/hello", (req, res) => {
  res.send("This message is from Hello route");
});

app.get("/user", (req, res) => {
  res.send({ name: "Sandeep", surname: "Gella", role: "Developer" });
});

app.post("/user", (req, res) => {
  res.send({ name: "Sandy", surname: "G", role: "Tester" });
});

app.use("/", (req, res) => {
  res.send("This message from Home page");
});

app.listen(7777, () => {
  console.log("server started successfully!");
});
