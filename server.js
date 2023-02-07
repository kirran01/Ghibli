require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Ghibli server up");
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then((res) => {
    console.log("//////////////// Ghibli /////////////");
    console.log("connected to --->", res.connections[0].name);
    app.listen(PORT, () => {
        console.log("Ghibli backend up on-->", +PORT);
      });
  })
  .catch((err) => {
    console.log(err, "err - server");
  });
