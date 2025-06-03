'use strict';

// External libraries
const express = require('express');          // Import Express

// Internal Utilities
const sessionRouter = require('./session');  // Import the sessionRouter
const usersRouter = require('./users');      // Import the usersRouter
const { requireAuth, restoreUser } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');  // Validation handler

// Models
const { Spot, SpotImage } = require('../../db/models');

const router = express.Router();             // Create a router instance

// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.use(restoreUser);

//! Add middleware to connect to "session" and "users" routers
router.use('/session', sessionRouter);                 // Mount session router at /api/session
router.use('/users', usersRouter);                     // Mount users router at /api/users

//! Test POST route
router.post('/test', (req, res) => {                   // Test route (can be removed later)
  res.json({ requestBody: req.body });
});

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




module.exports = router;                        // Export the router for use in other files