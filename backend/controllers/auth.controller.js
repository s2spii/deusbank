const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.signUp = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.signIn = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: req.body.email }, { username: req.body.email }],
      },
    });
    if (!user) {
      return res.status(404).json({ isLogged: false });
    }

    const isMatch = bcrypt.compareSync(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ isLogged: false });
    }
    const token = createToken(user.id);

    res.cookie("jwt", token, { httpOnly: true, maxAge });
    res.status(200).json({ isLogged: true, user, token });
  } catch (error) {
    res.status(500).json({ isLogged: false });
  }
};

module.exports.logout = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "Logged out" });
};

module.exports.isLoggedIn = (req, res) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ logged: false });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ logged: false });
    }
    User.findOne({ where: { id: decoded.id } }).then((user) => {
      if (!user) {
        return res.status(401).json({ logged: false });
      }
      res.status(200).json({ user, logged: true });
    });
  });
};
