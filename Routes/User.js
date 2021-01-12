const express = require("express");
const userSchema = require("../Models/Users");
const route = express.Router();

route.post("/addUser", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;
    const addUser = userSchema({
      firstName,
      lastName,
      emailId,
      password,
    });
    addUser.save();
    res.json({ message: "Successfully Added User" });
  } catch (err) {
    res.json({ message: err });
  }
});

route.post("/validateUser", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const data = await userSchema.findOne({
      emailId,
    });
    if (data.password === password) {
      res.json({ message: "Validation Success" });
    } else {
      res.json({ message: "Wrong Password" });
    }
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = route;
