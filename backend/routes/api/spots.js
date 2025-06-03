'use strict';

// External libraries
const express = require('express');          // Import Express
const bcrypt = require('bcryptjs');              // For password hashing
const { check, validationResult } = require('express-validator');  // Validation library
const { UniqueConstraintError } = require('sequelize');

// Internal utilities 
const { setTokenCookie, requireAuth } = require('../../utils/auth');  // Auth utilities
const { handleValidationErrors } = require('../../utils/validation');  // Validation handler

// Models
const { Spot, User, Review, SpotImage, ReviewImage, sequelize } = require('../../db/models');

const router = express.Router();             // Create a router instance

// Validation middleware for review
const validateReview = [
  check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review text is required'),

  check('stars')
    .exists({ checkFalsy: true })
    .isInt({ min: 1, max: 5 })
    .withMessage('Stars must be an integer from 1 to 5'),

  // Handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation error",
        errors: errors.array(),
      });
    }
    next();
  },
];


//! ==================================== HELPER FUNCTONS =====================================
// Helper function to format spot data ========================================================
const formatSpotData = (spot) => {
  const previewImage = spot.spotImages.length > 0 ? spot.spotImages[0].url : null;
  // const previewImage = Array.isArray(spot.SpotImages) && spot.SpotImages.length > 0
  // ? spot.SpotImages[0].url
  // : null;

  //! const avgRating = spot.get('avgRating') || 0;  // Default to 0 if no reviews

  const rawAvgRating = spot.get('avgRating');
  let avgRating;
  if (rawAvgRating === null || isNaN(rawAvgRating)) {
    avgRating = "This property has no reviews.";
    // avgRating = "New";

  } else {
    avgRating = parseFloat(Number(rawAvgRating).toFixed(1));
  }

  return {
    id: spot.id,
    owner: spot.owner,
    ownerId: spot.ownerId,
    ownerFirstName: spot.owner ? spot.owner.firstName : null,
    ownerLastName: spot.owner ? spot.owner.lastName : null,
    address: spot.address,
    city: spot.city,
    state: spot.state,
    country: spot.country,
    lat: spot.lat,
    lng: spot.lng,
    name: spot.name,
    description: spot.description,
    price: spot.price,
    createdAt: spot.createdAt,
    updatedAt: spot.updatedAt,
    //! avgRating: parseFloat(avgRating.toFixed(1)),
    avgRating,
    previewImage,
    spotImages: spot.spotImages  // <-- Add this line to keep all spot images
    // previewImage: spot.spotImages?.[0]?.url || null
    // SpotImages: spot.SpotImages              
  };
};

// Helper function to fetch spots with reviews and preview image ==============================
const fetchSpots = async (whereClause) => {
  return await Spot.findAll({
    where: whereClause,
    include: [
      {
        model: Review,
        as: 'reviews',
        attributes: ['stars'],  // Only need to access stars for avgRating
      },
      {
        model: SpotImage,
        as: 'spotImages',
        where: { preview: true },
        attributes: ['url'],
        required: false  // Allow spots with no preview image
      },
      {
        model: User,
        as: 'owner',
        attributes: ['firstName', 'lastName']
      }

    ],
    attributes: [
      'id',
      'name',
      'ownerId',
      'address',
      'city',
      'state',
      'country',
      'lat',
      'lng',
      'price',
      'createdAt',
      'updatedAt',
      [
        sequelize.fn('AVG', sequelize.col('reviews.stars')),  // Calculate avg rating from reviews
        'avgRating'
      ]
    ],
    // group: ['Spot.id', 'spotImages.id', 'owner.id'],
    group: ['Spot.id', 'spotImages.url', 'owner.id'],

    // Group by Spot id to ensure the avgRating works correctly
  });
};
//! ================================ end of HELPER FUNCTONS ================================


// Get all Spots ==============================================================================
router.get('/', async (req, res, next) => {
  try {
    const spots = await fetchSpots({});  // No filter, get all spots

    if (spots.length === 0) {
      return res.status(404).json({ message: "No spots found" });
    }
    // Format the data for each spot
    const formattedSpots = spots.map(formatSpotData);

    // Return the formatted spots as a JSON response
    return res.json(formattedSpots);

  } catch (error) {
    next(error);  // Pass any errors to the error handler
  }
});

// router.get('/', async (req, res, next) => {
//   try {
//     const spots = await Spot.findAll({
//       include: {
//         model: User,
//         as: 'owner',
//         attributes: ['firstName', 'lastName'] // Only include these fields
//       }
//     });

//     return res.json(spots);
//   } catch (error) {
//     next(error);
//   }
// });


// // OTHER GET all Spots
// router.get('/', async (req,res, err) => {
//     const spots = await Spot.findAll({
//         include:[
//         {
//             model: Review, as: 'reviews',
//             attributes: ['stars']
//         },{
//             model: SpotImage, as: spotImages,
//             attributes: ['url', 'preview']
//         }
//     ]
//     })

//     let spotsList = [];

//     // Push each spot into spotsList
//     spots.forEach((spot) => {
//         spotsList.push(spot.toJSON());
//     });

//     const formattedSpots = spotsList.map((spot) => {
//         // Calculate average rating
//         let totalStars = 0;
//         let reviewCount = 0;
//         spot.Reviews.forEach((review) => {
//             totalStars += review.stars;
//             reviewCount++;
//         });

//         if (reviewCount > 0) {
//             spot.avgRating = parseFloat((totalStars / reviewCount).toFixed(1));
//         } else {
//             spot.avgRating = null;
//         }
//         delete spot.Reviews; // Remove Reviews after processing avgRating

//         // Calculate preview image
//         spot.SpotImages.forEach((image) => {
//             if (image.preview === true) {
//                 spot.previewImage = image.url;
//             }
//         });
//         if (!spot.previewImage) {
//             spot.previewImage = 'No preview image available';
//         }
//         delete spot.SpotImages; // Remove SpotImages after processing previewImage

//         return spot;
//     })
//     res.json({ Spots: formattedSpots }); 
// })


// Get all Spots owned by the Current User ====================================================
router.get('/current', requireAuth, async (req, res, next) => {
  try {
    const userId = req.user.id;

    const spots = await fetchSpots({ ownerId: userId });

    // Format the data for each spot
    const formattedSpots = spots.map(formatSpotData);

    // If no spots are found, return a 404 error
    if (formattedSpots.length === 0) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    // Return the formatted spots as a JSON response
    return res.json(formattedSpots);
  } catch (error) {
    next(error);  // Pass any errors to the error handler
  }
});


// Get details of a Spot from an Id ===========================================================
router.get('/:spotId', async (req, res) => {
  const { spotId } = req.params;  // Get spotId from query parameter

  // Find the spot by id
  // const spot = await Spot.findByPk(req.params.spotId, {
    const spot = await Spot.findOne({
        where : {id: spotId},
        include: [
            {
                model: User,
                as: 'owner',  // Alias must match frontend's Owner casing
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: SpotImage ,
                as: 'spotImages',
                attributes: ['id', 'url', 'preview']
            },
            {
                model: Review,
                as: 'reviews',
                attributes: ['stars']
            },
        ]
    })

  // If spot not found, return 404
  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

  // Calculate numReviews and avgStarRating
  // Get all reviews for the spot
  const reviews = await Review.findAll({
    where: { spotId },
    attributes: ['stars']
  });

  let totalStars = 0;
  let numReviews = reviews.length;

  for (let i = 0; i < reviews.length; i++) {
    totalStars += reviews[i].stars;
  }

  let avgStarRating = 0;
  if (numReviews > 0) {
    avgStarRating = parseFloat((totalStars / numReviews).toFixed(1));
  }

console.log(spot.toJSON()); // 🪵 log what Sequelize returns

  const formattedSpot = formatSpotData(spot)
  res.json(formattedSpot);
});

// Creaate a Spot ============================================================================
// Validation middleware for creating a spot
const validateSpot = [
  check('address')
    .notEmpty().withMessage('Street address is required'),
  check('city')
    .notEmpty().withMessage('City is required'),
  check('state')
    .notEmpty().withMessage('State is required'),
  check('country')
    .notEmpty().withMessage('Country is required'),
  check('lat')
    .notEmpty().withMessage('Latitude is required')
    .isDecimal().withMessage('Latitude must be a decimal value')
    .custom((value) => value >= -90 && value <= 90)
    .withMessage('Latitude must be within -90 and 90'),
  check('lng')
    .notEmpty().withMessage('Longitude is required')
    .isDecimal().withMessage('Longitude must be a decimal value')
    .custom((value) => value >= -180 && value <= 180)
    .withMessage('Longitude must be within -180 and 180'),
  check('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 50 }).withMessage('Name must be less than 50 characters'),
  check('description')
    .notEmpty().withMessage('Description is required'),
  check('price')
    .notEmpty().withMessage('Price is required')
    .isFloat({ min: 0 }).withMessage('Price per day is required'),
  handleValidationErrors
];

// Variable to store abbreviations for states
const stateAbbreviations = {
  'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR',
  'California': 'CA', 'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE',
  'Florida': 'FL', 'Georgia': 'GA', 'Hawaii': 'HI', 'Idaho': 'ID',
  'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA', 'Kansas': 'KS',
  'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
  'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS',
  'Missouri': 'MO', 'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV',
  'New Hampshire': 'NH', 'New Jersey': 'NJ', 'New Mexico': 'NM', 'New York': 'NY',
  'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH', 'Oklahoma': 'OK',
  'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
  'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT',
  'Vermont': 'VT', 'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV',
  'Wisconsin': 'WI', 'Wyoming': 'WY'
};

// Route to create a new Spot
router.post('/', requireAuth, validateSpot, async (req, res, next) => {
  try {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    // Convert full state name to abbreviation if it exists in our map
    // If the state is already abbreviated or not found, use it as-is
    const abbreviatedState = stateAbbreviations[state] || state;

    // If the country is 'United States', change it to 'USA'
    const abbreviatedCountry = country === 'United States' ? 'USA' : country;

    // Create new spot in the database with current user as the owner
    const newSpot = await Spot.create({
      ownerId: req.user.id,  // from requireAuth
      address,
      city,
      state: abbreviatedState,
      country: abbreviatedCountry,
      lat,
      lng,
      name,
      description,
      price
    });

    res.status(201).json(newSpot);
  } catch (err) {
    next(err);
  }
});

// Edit a Spot ================================================================================
router.put('/:spotId', requireAuth, async (req, res, next) => {
  const { spotId } = req.params;
  const {
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
  } = req.body;

  try {
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      const err = new Error("Spot couldn't be found");
      err.status = 404;
      return next(err);
    }

    // Only allow the owner to edit
    if (spot.ownerId !== req.user.id) {
      const err = new Error('Forbidden');
      err.status = 403;
      return next(err);
    }

    // Update fields
    spot.address = address;
    spot.city = city;
    spot.state = state === 'United States' ? 'USA' : state;
    spot.country = country === 'United States' ? 'USA' : country;
    spot.lat = lat;
    spot.lng = lng;
    spot.name = name;
    spot.description = description;
    spot.price = price;

    await spot.save();

    return res.json(spot);
  } catch (err) {
    next(err);
  }
});

// Add an Image to a Spot based on the Spot's id ==============================================
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
  const { spotId } = req.params;
  const { url, preview } = req.body;
  const userId = req.user.id;

  try {
    // Find the spot by ID
    const spot = await Spot.findByPk(spotId);

    // If spot doesn't exist
    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found"
      });
    }

    // Only allow owner to add images
    if (spot.ownerId !== req.user.id) {
      return res.status(403).json({
        message: "Forbidden"
      });
    }

    // Create the image
    const newImage = await SpotImage.create({
      spotId: spot.id,
      url,
      preview
    });

    // Return the image with limited fields
    return res.status(201).json({
      id: newImage.id,
      url: newImage.url,
      preview: newImage.preview
    });

  } catch (err) {
    next(err); // Let the global error handler take care of it
  }
});

// Delete a Spot ==============================================================================
// router.delete('/:spotId/images/:imageId', async (req, res) => {
// Delete a Spot ======================================================================
router.delete('/:spotId', requireAuth, async (req, res, next) => {
  try {
    const { spotId } = req.params;
    const userId = req.user.id;

    // Find the spot by ID
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    // Only the owner can delete the spot
    if (spot.ownerId !== userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // Delete the spot
    await spot.destroy();

    return res.json({ message: 'Successfully deleted' });
  } catch (err) {
    next(err);
  }
});

// Get all Reviews by a Spot's id =============================================================
router.get('/:spotId/reviews', async (req, res) => {
  const { spotId } = req.params;

  // Check if the spot exists
  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found"
    });
  }

  // Find all reviews for the spot
  const reviews = await Review.findAll({
    where: { spotId },
    include: [
      {
        model: User,
        as: "user",
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: ReviewImage,
        as: "reviewImages",
        attributes: ['id', 'url']
      }
    ]
  });

  // Reorder keys to have userId before spotId
  const formattedReviews = reviews.map(review => {
    const {
      id,
      userId,
      spotId,
      review: reviewText,
      stars,
      createdAt,
      updatedAt,
      user,
      reviewImages
    } = review.toJSON(); // ensure plain object

    return {
      id,
      userId,
      spotId,
      review: reviewText,
      stars,
      createdAt,
      updatedAt,
      user,
      reviewImages
    };
  });

  res.json({ Reviews: formattedReviews });
});

// Create Review for a Spot ===================================================================
router.post('/:spotId/reviews', validateReview, async (req, res) => {
  const { spotId } = req.params; // Get the spotId from URL params
  const { review, stars } = req.body; // Get the review data from the body
  const userId = req.user.id; // Assume user is authenticated and their ID is available in req.user.id

  try {
    // Check if spot exists
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found"
      });
    }

    // Check if the user already has a review for this spot
    const existingReview = await Review.findOne({
      where: { spotId, userId }
    });
    if (existingReview) {
      return res.status(500).json({
        message: "User already has a review for this spot"
      });
    }

    // Create the new review
    const newReview = await Review.create({
      userId,
      spotId,
      review,
      stars
    });

    // Fetch the new review with associated User data
    const response = await Review.findByPk(newReview.id, {
      include: {
        model: User,
        as: "user",
        attributes: ['id', 'firstName', 'lastName']
      }
    });

    // Format the response with the required fields only
    const formattedResponse = {
      id: newReview.id,
      userId: newReview.userId,
      spotId: newReview.spotId,
      review: newReview.review,
      stars: newReview.stars,
      createdAt: newReview.createdAt,
      updatedAt: newReview.updatedAt
    };

    // Respond with the new review data
    res.status(201).json(formattedResponse);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Something went wrong while creating the review.",
      error: err.message
    });
  }
});


module.exports = router;