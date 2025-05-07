'use strict';

// const express = require('express');
// const { Spot, User, Review, SpotImage, sequelize } = require('../../db/models');
// const { requireAuth } = require('../../utils/auth');

// const router = express.Router();


const express = require('express');
const bcrypt = require('bcryptjs');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, ReviewImage, Booking, Review, Spot, SpotImage } = require('../../db/models');
const {Op} = require('sequelize')

const router = express.Router();


// Helper function to format spot data
const formatSpotData = (spot) => {
  const previewImage = spot.spotImages.length > 0 ? spot.spotImages[0].url : null;
  const avgRating = spot.get('avgRating') || 0;  // Default to 0 if no reviews
  return {
    id: spot.id,
    ownerId: spot.ownerId,
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
    avgRating: parseFloat(avgRating.toFixed(1)),
    previewImage
  };
};

// Helper function to fetch spots with reviews and preview image
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
    group: ['Spot.id'],  // Group by Spot id to ensure the avgRating works correctly
  });
};


// GET all Spots
router.get('/', async (req, res, next) => {
  try {
    const spots = await fetchSpots({});  // No filter, get all spots

    // Format the data for each spot
    const formattedSpots = spots.map(formatSpotData);

    // If no spots are found, return a 404 error
    if (formattedSpots.length === 0) {
      return res.status(404).json({ message: 'No spots found' });
    }

    // Return the formatted spots as a JSON response
    return res.json(formattedSpots);
  } catch (error) {
    next(error);  // Pass any errors to the error handler
  }
});


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





// GET all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res, next) => {
  try {
    const userId = req.user.id;

    const spots = await fetchSpots({ ownerId: userId });

    // Format the data for each spot
    const formattedSpots = spots.map(formatSpotData);

    // If no spots are found, return a 404 error
    if (formattedSpots.length === 0) {
      return res.status(404).json({ message: 'No spots found' });
    }

    // Return the formatted spots as a JSON response
    return res.json(formattedSpots);
  } catch (error) {
    next(error);  // Pass any errors to the error handler
  }
});


// GET details of a Spot from an id
router.get('/:spotId', async (req, res) => {
  const { spotId } = req.params;  // Get spotId from query parameter

  const parsedSpotId = isNaN(Number(spotId)) ? null : Number(spotId);

  if (isNaN(parsedSpotId)) {
    return res.status(400).json({ message: 'Invalid spotId format' });
  }

  // Find the spot by id
  const spot = await Spot.findOne({
    where: { id: spotId },
    include: [
      {
        model: SpotImage,
        attributes: ['id', 'url', 'preview']
      },
      {
        model: User,
        as: 'Owner',
        attributes: ['id', 'firstName', 'lastName']
      }
    ]
  });
  
  // const spot = await Spot.findByPk(spotId, {
  //   include: [
  //     { 
  //       model: SpotImage, 
  //       attributes: ['id', 'url', 'preview'] },
  //     { 
  //       model: User, 
  //       as: 'Owner', 
  //       attributes: ['id', 'firstName', 'lastName'] }
  //   ]
  // });

  // If spot not found, return 404
  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

  // Calculate numReviews and avgStarRating
  const reviews = await Review.findAll({
    where: { spotId }
  });

  const numReviews = reviews.length;
  const avgStarRating = numReviews > 0
    ? reviews.reduce((acc, review) => acc + review.stars, 0) / numReviews
    : 0;

  // Prepare the final response object
  const spotDetails = {
    ...spot.toJSON(),
    numReviews,
    avgStarRating: Number(avgStarRating.toFixed(1)) // one decimal place
  };

  res.json(spotDetails);

});



module.exports = router;
