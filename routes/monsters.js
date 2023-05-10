const express = require("express");
const router = express.Router();
const { Monster, validate } = require("../models/monster");

router.get("/", async (req, res) => {
  try {
    const monsters = await Monster.find();
    res.send(monsters);
  } catch (err) {
    console.log("error finding monsters ", err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const monster = await Monster.findOne({_id:req.params.id}).select("-_id -__v");
    if (!monster) return res.status(404).send("monster not found");
    res.send(monster);
  } catch (err) {
    res.send(
      "theres something wrong completing your request please try again later."
    );
    console.log("error happend", err);
  }
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0]);
  const monster = new Monster({
    name: req.body.name,
    level: req.body.level,
  });

  try {
    await monster.save();
    res.status(200).send(monster);
  } catch (err) {
    res.send("something went wrong!!", err);
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0]);

  try {
    const monster = await Monster.findById(req.params.id);
    if (!monster) return res.status(404).send("monster not found");
    monster.name = req.body.name;
    monster.level = req.body.level;
    await monster.save();
    res.send(monster);
  } catch (err) {
    console.log("error happend", err);
    res.send(
      "theres something wrong completing your request please try again later."
    );
  }
});

router.delete("/:id", async (req, res) => {
  const monster = await Monster.findByIdAndDelete(req.params.id);
  res.send(monster);
});

module.exports = router;
