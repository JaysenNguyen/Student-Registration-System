# Student Registration System
Full-stack student course registration system built with React, Flask, and SQLite. Includes REST API integration, relational database design, and multi-page workflows for managing students, courses, and enrollments.

## Tech Stack
- Frontend: React, JavaScript, HTML, CSS
- Backend: Flask (Python)
- Database: SQLite
- Tools: Git, GitHub, Vite

## Features
- Add and manage student records
- Create and manage courses
- Enroll students into courses
- View all enrollments in a unified dashboard
- Delete enrollment records
- REST API integration between frontend and backend

## Project Structure
- client   → React frontend  
- server   → Flask backend + SQLite database

## Setup Instructions
### Frontend
```bash
cd client
npm install
npm run dev
```

### Backend
```bash
cd server
python app.py
```

## API Endpoints
### Students
- GET `/api/students`
- POST `/api/students`

### Courses
- GET `/api/courses`  
- POST `/api/courses` 

### Enrollments
- GET `/api/enrollments`  
- POST `/api/enrollments`  
- DELETE `/api/enrollments/:id`
