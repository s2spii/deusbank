const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const UserData = sequelize.define(
  "UserData",
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

module.exports = UserData;
