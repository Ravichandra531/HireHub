# HireHub

HireHub is a full-stack job portal that connects job seekers with employers. Seekers can browse listings, apply with resumes and cover letters, save jobs, and manage their profiles. Employers can post and manage job listings, review applications, and update applicant statuses — all through a clean, responsive interface.

---

## Features

**For Job Seekers**
- Browse and search job listings with filters (type, category, location)
- Apply to jobs with resume upload and cover letter
- Save jobs for later
- Track application statuses (Pending → Reviewed → Shortlisted → Accepted/Rejected)
- Manage profile: bio, phone, location, and resume

**For Employers**
- Post new job listings with title, description, skills, salary, experience, and job type
- Edit and deactivate listings
- View and manage all applications per job
- Update application statuses
- Employer dashboard with overview stats

**General**
- JWT-based authentication
- Role-based access control (JOBSEEKER / EMPLOYER)
- Protected routes on both frontend and backend
- File uploads for resumes (served statically)
- Fully responsive UI

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router v6, Tailwind CSS, Vite |
| Backend | Node.js, Express 5 |
| Database | PostgreSQL (via [Neon](https://neon.tech)) |
| ORM | Prisma 4 |
| Auth | JWT + bcryptjs |
| File Uploads | Multer |
| Validation | express-validator |
| Deployment | Vercel (frontend), Railway (backend) |

---

## Project Structure

```
HireHub/
├── backend/
│   ├── controllers/        # Route handler logic
│   │   ├── authController.js
│   │   ├── jobController.js
│   │   ├── applicationController.js
│   │   └── profileController.js
│   ├── Middlewares/        # Auth, role, upload, validation
│   ├── routes/             # Express route definitions
│   ├── prisma/
│   │   ├── schema.prisma   # DB models: User, Job, Application, SavedJob
│   │   └── client.js       # Prisma client instance
│   ├── uploads/            # Uploaded resume files
│   └── index.js            # Server entry point
│
├── frontend/
│   └── src/
│       ├── components/     # Navbar, Footer, Button, ProtectedRoute
│       ├── context/        # AuthContext (global auth state)
│       ├── pages/          # Home, Jobs, JobDetails, PostJob, EditJob,
│       │                   # Profile, Application, EmployerDashboard, EmployerJobs
│       ├── api.js          # Axios/fetch base config
│       └── App.jsx         # Routes and layout
│
└── README.md
```

---

## Database Schema

| Model | Key Fields |
|---|---|
| `User` | id, name, email, password, role (EMPLOYER / JOBSEEKER), phone, location, bio, resume |
| `Job` | id, title, description, skills, location, salary, experience, category, jobType, isActive, employerId |
| `Application` | id, jobId, userId, status, resume, coverLetter |
| `SavedJob` | id, userId, jobId |

**Enums:** `Role`, `JobType` (FULLTIME, PARTTIME, CONTRACT, INTERNSHIP, REMOTE), `ApplicationStatus` (PENDING, REVIEWED, SHORTLISTED, REJECTED, ACCEPTED)

---

## Getting Started

### Prerequisites

- Node.js v16+
- npm
- PostgreSQL database (local or hosted, e.g. Neon)

### 1. Clone the repository

```bash
git clone <repository-url>
cd HireHub
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret
PORT=3002
```

Run Prisma migrations and start the server:

```bash
npx prisma migrate deploy
npm start
```

The backend runs on `http://localhost:3002`.

### 3. Frontend setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in `frontend/`:

```env
VITE_API_URL=http://localhost:3002/api
```

Start the dev server:

```bash
npm run dev
```

The frontend runs on `http://localhost:5173` by default.

---

## API Routes

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/signup` | Register a new user | No |
| POST | `/api/auth/login` | Login and receive JWT | No |
| GET | `/api/jobs` | List all active jobs | No |
| GET | `/api/jobs/:id` | Get job details | No |
| POST | `/api/jobs` | Post a new job | Employer |
| PUT | `/api/jobs/:id` | Edit a job | Employer |
| DELETE | `/api/jobs/:id` | Delete a job | Employer |
| GET | `/api/applications` | Get user's applications | Job Seeker |
| POST | `/api/applications/:jobId` | Apply to a job | Job Seeker |
| GET | `/api/applications/job/:jobId` | Get applications for a job | Employer |
| PUT | `/api/applications/:id/status` | Update application status | Employer |
| GET | `/api/profile` | Get current user profile | Any |
| PUT | `/api/profile` | Update profile | Any |

---

## Deployment

- **Frontend** is deployed on [Vercel](https://vercel.com). The `vercel.json` includes a rewrite rule to support client-side routing.
- **Backend** is deployed on [Railway](https://railway.app).
- CORS is configured to allow requests from the Vercel frontend URL and local dev origins.

---


