const express = require("express");
const { validateUser, validateLogin } = require("../Middlewares/validate");
const { signup, login } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", validateUser, signup);
router.post("/login", validateLogin, login);

module.exports = router;
