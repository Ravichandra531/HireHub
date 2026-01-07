const prisma = require("../prisma/client");

const createJob = async (req, res) => {
  const { title, description, skills, location, salary, experience, category, jobType } = req.body;

  try {
    const job = await prisma.job.create({
      data: {
        title,
        description,
        skills,
        location,
        salary: salary ? parseInt(salary) : null,
        experience,
        category: category || "Other",
        jobType: jobType || "FULLTIME",
        employerId: req.user.id,
      },
    });

    res.status(201).json({ message: "Job posted successfully", job });

  } catch (err) {
    console.error("Error creating job:", err);
    res.status(500).json({ error: "Failed to create job", details: err.message });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const {
      search,
      category,
      jobType,
      location,
      minSalary,
      maxSalary,
      page = 1,
      limit = 12
    } = req.query;

    // Build where clause for filtering
    const where = {
      isActive: true,
      AND: []
    };

    // Search in title, description, and skills
    if (search) {
      where.AND.push({
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { skills: { contains: search, mode: 'insensitive' } }
        ]
      });
    }

    // Filter by category
    if (category && category !== 'All') {
      where.AND.push({ category });
    }

    // Filter by job type
    if (jobType && jobType !== 'All') {
      where.AND.push({ jobType });
    }

    // Filter by location
    if (location) {
      where.AND.push({
        location: { contains: location, mode: 'insensitive' }
      });
    }

    // Filter by salary range
    if (minSalary || maxSalary) {
      const salaryFilter = {};
      if (minSalary) salaryFilter.gte = parseInt(minSalary);
      if (maxSalary) salaryFilter.lte = parseInt(maxSalary);
      where.AND.push({ salary: salaryFilter });
    }

    // Remove empty AND array if no filters
    if (where.AND.length === 0) {
      delete where.AND;
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    // Get total count for pagination
    const total = await prisma.job.count({ where });

    // Fetch jobs with pagination
    const jobs = await prisma.job.findMany({
      where,
      include: {
        employer: {
          select: { id: true, name: true, email: true },
        },
        _count: {
          select: { applications: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take,
    });

    res.json({
      jobs,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });

  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await prisma.job.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        employer: {
          select: { id: true, name: true, email: true, location: true }
        },
        _count: {
          select: { applications: true }
        }
      },
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

    const { salary, ...otherData } = req.body;
    const updated = await prisma.job.update({
      where: { id: job.id },
      data: {
        ...otherData,
        salary: salary ? parseInt(salary) : null,
      },
    });

    res.json({ message: "Job updated", updated });

  } catch (err) {
    console.error("Error updating job:", err);
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
      include: {
        _count: {
          select: { applications: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch your jobs" });
  }
};

// Save/Unsave job
const toggleSaveJob = async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);
    const userId = req.user.id;

    // Check if job exists
    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) return res.status(404).json({ error: "Job not found" });

    // Check if already saved
    const existing = await prisma.savedJob.findUnique({
      where: {
        userId_jobId: { userId, jobId }
      }
    });

    if (existing) {
      // Unsave
      await prisma.savedJob.delete({
        where: { id: existing.id }
      });
      res.json({ message: "Job removed from saved", saved: false });
    } else {
      // Save
      await prisma.savedJob.create({
        data: { userId, jobId }
      });
      res.json({ message: "Job saved successfully", saved: true });
    }

  } catch (err) {
    console.error("Error toggling save job:", err);
    res.status(500).json({ error: "Failed to save/unsave job" });
  }
};

// Get saved jobs
const getSavedJobs = async (req, res) => {
  try {
    const savedJobs = await prisma.savedJob.findMany({
      where: { userId: req.user.id },
      include: {
        job: {
          include: {
            employer: {
              select: { id: true, name: true, email: true }
            },
            _count: {
              select: { applications: true }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(savedJobs.map(s => s.job));
  } catch (err) {
    console.error("Error fetching saved jobs:", err);
    res.status(500).json({ error: "Failed to fetch saved jobs" });
  }
};

// Get job categories (for filter dropdown)
const getCategories = async (req, res) => {
  try {
    const categories = await prisma.job.findMany({
      where: { isActive: true },
      select: { category: true },
      distinct: ['category']
    });

    res.json(categories.map(c => c.category));
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  getMyJobs,
  toggleSaveJob,
  getSavedJobs,
  getCategories,
};
