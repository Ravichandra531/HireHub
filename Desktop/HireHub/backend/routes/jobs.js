const express = require("express");
const auth = require("../Middlewares/auth");
const authorizeRoles = require("../Middlewares/role");
const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  getMyJobs,
  toggleSaveJob,
  getSavedJobs,
  getCategories,
} = require("../controllers/jobController");

const router = express.Router();

// Public routes
router.get("/", getAllJobs);
router.get("/categories", getCategories);
router.get("/:id", getJobById);

// Protected routes - Job Seeker
router.get("/saved/my-saved", auth, authorizeRoles("JOBSEEKER"), getSavedJobs);
router.post("/:id/save", auth, authorizeRoles("JOBSEEKER"), toggleSaveJob);

// Protected routes - Employer
router.post("/", auth, authorizeRoles("EMPLOYER"), createJob);
router.get("/my-jobs/list", auth, authorizeRoles("EMPLOYER"), getMyJobs);
router.put("/:id", auth, authorizeRoles("EMPLOYER"), updateJob);
router.delete("/:id", auth, authorizeRoles("EMPLOYER"), deleteJob);

module.exports = router;
