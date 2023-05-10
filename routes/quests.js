const express = require("express");
const router = express.Router();
const { Quest, validate } = require("../models/quest");
const isIn = require("../middleware/test");
router.get("/", async (req, res) => {
  const quests = await Quest.find().populate("enemyNames", "-_id").exec();
  console.log("ses", quests);
  res.send(quests);
});

router.get("/:id", async (req, res) => {
  const quest = await Quest.findOne({_id:req.params.id}).select("-_id -__v");
   if (!quest) return res.status(404).send("quest not found!");
  res.send(quest);
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0]);
  try {
    const quest = new Quest({
      name: req.body.name,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      numberOfEnemies: req.body.numberOfEnemies,
      enemyNames: req.body.enemyNames,
    });
    await quest.save();
    res.status(200).send(quest);
  } catch (err) {
    res.send("something happend", err);
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0]);

  try {
    const quest = await Quest.findById(req.params.id);
    if (!quest) return res.status(404).send("quest not found");
    quest.name = req.body.name;
    quest.latitude = req.body.latitude;
    quest.longitude = req.body.longitude;
    quest.numberOfEnemies = req.body.numberOfEnemies;
    quest.enemyNames = req.body.enemyNames;
    await quest.save();
    res.send(quest);
  } catch (err) {
    console.log("error happend", err);
    res.send(
      "theres something wrong completing your request please try again later."
    );
  }
});

router.delete("/:id", async (req, res) => {
  const quest = await Quest.findByIdAndDelete(req.params.id);
  res.send(quest);
});

module.exports = router;
