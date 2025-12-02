const express = require("express");
const auth = require("../Middlewares/auth");
const { applyJob, getMyApplications } = require("../controllers/applicationController");

const router = express.Router();

router.post("/", auth, applyJob);
router.get("/my-applications", auth, getMyApplications);

module.exports = router;
