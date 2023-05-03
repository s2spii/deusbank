const express = require("express");
const {
  getUser,
  setSalary,
  setUsername,
  setEmail,
  setPassword,
} = require("../controllers/user.controller");
const {
  signUp,
  signIn,
  logout,
  isLoggedIn,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", signUp);
router.post("/login", signIn);
router.get("/logout", logout);
router.get("/islogged", isLoggedIn);

router.get("/get", getUser);
router.put("/salary", setSalary);
router.put("/username", setUsername);
router.put("/email", setEmail);
router.put("/password", setPassword);

module.exports = router;
