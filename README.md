# DriveX

DriveX is a responsive full-stack car discovery and comparison project. It lets visitors browse vehicles, filter by body type and budget, search by make/model, save favourites, and compare up to four cars side-by-side.

## Stack

- **Frontend:** React, Vite, Tailwind CSS, Lucide icons
- **Backend:** Node.js, Express, JWT, bcryptjs, cookie-parser, Nodemailer
- **Storage:** small in-memory store, intentionally kept simple for a fresher-friendly project structure

## Run locally

Open two terminals from the project root.

```bash
cd backend
copy .env.example .env
npm install
npm run dev
```

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at `http://localhost:5173` and the API runs at `http://localhost:5001`.

## Key API routes

| Method | Route | Purpose |
| --- | --- | --- |
| GET | /api/cars | List, search and filter cars |
| GET | /api/cars/:id | Get a single car |
| POST | /api/auth/register | Create an account |
| POST | /api/auth/login | Log in and set an HTTP-only JWT cookie |
| POST | /api/auth/logout | Clear session cookie |
| POST | /api/contact | Send a contact request (logs locally without email credentials) |

## Notes

The sample car catalogue is in `backend/src/data/cars.js`. Authentication data is in memory and resets whenever the API restarts. For production, replace it with MongoDB/PostgreSQL and add rate limiting, input validation, and a real email provider.
