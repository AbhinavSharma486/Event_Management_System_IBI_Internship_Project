# Event Management System

A full-stack MERN (MongoDB, Express.js, React, Node.js) web application for creating, managing, and attending events. This project provides a seamless experience for both event organizers and attendees.

---

## Features
- User registration and authentication (JWT-based)
- Create, edit, and delete events
- Event image and banner uploads (Cloudinary)
- Join/leave events as an attendee
- Attendee management for event creators
- Event analytics and calendar view
- Responsive, modern UI with dark mode support
- Real-time updates and notifications
- Secure and reliable (rate limiting, helmet, etc.)

---

## Project Structure
```
Event Management/
├── Frontend/   # React frontend (see Frontend/README.md)
├── Backend/    # Node.js/Express backend (see Backend/README.md)
```

---

## Getting Started

### 1. Clone the repository
```bash
git clone <repo-url>
cd Event Management
```

### 2. Setup the Backend
See [Backend/README.md](Backend/README.md) for full instructions.
```bash
cd Backend
npm install
# Create a .env file with your MongoDB URI, JWT secret, and Cloudinary credentials
npm start
```

### 3. Setup the Frontend
See [Frontend/README.md](Frontend/README.md) for full instructions.
```bash
cd Frontend
npm install
npm run dev
```

### 4. Access the App
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

---

## Environment Variables
- Backend: see Backend/README.md
- Frontend: see Frontend/README.md

---

## Screenshots / Demo
Add screenshots or demo GIFs here. Place images in an `assets/` folder at the project root and update this section as needed.

---

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License
This project is open source and available under the [MIT License](LICENSE).

---

## Contact / Support
For questions, issues, or feature requests, please open an issue or contact the maintainer. 