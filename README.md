# Assignment

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Folder Structure](#folder-structure)
- [Setup Instructions](#setup-instructions)
  - [Backend (API)](#backend-api)
  - [Frontend (Web)](#frontend-web)
- [Running the Project](#running-the-project)
- [Environment Variables](#environment-variables)
- [Technologies Used](#technologies-used)
- [Database Setup](#database-setup)
- [Troubleshooting](#troubleshooting)

---

## Introduction
This Assignments help users authenticate using Google OAuth and manage their accounts seamlessly. It ensures secure signups, logins, and efficient communication between frontend and backend services.

---

## Features

- Google OAuth-based authentication.
- Secure JWT handling.
- User-friendly frontend built with Next.js.
- Scalable and modular backend using NestJS.
- Centralized error handling.
- Responsive and accessible UI.

---

## Prerequisites

Ensure you have the following installed:

- Node.js (v16 or later)
- pnpm (for backend package management)
- Docker (for running PostgreSQL)
- PostgreSQL client tools (optional, for database management)

---

## Folder Structure

```
root/
├── apps/
│   ├── api/        # Backend application
│   ├── web/        # Frontend application
├── README.md       # Project documentation
├── package.json    # Root dependencies
```

---

## Setup Instructions

### Backend (API)

1. Navigate to the backend folder:
   ```bash
   cd apps/api
   ```

2. Install dependencies using pnpm:
   ```bash
   pnpm install
   ```

3. Set up environment variables in `apps/api/.env`:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=mysecretpassword
   DB_NAME=mydatabase
   JWT_SECRET=ABC
   SERVER=http://localhost:8000
   GOOGLE_CLIENT_ID=""
   GOOGLE_CLIENT_SECRET=G
   ```

4. Start the backend server:
   ```bash
   pnpm run start:dev
   ```

5. Verify the backend is running at `http://localhost:8000`.

### Frontend (Web)

1. Navigate to the frontend folder:
   ```bash
   cd apps/web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in `apps/web/.env.local`:
   ```env
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=
   NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
   ```

4. Start the frontend server:
   ```bash
   npm run dev
   ```

5. Verify the frontend is running at `http://localhost:3000`.

---

## Running the Project

1. Start the backend service:
   ```bash
   cd apps/api && pnpm run start:dev
   ```

2. Start the frontend service:
   ```bash
   cd apps/web && npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`.

---

## Environment Variables

### Backend (API)
- `DB_HOST`: Host for the PostgreSQL database.
- `DB_PORT`: Port for the PostgreSQL database.
- `DB_USERNAME`: PostgreSQL username.
- `DB_PASSWORD`: PostgreSQL password.
- `DB_NAME`: Database name for the application.
- `JWT_SECRET`: Secret key for JWT.
- `SERVER`: Backend server URL.
- `GOOGLE_CLIENT_ID`: Google OAuth client ID.
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret.

### Frontend (Web)
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID`: Google OAuth client ID for the frontend.
- `NEXT_PUBLIC_BACKEND_URL`: Backend API URL.

---

## Technologies Used

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: NestJS, PostgreSQL, TypeORM
- **Authentication**: Google OAuth, JWT
- **Deployment**: Docker (for PostgreSQL and optional containerization)

---

## Database Setup

1. Pull the PostgreSQL Docker image and run the container:
   ```bash
   docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres
   ```

2. Create a new database named `mydatabase`:
   ```bash
   docker exec -it some-postgres psql -U postgres -c "CREATE DATABASE mydatabase;"
   ```

3. Connect to the database using the following command:
   ```bash
   docker exec -it some-postgres psql -U postgres -d mydatabase
   ```

4. Verify the database is accessible and ready for use.

---

## Troubleshooting

### Common Issues

1. **Environment Variables Not Working**:
   - Ensure variables are defined in `.env` for the backend and `.env.local` for the frontend.
   - Restart the server after updating `.env` files.

2. **CORS Issues**:
   - Confirm `NEXT_PUBLIC_BACKEND_URL` is correctly set in the frontend environment variables.
   - Check CORS configuration in the backend (`main.ts`).

3. **Database Connection Issues**:
   - Verify the PostgreSQL container is running.
   - Ensure `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, and `DB_NAME` are correctly set in the backend environment variables.

4. **Docker Issues**:
   - Check Docker logs for errors: `docker logs some-postgres`.
   - Restart the container if necessary: `docker restart some-postgres`.

### Debugging
- Use `console.log` for debugging in both backend and frontend.
- Check browser developer tools for frontend issues.
- Review logs in the terminal for backend errors.

---


