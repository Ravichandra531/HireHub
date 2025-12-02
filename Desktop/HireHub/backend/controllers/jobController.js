const prisma = require("../prisma/client");

const createJob = async (req, res) => {
  const { title, description, skills, location, salary, experience } = req.body;

  try {
    const job = await prisma.job.create({
      data: {
        title,
        description,
        skills,
        location,
        salary,
        experience,
        employerId: req.user.id, // USER ID from token
      },
    });

    res.status(201).json({ message: "Job posted successfully", job });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create job" });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      include: {
        employer: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    res.json(jobs);

  } catch (err) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await prisma.job.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { employer: true },
    });

    if (!job) return res.status(404).json({ error: "Job not found" });

    res.json(job);

  } catch (err) {
    res.status(500).json({ error: "Error fetching job" });
  }
};

const updateJob = async (req, res) => {
  try {
    const job = await prisma.job.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!job) return res.status(404).json({ error: "Job not found" });

    if (job.employerId !== req.user.id)
      return res.status(403).json({ error: "Not allowed" });

    const updated = await prisma.job.update({
      where: { id: job.id },
      data: req.body,
    });

    res.json({ message: "Job updated", updated });

  } catch (err) {
    res.status(500).json({ error: "Error updating job" });
  }
};

const deleteJob = async (req, res) => {
  try {
    const job = await prisma.job.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!job) return res.status(404).json({ error: "Job not found" });

    if (job.employerId !== req.user.id)
      return res.status(403).json({ error: "Not allowed" });

    await prisma.job.delete({ where: { id: job.id } });

    res.json({ message: "Job deleted" });

  } catch (err) {
    res.status(500).json({ error: "Error deleting job" });
  }
};

const getMyJobs = async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      where: { employerId: req.user.id },
    });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch your jobs" });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  getMyJobs,
};
