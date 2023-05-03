const sequelize = require("../config/db");
const UserData = require("../models/userData.model");
const jwt = require("jsonwebtoken");

module.exports.getBills = async (req, res) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res
      .status(401)
      .json({ message: "No token, the user is disconnected" });
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json(console.log(err));
      }
      UserData.findAll({ where: { userId: decoded.id } }).then((bills) => {
        res.status(200).json(bills);
      });
    });
  } catch (err) {
    console.log("Error: " + err);
  }
};

module.exports.addBills = async (req, res) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res
      .status(401)
      .json({ message: "No token, the user is disconnected" });
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json(console.log(err));
      }
      UserData.create({
        userId: decoded.id,
        typeOfBill: req.body.name,
        costofBill: req.body.cost,
      }).then((bill) => {
        res.status(200).json(bill);
      });
    });
  } catch (err) {
    console.log("Error: " + err);
  }
};

module.exports.deleteBills = async (req, res) => {
  const id = req.params.id;

  try {
    UserData.destroy({ where: { id } }).then((result) => {
      res.status(200).json({ result });
    });
  } catch (err) {
    console.log("Erreur lors de la suppression de la facture : " + err);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de la facture" });
  }
};

module.exports.updateBills = async (req, res) => {
  const name = req.body.name;
  const price = req.body.price;
  const id = req.body.id;

  try {
    if (price) {
      UserData.update({ costofBill: price }, { where: { id } });
    }
    if (name) {
      UserData.update({ typeOfBill: name }, { where: { id } });
    }
    res.status(200).json({ message: "Facture modifiée" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la modification de la facture" });
  }
};

module.exports.transferBillsToHistory = async (req, res) => {
  try {
    // Copier les données de `bills` vers `history_bills`
    await sequelize.query("INSERT INTO historybills SELECT * FROM userdata");

    // Supprimer les données de la table `bills`
    await UserData.destroy({ where: {} });

    // Vérifier si les paramètres `req` et `res` sont définis
    if (req && res) {
      return res
        .status(200)
        .json({ message: "Factures transférées et table bills réinitialisée" });
    }

    console.log("Factures transférées et table bills réinitialisée");
  } catch (error) {
    console.log("Erreur lors du transfert des factures : " + error);
    if (req && res) {
      res
        .status(401)
        .json({ message: "Erreur lors du transfert des factures" });
    }
  }
};

// Fonction pour restaurer les factures de la table `history_bills` vers `bills`
module.exports.restoreBills = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Copier les données de `history_bills` vers `bills`
    await sequelize.query(
      "INSERT INTO userdata SELECT * FROM historybills WHERE user_id = :userId",
      {
        replacements: { userId: userId },
      }
    );

    res.status(200).json({ message: "Factures restaurées" });
  } catch (error) {
    console.log("Erreur lors de la restauration des factures : " + error);
    res
      .status(500)
      .json({ message: "Erreur lors de la restauration des factures" });
  }
};
