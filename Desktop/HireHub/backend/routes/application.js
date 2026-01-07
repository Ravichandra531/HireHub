const express = require("express");
const auth = require("../Middlewares/auth");
const authorizeRoles = require("../Middlewares/role");
const upload = require("../Middlewares/upload");
const {
    applyForJob,
    getMyApplications,
    getApplicationsForEmployer,
    updateApplicationStatus,
    getApplicationsByJob
} = require("../controllers/applicationController");

const router = express.Router();

// Job Seeker routes
router.post("/", auth, authorizeRoles("JOBSEEKER"), upload.single('resume'), applyForJob);
router.get("/my-applications", auth, authorizeRoles("JOBSEEKER"), getMyApplications);

// Employer routes
router.get("/employer/all", auth, authorizeRoles("EMPLOYER"), getApplicationsForEmployer);
router.get("/job/:jobId", auth, authorizeRoles("EMPLOYER"), getApplicationsByJob);
router.put("/:id/status", auth, authorizeRoles("EMPLOYER"), updateApplicationStatus);

module.exports = router;
