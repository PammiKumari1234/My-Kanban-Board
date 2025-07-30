## Getting Started

First, run the development server:

```bash
npm run dev
```
Technologies Used:

Frontend:
Next.js (React Framework)
React
TypeScript
Tailwind CSS

Backend:
Next.js API Routes
Prisma ORM
Supabase (PostgreSQL Database)

1. Installed Next.js + tsx + tailwind
2. Created a basic Navbar with repsonive hamburger menu. Installed lucide-react for the icons. 
3. Made the kanban Page
5. Craeted Next.js APIs route for getting the data on the kanban page.
6. Created a modal for create task.

🧰 Backend Setup Overview
📦 Technologies Used
Next.js (App Router) — Modern React framework for server-rendered and client-side routing

TypeScript — Type-safe development

Tailwind CSS — Utility-first styling

Prisma ORM — Type-safe database access layer

Supabase (PostgreSQL) — Hosted database with a free tier, used for persistent data

🛠️ What We Configured
✅ Prisma Initialization
Installed Prisma with npm install prisma --save-dev

Ran npx prisma init to generate prisma/ folder and .env

Defined a Task model inside prisma/schema.prisma for Kanban items

✅ Supabase Connection
Created a Supabase project and obtained the DATABASE_URL

Added the PostgreSQL connection string to .env

Migrated schema using npx prisma migrate dev --name init

✅ Database Client
Created a reusable Prisma client in lib/prisma.ts to avoid multiple instances

✅ API Integration
Created src/app/api/tasks/route.ts to fetch tasks (GET)

Created src/app/api/tasks/create/route.ts to add new tasks (POST)

Removed hardcoded task arrays to rely solely on Supabase DB

📖 Why It’s Important
🔐 Supabase gives us a scalable, secure, and hosted backend — no more local JSON or static arrays

🔄 Prisma simplifies querying, creating, and managing database records with TypeScript support

🧱 This setup lays the groundwork for dynamic Kanban functionality, real-time updates, user-based filtering, and deployment scalability

Features
Task Management: Create, view, and delete tasks.

Kanban View: Tasks organized into status columns.

Persistent Storage: Data stored in a PostgreSQL database via Supabase.

Type-Safe Backend: Using Prisma ORM for database interactions.

Modern Frontend: Built with React and Next.js, styled with Tailwind CSS.


Project Structure
The project is structured as follows:

your-kanban-app/
├── lib/
│   └── prisma.ts             # Prisma Client initialization (singleton)
├── prisma/
│   └── schema.prisma         # Database schema definition for Prisma
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── tasks/
│   │   │   │   ├── route.ts         # Handles GET requests for tasks
│   │   │   │   ├── create/
│   │   │   │   │   └── route.ts     # Handles POST requests to create tasks
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts     # Handles DELETE requests for specific tasks
│   │   │   └── layout.tsx           # Root layout for the Next.js application
│   │   └── page.tsx                 # Main Kanban board page component
│   ├── components/
│   │   └── AddTaskForm.tsx          # Modal form for adding new tasks
│   ├── types/
│   │   └── index.ts                 # TypeScript interfaces for data models (e.g., Task)
│   └── globals.css                  # Global CSS styles and Tailwind directives
├── .env                      # Environment variables (database connection, API keys)
├── .gitignore                # Specifies intentionally untracked files to ignore
├── package.json              # Project dependencies and scripts
├── postcss.config.js         # PostCSS configuration for Tailwind CSS
├── tailwind.config.js        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration

API Endpoints
GET all tasks: /api/tasks

POST (create) a new task: /api/tasks/create

DELETE a task by ID: /api/tasks/[id] (e.g., /api/tasks/123)

 To do- implement a loader and optimize the network call, implement a lazy laoding, shimmer UI.
4. To Do- create a form task- add that as a button on the navbar.
    a. Make a modal like straucture that appaers in the center of the page, then it will have the prompt like messages. Have a attachment option for uploading files, a close button. 
    b. as soon as I submit the form it should appear in the task queue.