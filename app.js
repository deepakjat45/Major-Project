const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const ejs = require("ejs");


let MONGO_URL = "mongodb://127.0.0.1:27017/Airbnb";
async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });





app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(8080, (req, res) => {
  console.log("port is listling on port 8080");
});
