const express = require('express');          // Import Express
const bcrypt = require('bcryptjs');              // For password hashing

const { setTokenCookie, requireAuth } = require('../../utils/auth');  // Auth utilities
const { User } = require('../../db/models');     // User model

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();             // Create a router instance

//! ADDED Validation check for firstName and lastName
const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })                      // Email must exist and not be falsy
    .isEmail()                                         // Must be valid email format
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })                      // Username must exist and not be falsy
    .isLength({ min: 4 })                              // Must be at least 4 characters
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()                                             // Username must NOT...
    .isEmail()                                         // ...be an email
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })                      // Password must exist and not be falsy
    .isLength({ min: 6 })                              // Must be at least 6 characters
    .withMessage('Password must be 6 characters or more.'),
  //! firstName and lastName validators
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a first name.'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a last name.'),
  handleValidationErrors                               // Process validation results
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
