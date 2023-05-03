const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.getUser = async (req, res) => {
  const user = await User.findAll();
  res.status(200).json(user);
};

module.exports.setSalary = async (req, res) => {
  const token = req.cookies.jwt;
  const { salary } = req.body;
  try {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json(err);
      }
      await User.update({ salary }, { where: { id: decoded.id } });
      res.status(200).json({ message: "Salary updated successfully" });
    });
  } catch (err) {
    res.status(401).json(err);
  }
};

module.exports.setUsername = async (req, res) => {
  const token = req.cookies.jwt;
  const { username } = req.body;
  try {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json(err);
      }
      await User.update({ username }, { where: { id: decoded.id } });
      res.status(200).json({ message: "Username updated successfully" });
    });
  } catch (err) {
    res.status(401).json(err);
  }
};

module.exports.setEmail = async (req, res) => {
  const token = req.cookies.jwt;
  const { email } = req.body;
  try {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json(err);
      }
      await User.update({ email }, { where: { id: decoded.id } });
      res.status(200).json({ message: "Email updated successfully" });
    });
  } catch (err) {
    res.status(401).json(err);
  }
};

module.exports.setPassword = async (req, res) => {
  const token = req.cookies.jwt;
  const { password } = req.body;
  const hash = bcrypt.hashSync(password, 12);

  try {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json(err);
      }

      await User.update({ password: hash }, { where: { id: decoded.id } });
      res.status(200).json({ message: "Password updated successfully" });
    });
  } catch (err) {
    res.status(401).json(err);
  }
};
