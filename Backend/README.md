# Event Management System – Backend

## Project Structure

```
Backend/
├── package.json
├── package-lock.json
├── index.js
├── README.md
├── controllers/
│   ├── auth.controller.js
│   └── event.controller.js
├── lib/
│   ├── cloudinary.js
│   └── db.js
├── middleware/
│   └── auth.middleware.js
├── models/
│   ├── Event.model.js
│   └── User.model.js
├── routes/
│   ├── auth.route.js
│   └── events.route.js
├── utils/
│   └── generateTokenAndSetCookie.js
└── temp/ (empty, can be deleted if not needed)
```

## Getting Started

1. **Install dependencies:**
   ```bash
   cd Backend
   npm install
   ```
2. **Set up environment variables:**
   - Create a `.env` file in the Backend directory (see below).
3. **Run the server:**
   ```bash
   npm start
   # or
   node index.js
   ```

## Required Environment Variables
| Variable                  | Description                        |
|---------------------------|------------------------------------|
| MONGODB_URI               | MongoDB connection string           |
| JWT_SECRET                | Secret for JWT token signing        |
| CLOUDINARY_CLOUD_NAME     | Cloudinary cloud name               |
| CLOUDINARY_API_KEY        | Cloudinary API key                  |
| CLOUDINARY_API_SECRET     | Cloudinary API secret               |

**Sample .env:**
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## API Overview
- **Auth:** `/api/auth/register`, `/api/auth/login`, `/api/auth/logout`, `/api/auth/profile`
- **Events:** `/api/events` (CRUD), `/api/events/:id`, `/api/events/:id/attendees`, `/api/events/:id/analytics`

See route files for full details.

## Notes
- The `temp/` folder is currently empty and can be deleted if not required.
- For production optimization, scaling, and deployment, see deployment documentation or consult your DevOps guide.

## Troubleshooting
- **MongoDB connection errors:** Check your `MONGODB_URI` and network/firewall settings.
- **Cloudinary upload issues:** Verify your Cloudinary credentials.
- **JWT/auth errors:** Ensure `JWT_SECRET` is set and consistent.
- **Port conflicts:** Default port is 5000; change in `index.js` if needed.

## Node.js/Express
- Use PM2 or Node.js cluster mode to utilize all CPU cores:
  ```bash
  npm install -g pm2
  pm2 start index.js -i max
  ```
- Set NODE_ENV=production for best performance.

## MongoDB
- Use MongoDB Atlas or a managed cluster for high availability.
- Ensure indexes on frequently queried fields (see model comments).

## Nginx (Reverse Proxy)
- Use Nginx to serve static files and reverse proxy API requests:
  ```nginx
  server {
    listen 80;
    server_name yourdomain.com;
    location /api/ {
      proxy_pass http://localhost:5000/api/;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
    }
    location / {
      root /path/to/frontend/dist;
      try_files $uri $uri/ /index.html;
    }
  }
  ```

## Monitoring & Logging
- Use tools like PM2, New Relic, or Sentry for monitoring.
- Use morgan for HTTP logging (already included).

## Rate Limiting & Security
- express-rate-limit and helmet are enabled for security and abuse prevention.

## Caching
- For heavy read endpoints, consider Redis caching.

## Screenshots / Demo

You can add your own backend/admin screenshots or API response examples here. Place images in an `assets/` folder at the project root and update this section as needed.

--- 