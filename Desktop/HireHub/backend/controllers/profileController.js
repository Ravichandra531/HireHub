const prisma = require("../prisma/client");
const fs = require('fs');
const path = require('path');

const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true,
        location: true,
        resume: true,
        bio: true,
        createdAt: true,
      },
    });

    res.json(user);

  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

const updateProfile = async (req, res) => {
  const { name, phone, location, bio } = req.body;

  try {
    const updateData = {};
    if (name) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;
    if (location !== undefined) updateData.location = location;
    if (bio !== undefined) updateData.bio = bio;

    // Handle resume file upload
    if (req.file) {
      // Delete old resume if exists
      const oldUser = await prisma.user.findUnique({
        where: { id: req.user.id },
        select: { resume: true }
      });

      if (oldUser.resume) {
        const oldPath = path.join(__dirname, '../uploads', path.basename(oldUser.resume));
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      updateData.resume = `/uploads/${req.file.filename}`;
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true,
        location: true,
        resume: true,
        bio: true,
      }
    });

    res.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

const deleteResume = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { resume: true }
    });

    if (user.resume) {
      // Delete file from filesystem
      const filePath = path.join(__dirname, '../uploads', path.basename(user.resume));
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      // Update database
      await prisma.user.update({
        where: { id: req.user.id },
        data: { resume: null }
      });

      res.json({ message: "Resume deleted successfully" });
    } else {
      res.status(404).json({ error: "No resume found" });
    }

  } catch (err) {
    console.error("Error deleting resume:", err);
    res.status(500).json({ error: "Failed to delete resume" });
  }
};

module.exports = { getProfile, updateProfile, deleteResume };