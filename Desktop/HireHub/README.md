HireHub

HireHub is a professional job portal application that allows job seekers to find their dream careers and employers to discover top talent. Like a job by applying to it, or save it for later. A simple, intuitive interface for finding your perfect career path.

Features

- Dual-Role Interface: Seamless transition between Job Seeker and Employer roles
- Job Discovery: Advanced search and filtering to find the right opportunities
- Employer Dashboard: Powerful tools for managing job postings and applications
- Profile Management: Showcase your skills or company highlights
- Responsive Design: Works perfectly on both desktop and mobile devices

Tech Stack

- React.js: A powerful UI library for building dynamic interfaces
- Node.js & Express: Robust backend architecture for handling complex logic
- Prisma: Modern ORM for efficient database management
- Tailwind CSS: Utility-first CSS for a premium and modern look
- JWT: Secure authentication and session management

Getting Started

Prerequisites

- Node.js 16.0.0 or newer
- npm or yarn
- PostgreSQL instance

Installation

1. Clone the repository:
   git clone <repository-url>
   cd HireHub

2. Backend Setup:
   cd backend
   npm install
   # or
   yarn install
   Configure your .env with DATABASE_URL and JWT_SECRET

3. Frontend Setup:
   cd ../frontend
   npm install
   # or
   yarn install

4. Run the development server:
   - Backend: npm start (in /backend)
   - Frontend: npm run dev (in /frontend)

5. Open http://localhost:3002 with your browser to see the application.

Project Structure

HireHub/
├── backend/            # Express server & Prisma logic
│   ├── controllers/    # API request handlers
│   ├── prisma/         # Database schema & client
│   ├── routes/         # API endpoints
│   └── index.js        # Server entry point
├── frontend/           # Vite + React application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Main application views
│   │   └── App.jsx     # Routing & Core logic
│   └── tailwind.config.js
└── README.md           # Project documentation

Usage

- Visit the landing page to explore featured jobs
- Sign up as a Job Seeker to apply for positions and upload your resume
- Sign up as an Employer to post jobs and review candidate applications
- Use the Dashboard to track your applications or manage your job listings

