const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("email .");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid password.");

  const token = user.generateAuthToken();
  res.send(token);
});

async function validate(body) {
  const schema = {
    email: Joi.string().min(10).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(body, schema);
}

module.exports = router;
