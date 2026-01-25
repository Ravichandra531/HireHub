# HireHub

HireHub is a professional job portal application that allows job seekers to find their dream careers and employers to discover top talent. Users can apply to jobs, save them for later, and manage their profiles through a clean and intuitive interface designed to simplify the hiring process.

🚀 Features

Dual-Role Interface
Seamless switching between Job Seeker and Employer roles

Job Discovery
Advanced search and filtering to find the right opportunities

Employer Dashboard
Tools for managing job postings and reviewing applications

Profile Management
Showcase skills as a job seeker or highlight your company as an employer

Responsive Design
Fully optimized for desktop and mobile devices

🛠 Tech Stack

React.js – Dynamic and interactive UI

Node.js & Express – Backend server and API handling

Prisma – Modern ORM for database management

Tailwind CSS – Utility-first CSS for a clean, modern design

JWT – Secure authentication and session handling

PostgreSQL – Relational database

🧰 Getting Started
Prerequisites

Node.js v16.0.0 or newer

npm or yarn

PostgreSQL database

📦 Installation
1. Clone the repository
git clone <repository-url>
cd HireHub

2. Backend Setup
cd backend
npm install
# or
yarn install


Create a .env file and configure:

DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_secret_key


Start the backend server:

npm start

3. Frontend Setup
cd ../frontend
npm install
# or
yarn install


Start the frontend development server:

npm run dev

4. Open in Browser

Visit:

http://localhost:3002

📁 Project Structure
HireHub/
├── backend/
│   ├── controllers/     # API request handlers
│   ├── prisma/          # Database schema & Prisma client
│   ├── routes/          # API endpoints
│   └── index.js         # Server entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Application pages
│   │   └── App.jsx      # Routing & core logic
│   └── tailwind.config.js
│
└── README.md            # Project documentation

📌 Usage

Explore featured jobs on the landing page

Sign up as a Job Seeker to apply for jobs and upload resumes

Sign up as an Employer to post jobs and review applications

Use the Dashboard to manage applications or job listings
