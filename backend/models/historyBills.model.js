const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const HistoryBills = sequelize.define(
  "HistoryBills",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    typeOfBill: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    costofBill: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true }
);

module.exports = HistoryBills;
