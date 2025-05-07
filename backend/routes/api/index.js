//! Create and initialize a new Express Router instance for route handling
const router = require('express').Router();

//! Import route modules
const sessionRouter = require('./session.js'); // Handles session-related routes (login, logout, etc.)
const usersRouter = require('./users.js'); // Handles user registration and user-related routes
const spotsRouter = require('./spots.js'); // Handles spot listing and management routes
const reviewsRouter = require('./reviews.js'); // Handles review creation, editing, and deletion
const bookingsRouter = require('./bookings.js'); // Handles booking-related routes
const spotImagesRouter = require('./spot-images.js'); // Handles image uploads and management for spots
const reviewImagesRouter = require('./review-images.js'); // Handles image uploads and management for reviews

//! Auth middleware to restore user session from token
const { restoreUser } = require("../../utils/auth.js");


//! Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.use(restoreUser);

//! Add middleware to connect to "session" and "users" routers
//! Mounted Routers at /api/...
router.use('/session', sessionRouter);                 // Mount session router at /api/session
router.use('/users', usersRouter);                     // Mount users router at /api/users
router.use('/spots', spotsRouter)
router.use('/reviews', reviewsRouter)
router.use('/bookings', bookingsRouter)
router.use('/spot-images', spotImagesRouter)
router.use('/review-images', reviewImagesRouter)



// ================================ BEGINNING OF TESTING CODE ================================
// //! Test POST route
// router.post('/test', (req, res) => {                   // Test route (can be removed later)
//   res.json({ requestBody: req.body });
// });

// //! Test POST route
// // Test route to check if API router is working
// router.post('/test', function(req, res) {      // Define a POST endpoint at /api/test
//     res.json({ requestBody: req.body });         // Echo back the request body as JSON
//   });

// //! Test Authentication Utilities
// // GET /api/set-token-cookie
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({                // Find the demo user
//     where: {
//       username: 'Demo-lition'
//     }
//   });
//   setTokenCookie(res, user);                      // Set a JWT cookie for this user
//   return res.json({ user: user });                // Return the user in the response
// });

// // GET /api/restore-user
// const { restoreUser } = require('../../utils/auth.js');

// router.use(restoreUser);                          // Apply restoreUser middleware to all routes

// router.get(
//   '/restore-user',
//   (req, res) => {
//     return res.json(req.user);                    // Return the current user from the request
//   }
// );

// // GET /api/require-auth
// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//   '/require-auth',
//   requireAuth,                                    // Apply requireAuth middleware to this route
//   (req, res) => {
//     return res.json(req.user);                    // Return the authenticated user
//   }
// );

// ================================ END OF TESTING CODE ================================


module.exports = router;                        // Export the router for use in other files



//! FETCH CODE TO TEST API ROUTER
// fetch('/api/test', {
//     method: "POST",                               // HTTP method
//     headers: {
//       "Content-Type": "application/json",         // Specify content type as JSON
//       "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`  // Include CSRF token
//     },
//     body: JSON.stringify({ hello: 'world' })      // Convert JS object to JSON string
//   }).then(res => res.json()).then(data => console.log(data));
