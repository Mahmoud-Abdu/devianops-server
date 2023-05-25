require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const monstersRouter = require("./routes/monsters");
const questRotuer = require("./routes/quests");
const userRouter = require("./routes/users");
const loginRouter = require("./routes/login");

app.use(express.json());
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;

db.on("error", (error) => console.log("error to connecting to db: ", error));
db.on("open", () => console.log("connected to db"));

app.use("/api/monsters", monstersRouter);
app.use("/api/quests", questRotuer);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server runing on port ${port}`));
