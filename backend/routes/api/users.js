'use strict';

// External libraries
const express = require('express');          // Import Express
const bcrypt = require('bcryptjs');              // For password hashing
const { check } = require('express-validator');  // Validation library
const { UniqueConstraintError } = require('sequelize');

// Internal utilities 
const { setTokenCookie, requireAuth } = require('../../utils/auth');  // Auth utilities
const { handleValidationErrors } = require('../../utils/validation');  // Validation handler

// Models
const { User } = require('../../db/models');     // User model

const router = express.Router();             // Create a router instance

//! ADDED Validation check for firstName and lastName
const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })                      // Email must exist and not be falsy
    .isEmail()                                         // Must be valid email format
    .withMessage('Invalid email.'),
  check('username')
    .exists({ checkFalsy: true })                      // Username must exist and not be falsy
    .isLength({ min: 4 })                              // Must be at least 4 characters
    .withMessage('Username is required')
    .not()
    .isEmail()                                   // Username must NOT be an email
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })                      // Password must exist and not be falsy
    .isLength({ min: 8 })                              // Must be at least 8 characters
    .withMessage('Password must be 8 characters or more.'),
  //! firstName and lastName validators
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required'),       // POST /api/users endpoint
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required'),         // POST /api/users endpoint
  handleValidationErrors                          // Handle validation errors
];

// Sign Up a User
router.post('/', validateSignup, async (req, res) => {
  //! added firstName, lastName throughout
  const { email, password, username, firstName, lastName } = req.body;  // Extract user data

  try {
          const errors = {};

    // Manually check for existing email and username
    const existingEmail = await User.findOne({ where: { email } });
    const existingUsername = await User.findOne({ where: { username } });

    if (existingEmail) errors.email = 'User with that email already exists';
    if (existingUsername) errors.username = 'User with that username already exists';

    // If errors found, return them
    if (Object.keys(errors).length > 0) {
      return res.status(500).json({
        message: 'User already exists',
        errors
      });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password);  // Create secure hash

    // Create a new user
    const user = await User.create({ email, username, hashedPassword, firstName, lastName });  // Save to DB

    // Create a safe user object (without hashedPassword)
    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName
    };

    // Set the JWT cookie
    await setTokenCookie(res, safeUser);           // Login the new user automatically

    // Return the user information
    return res.status(201).json({ user: safeUser });


  } catch (err) {
    // Pass any other errors to the default error handler
    return next(err);
  }
});


module.exports = router;                     // Export the router for use in other files
