require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const monstersRouter = require("./routes/monsters");
const questRotuer = require("./routes/quests");
app.use(express.json());
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);
// app.use(function(req,res,next) {
//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   // Pass to next layer of middleware
//   next();
// })

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;

db.on("error", (error) => console.log("error to connecting to db: ", error));
db.on("open", () => console.log("connected to db"));

app.use("/api/monsters", monstersRouter);
app.use("/api/quests", questRotuer);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server runing on port ${port}`));
