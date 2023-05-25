const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  const users = await User.find().sort("name");
  res.send(users);
});

router.get("/me", async (req, res) => {
  const user = await User.findById(req.user._id).select("-password"); // exclude password;
  res.send(user);
});

router.post("/", async (req, res) => {
  //register
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already exists.");

  user = await new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();

  const tokenHeader = "x-auth-token";
  res
    .header(tokenHeader, token)
    .header("access-control-expose-headers", tokenHeader)
    .send({
      username: user.username,
      email: user.email,
      id: user._id,
    });
});

module.exports = router;
