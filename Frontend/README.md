.
└── Event Management System/
    ├── Frontend/
    │   ├── vite.config.js
    │   ├── tailwind.config.js
    │   ├── package.json
    │   ├── .env
    │   └── src /
    │       ├── hooks/
    │       │   ├── useAuth.js
    │       │   ├── useEvents.js
    │       │   └── useUpload.js
    │       ├── routes/
    │       │   ├── AppRoutes.jsx
    │       │   └── ProtectdRoute.jsx
    │       ├── styles/
    │       │   ├── global.css 
    │       │   ├── tailwind.css
    │       │   └── assets/
    │       │       ├── images/
    │       │       ├── logos/
    │       │       └── banners/
    │       ├── store/
    │       │   ├── useStore.js
    │       │   ├── eventStore.js
    │       │   └── uiStore.js
    │       ├── pages/
    │       │   ├── Home.jsx
    │       │   ├── Login.jsx
    │       │   ├── Register.jsx
    │       │   ├── Dashboard.jsx
    │       │   ├── Events.jsx
    │       │   ├── CreateEvent.jsx
    │       │   ├── EventDetail.jsx
    │       │   ├── Calendar.jsx
    │       │   ├── Analytics.jsx
    │       │   └── Profile.jsx
    │       ├── components/
    │       │   ├── ui/
    │       │   ├── layout/
    │       │   ├── forms/
    │       │   └── charts/
    │       └── services/
    │           ├── api.js
    │           ├── authService.js
    │           ├── eventService.js
    │           ├── uploadService.js
    │           └── utils/
    │               ├── constants.js
    │               └── helper.js
    └── Backend/
        ├── server.js
        ├── app.js
        ├── package.json
        ├── .env
        └── src/
            ├── utils/
            │   ├── validators.js
            │   ├── logger.js
            │   └── config/
            │       ├── database.js
            │       ├── jwt.js
            │       └── cloudinary.js
            ├── database/
            │   ├── connection.js
            │   ├── seeds/
            │   └── migrations/
            ├── services/
            │   ├── authService.js
            │   ├── eventService.js
            │   ├── fileService.js
            │   ├── emailService.js
            │   └── analyticsService.js
            ├── middleware/
            │   ├── authMiddleware.js
            │   ├── uploadMiddleware.js
            │   ├── validationMiddleware.js
            │   ├── errorMiddleware.js
            │   └── corsMiddleware.js
            ├── models/
            │   ├── User.js
            │   ├── Event.js
            │   ├── Attendee.js
            │   └── Media.js
            ├── controllers/
            │   ├── authController.js
            │   ├── eventController.js
            │   ├── attendeeController.js
            │   ├── uploadController.js
            │   └── analyticsController.js
            └── routes/
                ├── authRoutes.js
                ├── eventRoutes.js
                ├── attendeeRoutes.js
                ├── uploadRoutes.js
                └── analyticsRoutes.js