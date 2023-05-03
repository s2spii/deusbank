const { CronJob } = require("cron");
const timeZone = "Europe/Paris";
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const sequelize = require("./config/db");
const { transferBillsToHistory } = require("./controllers/userData.controller");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.ORIGIN_CORS,
    credentials: true,
  })
);

//Routes
app.use("/api/user", require("./routes/user.routes"));
app.use("/api/bills", require("./routes/userData.routes"));
app.use("/api/history", require("./routes/history.routes"));

sequelize
  .sync()
  .then(() => {
    app.listen(5000, () => console.log("Serveur démarré au port 5000"));
  })
  .catch((err) => {
    console.error("Error : ", err);
  });

const transferJob = new CronJob(
  "10 00 * * *",
  () => {
    transferBillsToHistory();
  },
  null,
  true,
  timeZone
);
transferJob.start();
