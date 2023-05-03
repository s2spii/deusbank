const express = require("express");
const { getHistoryBills } = require("../controllers/historyBills.controller");

const router = express.Router();

router.get("/get", getHistoryBills);

module.exports = router;
