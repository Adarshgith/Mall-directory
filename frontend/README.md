# Mall Directory

A full-stack mall store directory. Visitors can browse stores, search by name, filter by category, and open a store details modal. The admin dashboard lets users create, edit, and delete store listings.

## Live application

- **Frontend:** [https://mall-directory.vercel.app](https://mall-directory.vercel.app)
- **Backend API:** [https://mall-directory.onrender.com](https://mall-directory.onrender.com)

The backend root endpoint returns a simple status message. Store API routes are under `/api/stores`.

## Features

- Store directory populated from the backend API
- Debounced name search and category filters
- Alphabetical sorting by store name (A–Z or Z–A)
- Client-side pagination with six stores per page
- Store detail modal with location, description, and opening hours
- Admin dashboard summary with total stores, distinct categories, and the most populated category
- Admin login and a frontend-protected `/admin` route
- Admin dashboard with store table and add, edit, and delete actions
- Required-field validation in the admin form and backend
- Loading, empty, and error/feedback states
- MongoDB persistence through Mongoose

## Tech stack

| Area | Technologies |
| --- | --- |
| Frontend | React 19, Vite 8, React Router, Tailwind CSS 4 |
| Backend | Node.js, Express 5 |
| Database | MongoDB with Mongoose |
| Tests | Jest, Supertest |
| Hosting | Vercel (frontend), Render (backend) |

## Project structure

```text
mall-directory/
├── backend/
│   ├── config/db.js             # MongoDB connection
│   ├── middleware/validate.js   # Store request validation
│   ├── models/Store.js          # Mongoose store model
│   ├── routes/stores.js         # Store CRUD API
│   ├── routes/auth.js           # Admin login API
│   ├── seed/seedData.js         # Sample data seeder
│   ├── tests/stores.test.js     # API tests
│   └── server.js                # Express app and server
└── frontend/
    └── src/
        ├── components/          # Search, filters, sorting, pagination, cards, and modals
        ├── pages/               # Directory, login, and admin dashboard
        └── services/api.js      # Frontend API requests
```

## Architecture and feature behavior

- The React/Vite frontend calls the Express API using `VITE_API_URL`. Express connects to MongoDB through Mongoose and serves the store and authentication routes.
- Store search and category filtering are sent to `GET /api/stores`. The API returns matching stores ordered newest first; the directory then sorts the returned results alphabetically in the browser and paginates them at six stores per page. Changing search, category, or sort resets the page to the first page.
- The admin dashboard loads the store list and calculates the total store count, the number of distinct categories represented by those stores, and the most populated category.
- Admin login compares credentials configured on the backend and returns a JWT that expires after 24 hours. The frontend stores the token in `localStorage`; the `/admin` route redirects to `/login` when no token is present.
- **Authorization limitation:** the admin route check is frontend-only. Store create, update, and delete API endpoints currently do not verify the JWT, so this login does not secure those API operations. Do not rely on it as backend authorization for a production admin system.

## Run locally

You will need Node.js and npm, plus a MongoDB database (local or hosted).

### 1. Configure and start the backend

In PowerShell:

```powershell
cd backend
Copy-Item .env.example .env
```

Edit `backend/.env` and set `MONGODB_URI` to a reachable MongoDB connection string. For a local MongoDB server, the example below uses the `mall-directory` database; MongoDB creates the database when the application first writes data. `PORT` is optional and defaults to `5000`.

```env
MONGODB_URI=mongodb://127.0.0.1:27017/mall-directory
PORT=5000
ADMIN_EMAIL=admin@mall.com
ADMIN_PASSWORD=admin123
JWT_SECRET=replace-with-a-long-random-secret
```

The demo reviewer credentials (`admin@mall.com` / `admin123`) are displayed on the login page in local and staging builds. Set `ADMIN_EMAIL=admin@mall.com` and `ADMIN_PASSWORD=admin123` in the corresponding backend environment for these credentials to work. These public demo credentials grant admin access; use them only with disposable demo data, and change them after review. The backend environment template is at `backend/.env.example`.

Email matching ignores letter case and surrounding spaces; passwords must match exactly.

Install dependencies and start the API:

```powershell
npm install
npm run dev
```

The API will be available at `http://localhost:5000`. The health endpoint is `http://localhost:5000/`.

### 2. Configure and start the frontend

Open a second terminal:

```powershell
cd frontend
Copy-Item .env.example .env
```

Set the API base URL in `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

The frontend environment template is at `frontend/.env.example`.

Install dependencies and start Vite:

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite (typically `http://localhost:5173`).

> Run each `cd` command from the repository root in its own terminal, or return to the root before switching between `backend` and `frontend`.

### Sample data

The seed script inserts nine sample stores across four categories:

```powershell
cd backend
node seed/seedData.js
```

**Warning:** the current seeder runs `Store.deleteMany()` before inserting its sample records. It deletes all existing store records in the database configured by `MONGODB_URI`. Use a disposable development database, and do not run it against production data.

## Environment variables

| Variable | Application | Required | Description |
| --- | --- | --- | --- |
| `MONGODB_URI` | Backend | Yes | MongoDB connection string |
| `PORT` | Backend | No | HTTP port; defaults to `5000` |
| `ADMIN_EMAIL` | Backend | Yes for login | Admin email accepted by the login endpoint |
| `ADMIN_PASSWORD` | Backend | Yes for login | Admin password accepted by the login endpoint |
| `JWT_SECRET` | Backend | Yes for login | Private key used to sign login tokens |
| `VITE_API_URL` | Frontend | No | Backend API base URL, including `/api`; defaults to `http://localhost:5000/api` |

Example files are provided in `backend/.env.example` and `frontend/.env.example`. Keep real credentials in local environment files or hosting-provider settings; do not commit them.

## API

Base URL: `https://mall-directory.onrender.com/api`

For local development, use `http://localhost:5000/api`. All endpoints return JSON. Successful store responses use `{ "success": true, "data": ... }`; validation errors return `{ "success": false, "errors": [...] }`.

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/auth/login` | Verify configured admin credentials and return a JWT |
| `GET` | `/stores` | List stores; optionally filter with `search` and `category` query parameters |
| `GET` | `/stores/:id` | Get one store |
| `POST` | `/stores` | Create a store |
| `PUT` | `/stores/:id` | Replace/update a store |
| `DELETE` | `/stores/:id` | Delete a store |

### List and search stores

```http
GET /api/stores?search=bean&category=Food%20%26%20Beverage
```

Both query parameters are optional. Search matches store names without case sensitivity. The API returns results newest first (`createdAt` descending). Alphabetical sorting and pagination are currently handled by the frontend; the API does not accept sort, page, or limit parameters.

### Store fields

| Field | Required | Notes |
| --- | --- | --- |
| `name` | Yes | Store name; trimmed |
| `category` | Yes | One of `Food & Beverage`, `Fashion`, `Electronics`, or `Services` |
| `floor` | Yes | Floor or location text; trimmed |
| `description` | No | Defaults to an empty string |
| `openingHours` | No | Defaults to `10:00 AM – 10:00 PM` |
| `_id`, `createdAt`, `updatedAt` | Generated | Assigned by MongoDB/Mongoose |

Example create/update request body:

```json
{
  "name": "Bean & Brew",
  "category": "Food & Beverage",
  "floor": "Level 1",
  "description": "Coffee, tea and light snacks.",
  "openingHours": "8:00 AM – 10:00 PM"
}
```

Expected status codes include `200` for reads, updates, and deletes; `201` for creation; `400` for invalid required fields or category; and `404` when a well-formed ID does not match a store. Database/operation errors return `500`.

## Tests and checks

Backend API tests use Jest and Supertest. Set `MONGODB_URI` in `backend/.env` to a reachable development/test database before running them:

```powershell
cd backend
npm test
```

The tests create, update, and delete a test store in the configured database. Do not point them at a production database.

Frontend scripts:

```powershell
cd frontend
npm run lint
npm run build
```

## Deployment

### Backend on Render

The deployed API is [https://mall-directory.onrender.com](https://mall-directory.onrender.com).

When configuring the Render service, use `backend` as the root directory, `npm install` as the build command, and `npm start` as the start command. Configure `MONGODB_URI` in the Render environment settings with the production MongoDB connection string. The server listens on Render's `PORT` value when provided.

For admin login, also configure `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `JWT_SECRET` in Render's environment settings. Use a strong password and a unique, private JWT secret; do not use the example placeholders.

The staging login only accepts the values configured in that Render service's environment settings. Confirm `ADMIN_EMAIL` and `ADMIN_PASSWORD` there match the credentials you enter, and ensure `JWT_SECRET` is set. Changing these values requires restarting or redeploying the backend service.

### Frontend on Vercel

The deployed frontend is [https://mall-directory.vercel.app](https://mall-directory.vercel.app).

Configure `frontend` as the Vercel project root, use `npm run build` as the build command, and `dist` as the output directory. The included `vercel.json` rewrites client-side routes such as `/login` and `/admin` to the app entry point, so refreshing those URLs does not return a Vercel 404. Set this environment variable in Vercel:

```env
VITE_API_URL=https://mall-directory.onrender.com/api
```

Vite embeds `VITE_API_URL` at build time, so redeploy the frontend after changing it. If it is unset, the app falls back to the local API URL.

## Limitations and security notes

- The `/admin` page is gated by the presence of a token in browser `localStorage`, but the backend store CRUD endpoints do not verify JWTs. Add backend authorization before relying on this login to protect store data.
- Directory pagination and alphabetical sorting are client-side, not server-side.
- The sample-data seeder deletes all store documents before inserting its samples; see the warning above.
- Deployment depends on the frontend's `VITE_API_URL` and backend environment variables being configured correctly in their hosting environments.
