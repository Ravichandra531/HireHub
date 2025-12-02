const prisma = require("../prisma/client");


const applyJob = async (req, res) => {
  if (req.user.role !== "JOBSEEKER") {
    return res.status(403).json({ error: "Only Job Seekers can apply" });
  }
  const { jobId } = req.body;
  try {
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    if (job.employerId === req.user.id) {
      return res.status(400).json({ error: "You cannot apply to your own job" });
    }
    const exists = await prisma.application.findFirst({
      where: {
        jobId,
        userId: req.user.id
      },
    });

    if (exists) {
      return res.status(400).json({ error: "Already applied to this job" });
    }

    const application = await prisma.application.create({
      data: {
        jobId,
        userId: req.user.id,
      },
    });

    res.json({ message: "Applied Successfully", application });

  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

const getMyApplications = async (req, res) => {
  try {
    const applications = await prisma.application.findMany({
      where: { userId: req.user.id },
      include: {
        job: {
          include: { employer: { select: { name: true } } }
        }
      }
    });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = { applyJob, getMyApplications };