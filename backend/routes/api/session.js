const express = require('express');          // Import Express
const { Op } = require('sequelize');           // Import Sequelize operators
const bcrypt = require('bcryptjs');            // Import bcrypt for password comparison

const { setTokenCookie, restoreUser } = require('../../utils/auth');  // Import auth utilities
const { User } = require('../../db/models');   // Import User model

//! Validate the body of a request.
const { check } = require('express-validator');                    // Import check function
const { handleValidationErrors } = require('../../utils/validation');  // Import validation handler

const router = express.Router();

//! Check to see whether or not `req.body.credential` and `req.body.password` are empty.
const validateLogin = [                                           // Create array of middleware
  check('credential')                                             // Validate credential field
    .exists({ checkFalsy: true })                                // Must exist and not be falsy
    .notEmpty()                                                  // Must not be empty
    .withMessage('Email or username is required'),   // Error message
  check('password')                                              // Validate password field
    .exists({ checkFalsy: true })                                // Must exist and not be falsy
    .withMessage('Password is required'),                  // Error message
  handleValidationErrors                                         // Process validation results
];

// Log in =====================================================================================
// !added validateLogin to router.post
router.post('/', validateLogin, async (req, res, next) => {   // POST /api/session endpoint
  const { credential, password } = req.body;   // Extract credentials from request body

  //! Find the user by either username or email
  const user = await User.unscoped().findOne({  // Use unscoped() to include hashedPassword
    where: {
      [Op.or]: {                              // Use OR operator to match either field
        username: credential,
        email: credential
      }
    }
  });

  //! Check if user exists and password is correct
  if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
    const err = new Error('Login failed');     // Create error for failed login
    err.status = 401;                          // Set HTTP status code to 401 Unauthorized
    err.title = 'Login failed';
    err.errors = { message: 'Invalid credentials' };
    return next(err);                          // Pass error to error-handling middleware
    // return err;                 
  }

  // {
  //   "message": "Invalid credentials"
  // }

  //! Create a safe user object (without hashedPassword)
  //! added firstName and lastName
  const safeUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
  };

  //! Set the JWT cookie
  await setTokenCookie(res, safeUser);         // Create and set JWT cookie

  //! Return the user information
  return res.json({
    user: safeUser                            // Return user data as JSON
  });

});

// Log out
router.delete('/', (_req, res) => {            // DELETE /api/session endpoint
  res.clearCookie('token');                    // Remove the JWT cookie
  return res.json({ message: 'success' });     // Return success message
});

// Restore session user
router.get('/', (req, res) => {                 // GET /api/session endpoint
  const { user } = req;                         // Get user from GLOBAL request object
  if (user) {
      safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username
    };

    return res.json({
      user: safeUser                           // Return user data if logged in
    });
  } else return res.json({ user: null });       // Return null if not logged in
});


module.exports = router;                     // Export the router for use in other files



//! TEMP HOLD