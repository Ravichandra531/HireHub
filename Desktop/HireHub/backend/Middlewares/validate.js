const validateUser = (req, res, next) => {
  const { name, email, password, role } = req.body;
  if (!name || name.trim().length === 0) {
    return res.status(400).json({ error: 'name is required' });
  }

  const emailcheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailcheck.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  if (!role) {
    return res.status(400).json({ error: "Role is required (EMPLOYER / JOBSEEKER)" });
  }

  const allowedRoles = ["EMPLOYER", "JOBSEEKER"];
  if (!allowedRoles.includes(role.toUpperCase())) {
    return res.status(400).json({ error: "Role must be EMPLOYER or JOBSEEKER" });
  }
  next();
};


const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const emailcheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailcheck.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }
  next();
};

module.exports = { validateUser, validateLogin };
