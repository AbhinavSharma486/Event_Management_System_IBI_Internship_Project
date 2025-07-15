# Event Management System – Backend

This is the backend for the Event Management System, built with Node.js, Express, and MongoDB. It provides RESTful APIs for authentication, event management, attendee management, and analytics.

---

## Tech Stack
- **Node.js** (Express.js)
- **MongoDB** (Mongoose)
- **Cloudinary** (image uploads)
- **JWT** (authentication)
- **Security:** helmet, express-rate-limit, CORS
- **Logging:** morgan
- **Scheduling:** node-cron

---

## Directory Structure
```
Backend/
├── index.js                # Main server entry point
├── package.json            # Dependencies and scripts
├── controllers/            # Route logic (auth, event)
│   ├── auth.controller.js
│   └── event.controller.js
├── routes/                 # API route definitions
│   ├── auth.route.js
│   └── events.route.js
├── models/                 # Mongoose models
│   ├── User.model.js
│   └── Event.model.js
├── middleware/             # Express middleware
│   └── auth.middleware.js
├── lib/                    # DB and Cloudinary config
│   ├── db.js
│   └── cloudinary.js
├── utils/                  # Utility scripts
│   ├── cleanupOldEvents.js
│   └── generateTokenAndSetCookie.js
```

---

## Setup & Installation

1. **Install dependencies:**
   ```bash
   cd Backend
   npm install
   ```
2. **Set up environment variables:**
   - Create a `.env` file in the Backend directory:
     ```env
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
     CLOUDINARY_API_KEY=your_cloudinary_api_key
     CLOUDINARY_API_SECRET=your_cloudinary_api_secret
     ```
3. **Run the server:**
   ```bash
   npm start         # Production
   npm run dev       # Development (nodemon)
   ```

---

## Scripts (package.json)
- `npm start` – Start server (node index.js)
- `npm run dev` – Start server with nodemon

---

## Main Dependencies
- express, mongoose, dotenv, cors, helmet, express-rate-limit, morgan, cloudinary, bcryptjs, jsonwebtoken, cookie-parser, compression, node-cron, validator
- dev: nodemon

---

## API Overview
- **Auth:**
  - `POST /api/auth/register` – Register user
  - `POST /api/auth/login` – Login
  - `POST /api/auth/logout` – Logout
  - `GET /api/auth/profile` – Get user profile
- **Events:**
  - `POST /api/event/create-event` – Create event
  - `GET /api/event/my-events` – Get events created by user
  - `GET /api/event/attending-events` – Get events user is attending
  - `GET /api/event/getSingleEvent/:id` – Get event details
  - `PUT /api/event/updateEvent/:id` – Update event
  - `DELETE /api/event/deleteEvent/:id` – Delete event
  - `POST /api/event/addAttendeeToEvent/:id` – Add attendee
  - `DELETE /api/event/:eventId/removeAttendee/:userId` – Remove attendee
  - `POST /api/event/leaveEvent/:id` – Leave event
  - `GET /api/event/calendar-events` – Get events for calendar
- See `controllers/` and `routes/` for full details.

---

## Key Files
- **index.js:** Main server, middleware, error handling, and route mounting
- **controllers/**: Business logic for auth and events
- **models/**: User and Event schemas
- **middleware/**: Auth middleware for protected routes
- **lib/**: DB and Cloudinary config
- **utils/**: Scheduled cleanup, JWT/cookie helpers

---

## Security & Production
- Uses helmet, express-rate-limit, and CORS for security
- JWT for authentication
- Gzip compression enabled
- Logging with morgan
- Scheduled cleanup of old events (node-cron)
- For production, use PM2 or a process manager
- Consider Nginx as a reverse proxy

---

## Troubleshooting
- **MongoDB errors:** Check `MONGODB_URI` and network
- **Cloudinary issues:** Check credentials
- **JWT/auth errors:** Check `JWT_SECRET`
- **Port conflicts:** Default is 5000 (set `PORT` in .env if needed)

---

## Contributing & Support
- PRs welcome! For major changes, open an issue first.
- For full-stack context, see the root [README.md](../README.md) and [Frontend/README.md](../Frontend/README.md)
- For questions, open an issue or contact the maintainer.

--- 