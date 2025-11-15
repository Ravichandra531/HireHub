const express = require('express')
const router = express.Router()
const prisma = require('../prisma/client')
const auth = require('../Middlewares/auth')

router.post('/create',auth,async(req,res)=>{
    if (req.user.role !== "EMPLOYER") {
    return res.status(403).json({ error: "Access denied" });
  }
  const { title, description, skills, location, salary, experience } = req.body
  try {
    const job = await prisma.job.create({
      data: {
        title,
        description,
        skills,
        location,
        salary,
        experience,
        employerId: req.user.id
      },
    })
    res.json({ message: "Job Created", job })
    }catch(err){
        res.status(500).json({ error: "Server Error" })
    }
})

router.get("/all", async (req, res) => {
  const jobs = await prisma.job.findMany({ include: { employer: true } });
  res.json(jobs);
});

module.exports=router