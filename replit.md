# Workspace

## Overview

ASAV Soft Tech - IT Training Institute web application. Full-stack platform built with React + Vite frontend and Express API backend.

**Institute Details:**
- Name: ASAV Soft Tech
- Phone: +91 9535035171
- Email: asavsofttech@gmail.com
- Website: www.asav.com
- Tagline: "Empower Your Career With Us"

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React 18 + Vite + Tailwind CSS + Framer Motion
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── api-server/         # Express API server
│   └── asav-soft-tech/     # React + Vite frontend (preview at /)
├── lib/
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/
│   └── src/seed.ts         # Database seeder
└── ...
```

## Features

### Frontend Pages
1. **Landing Page** - Hero, courses preview, stats, footer, chatbot
2. **Login / Register** - Role-based auth (student/trainer/admin), demo accounts
3. **Courses** - All 5 courses with search and filtering
4. **Course Detail** - Full course info, enroll button
5. **Student Dashboard** - Progress, enrollments, announcements
6. **Trainer Dashboard** - Course management, student performance
7. **Admin Dashboard** - Stats, charts, management
8. **Certificates** - Download certificates

### Courses
1. DevOps Engineer (6 months, Advanced, 5 projects)
2. Data Engineer (5 months, Intermediate, 4 projects)
3. Full Stack Developer (4 months, Beginner, 6 projects)
4. Medical Coding (3 months, Beginner, 2 projects)
5. Soft Skills & Communication (2 months, Beginner)

### Design
- Dark futuristic theme (deep navy + golden amber + electric blue)
- Glassmorphism UI with neon glow effects
- Orbitron display font + Inter body font
- Framer Motion animations
- AI Chatbot (bottom right, floating)

## Demo Accounts
- Admin: admin@asavsofttech.com / admin123
- Trainer: trainer@asavsofttech.com / trainer123
- Student: student@asavsofttech.com / student123

## API Endpoints
- `POST /api/auth/login` — Login
- `POST /api/auth/register` — Register
- `GET /api/auth/me` — Current user
- `GET /api/courses` — All courses
- `GET /api/courses/:id` — Course detail
- `POST /api/enrollments` — Enroll in course
- `GET /api/enrollments` — User enrollments
- `PUT /api/enrollments/:id/progress` — Update progress
- `GET /api/certificates` — User certificates
- `POST /api/certificates/generate` — Generate certificate
- `GET /api/placements` — Placement records
- `GET /api/announcements` — Announcements
- `GET /api/admin/stats` — Admin dashboard stats

## Database Schema
- `users` — Students, trainers, admin accounts
- `courses` — All 5 IT training courses
- `enrollments` — Student course enrollments + progress
- `certificates` — Generated certificates
- `placements` — Job placement records
- `announcements` — Institute announcements

## Running the Project
- Frontend dev: `pnpm --filter @workspace/asav-soft-tech run dev`
- API dev: `pnpm --filter @workspace/api-server run dev`
- Seed DB: `pnpm --filter @workspace/scripts run seed`
- Run codegen: `pnpm --filter @workspace/api-spec run codegen`
