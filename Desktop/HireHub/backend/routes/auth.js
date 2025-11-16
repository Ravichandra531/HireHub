const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../prisma/client');
const { validateUser, validateLogin } = require('../Middlewares/validate');

const router = express.Router();
router.post('/signup', validateUser, async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        role: role.toUpperCase(),
      },
    });

    res.status(201).json({ message: "User Created Successfully" });

  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.post('/login', validateLogin, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: "Incorrect Password" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ message: "Login success", token });

  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
