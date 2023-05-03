const express = require("express");
const {
  getBills,
  addBills,
  deleteBills,
  transferBillsToHistory,
  restoreBills,
  updateBills,
} = require("../controllers/userData.controller");

const router = express.Router();

router.get("/get", getBills);
router.post("/add", addBills);
router.delete("/delete/:id", deleteBills);
router.put("/edit", updateBills);
router.post("/transferBillsToHistory", transferBillsToHistory);
router.post("/restoreBills/:userId", restoreBills);

module.exports = router;
