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
// Protected routes - Job Seeker
router.get("/saved/my-saved", auth, authorizeRoles("JOBSEEKER"), getSavedJobs);
router.post("/:id/save", auth, authorizeRoles("JOBSEEKER"), toggleSaveJob);

// Protected routes - Employer
router.post("/", auth, authorizeRoles("EMPLOYER"), createJob);
router.get("/my-jobs", auth, authorizeRoles("EMPLOYER"), getMyJobs);
router.put("/:id", auth, authorizeRoles("EMPLOYER"), updateJob);
router.delete("/:id", auth, authorizeRoles("EMPLOYER"), deleteJob);

// Public routes (generic /:id must be last to avoid conflicts)
router.get("/", getAllJobs);
router.get("/categories", getCategories);
router.get("/:id", getJobById);

module.exports = router;
