const express = require("express");
const { connection } = require("./config/mongodbConnection");
const router = require("./routes");
const cors = require("cors");
const app = express();
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

connection().then(async (_) => {
  console.log("connect to mongodb");
  app.listen(port, () => {
    console.log("this app running in port", port);
  });
});
