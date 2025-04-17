const router = require('express').Router();     // Create a new Express router instance
const sessionRouter = require('./session.js');         // Import session router
const usersRouter = require('./users.js');             // Import users router
const { restoreUser } = require("../../utils/auth.js");  // Import auth middleware

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
  

module.exports = router;                        // Export the router for use in other files