const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const URI = require("./key").mongoURI;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, X-Requested-With, Origin"
  );
  next();
});

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

app.post("/addUser", require("./Routes/User"));
app.post("/validateUser", require("./Routes/User"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("Server Running on ", PORT));
