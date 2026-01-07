const express = require("express");
const auth = require("../Middlewares/auth");
const upload = require("../Middlewares/upload");
const { getProfile, updateProfile, deleteResume } = require("../controllers/profileController");

const router = express.Router();

router.get("/", auth, getProfile);
router.put("/", auth, upload.single('resume'), updateProfile);
router.delete("/resume", auth, deleteResume);

module.exports = router;
