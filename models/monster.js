const mongoose = require("mongoose");
const Joi = require("joi");

const monsterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
});

function checkValidation(monster) {
  const schema = {
    name: Joi.string().min(4).max(50).required(),
    level: Joi.number().min(0).max(99).required(),
    _id: Joi.string(),
  };
  return Joi.validate(monster, schema);
}

exports.Monster = mongoose.model("Monster", monsterSchema);
exports.validate = checkValidation;
