const prisma = require("../prisma/client");


const applyForJob = async (req, res) => {
  const { jobId, coverLetter } = req.body;

  try {
    const job = await prisma.job.findUnique({
      where: { id: parseInt(jobId) },
    });

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    if (!job.isActive) {
      return res.status(400).json({ error: "This job is no longer active" });
    }

    const existing = await prisma.application.findUnique({
      where: {
        jobId_userId: {
          jobId: parseInt(jobId),
          userId: req.user.id,
        },
      },
    });

    if (existing) {
      return res.status(400).json({ error: "You have already applied for this job" });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { resume: true }
    });

    const applicationData = {
      jobId: parseInt(jobId),
      userId: req.user.id,
      coverLetter: coverLetter || null,
      resume: req.file ? `/uploads/${req.file.filename}` : user.resume,
    };

    const application = await prisma.application.create({
      data: applicationData,
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });

  } catch (err) {
    console.error("Error applying for job:", err);
    res.status(500).json({ error: "Failed to submit application" });
  }
};

const getMyApplications = async (req, res) => {
  try {
    const applications = await prisma.application.findMany({
      where: { userId: req.user.id },
      include: {
        job: {
          include: {
            employer: {
              select: { id: true, name: true, email: true },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(applications);

  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).json({ error: "Failed to fetch applications" });
  }
};

const getApplicationsForEmployer = async (req, res) => {
  try {
    const applications = await prisma.application.findMany({
      where: {
        job: {
          employerId: req.user.id,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            location: true,
            bio: true
          },
        },
        job: {
          select: { id: true, title: true },
        },
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(applications);

  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).json({ error: "Failed to fetch applications" });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['PENDING', 'REVIEWED', 'SHORTLISTED', 'REJECTED', 'ACCEPTED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const application = await prisma.application.findUnique({
      where: { id: parseInt(id) },
      include: { job: true }
    });

    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    if (application.job.employerId !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" });
    }

    const updated = await prisma.application.update({
      where: { id: parseInt(id) },
      data: { status }
    });

    res.json({ message: "Application status updated", application: updated });

  } catch (err) {
    console.error("Error updating application status:", err);
    res.status(500).json({ error: "Failed to update application status" });
  }
};

const getApplicationsByJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await prisma.job.findUnique({
      where: { id: parseInt(jobId) }
    });

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    if (job.employerId !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" });
    }

    const applications = await prisma.application.findMany({
      where: { jobId: parseInt(jobId) },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            location: true,
            bio: true
          },
        },
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(applications);

  } catch (err) {
    console.error("Error fetching job applications:", err);
    res.status(500).json({ error: "Failed to fetch applications" });
  }
};

module.exports = {
  applyForJob,
  getMyApplications,
  getApplicationsForEmployer,
  updateApplicationStatus,
  getApplicationsByJob,
};