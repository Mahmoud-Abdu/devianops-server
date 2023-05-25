const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const secretKey = process.env.jwt_secretKey;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
    },
    secretKey
  );

  return token;
};

function validateUser(user) {
  const schema = {
    username: Joi.string().min(4).max(255).required(),
    email: Joi.string().min(10).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(user, schema);
}

exports.User = mongoose.model("User", userSchema);
exports.validate = validateUser;
