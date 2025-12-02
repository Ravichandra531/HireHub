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
} = require("../controllers/jobController");

const router = express.Router();

router.get("/", getAllJobs);
router.post("/", auth, authorizeRoles("EMPLOYER"), createJob);
router.get("/my-jobs", auth, authorizeRoles("EMPLOYER"), getMyJobs);
router.get("/:id", getJobById);
router.put("/:id", auth, authorizeRoles("EMPLOYER"), updateJob);
router.delete("/:id", auth, authorizeRoles("EMPLOYER"), deleteJob);

module.exports = router;
