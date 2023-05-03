const History = require("../models/historyBills.model");
const jwt = require("jsonwebtoken");

module.exports.getHistoryBills = async (req, res) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json();
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    } else {
      const historyBills = History.findAll({ where: { userId: decoded.id } });
      return res.status(200).json({ historyBills });
    }
  });
};
