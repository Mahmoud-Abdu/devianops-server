const mongoose = require("mongoose");
const Joi = require("joi");

const questSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  numberOfEnemies: {
    type: Number,
    required: true,
  },
  enemyNames: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: "Monster",
  },
});

function checkValidation(quest) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    latitude: Joi.number().min(0).required(),
    longitude: Joi.number().min(0).required(),
    numberOfEnemies: Joi.number().min(0).required(),
    enemyNames: Joi.array().items(Joi.string()).required(),
   };
  return Joi.validate(quest, schema);
}

exports.Quest = mongoose.model("Quest", questSchema);
exports.validate = checkValidation;
