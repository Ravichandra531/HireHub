const prisma = require("../prisma/client");

const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    res.json(user);

  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

const updateProfile = async (req, res) => {
  const { name } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: { name },
    });

    res.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports={getProfile,updateProfile}