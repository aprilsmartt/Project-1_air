'use strict';

// External libraries
const express = require('express');          // Import Express
const bcrypt = require('bcryptjs');              // For password hashing
const { check } = require('express-validator');  // Validation library
const { UniqueConstraintError } = require('sequelize');

// Internal utilities 
const { requireAuth, restoreUser } = require('../../utils/auth');  // Auth utilities
const { handleValidationErrors } = require('../../utils/validation');  // Validation handler

// Models
const { Review, Spot, ReviewImage, User } = require('../../db/models');     // User model

const router = express.Router();             // Create a router instance

// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.use(restoreUser);

//! ADDED Validation check for Reviews
const validateReview = [
  check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review text is required'),

  check('stars')
    .exists({ checkFalsy: true })
    .isInt({ min: 1, max: 5 })
    .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
];

//! TESTS =====================================================================================
// //! Add middleware to connect to "session"
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
//! ====================================== end of TESTS ======================================


// Get all Reviews of the Current User ========================================================
router.get('/current', requireAuth, async (req, res) => {
  const userId = req.user.id;

  const reviews = await Review.findAll({
    where: { userId },
    include: [
      {
        model: User,
        as: "user",
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: Spot,
        as: "spot",
        attributes: {
          exclude: ['description', 'createdAt', 'updatedAt']
        }
      },
      {
        model: ReviewImage,
        as: "reviewImages",
        attributes: ['id', 'url']
      }
    ]
  });

  return res.json({ Reviews: reviews });
});

// Create a Review for a Spot based on the Spot's id ==========================================
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {
  try {
    const { spotId } = req.params;
    const { review, stars } = req.body;
    const userId = req.user.id;

    // Check if spot exists
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found"
      });
    }

    // Check if user has already reviewed this spot
    const existingReview = await Review.findOne({
      where: {
        spotId,
        userId
      }
    });

    if (existingReview) {
      return res.status(403).json({
        message: "User already has a review for this spot"
      });
    }

    // Create and return the new review
    const newReview = await Review.create({
      userId,
      spotId,
      review,
      stars
    });

    // Fetch the newly created review with associated User
    const response = await Review.findByPk(newReview.id, {
      include: {
        model: User,
        as: "user",
        attributes: ['id', 'firstName', 'lastName']
      }
    });

    // Return the response with review details
    res.status(201).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Something went wrong while creating the review.",
      error: err.message
    });
  }
});


module.exports = router;                        // Export the router for use in other files