const express = require("express");
const app = express();

app.get("/user", (req, res, next) => {
  console.log("We are in USER route");
  res.send("Request processed Successfully");
});
app.post("/create-user", (req, res, next) => {
  console.log(req.body);
  console.log("We are in CREATE USER route");
  res.send("Request processed Successfully");
});
module.exports = app;
