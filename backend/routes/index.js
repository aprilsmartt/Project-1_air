const express = require('express');
const router = express.Router();               // Create main router
const apiRouter = require('./api');            // Import the API router

//! TEST TO CHECK VIEW THE SCHEMA ON RENDER
router.get('/check-schema', async (req, res) => {
  try {
    const result = await sequelize.query(
      `SELECT schema_name FROM information_schema.schemata WHERE schema_name = :schemaName`,
      {
        replacements: { schemaName: process.env.SCHEMA },
        type: sequelize.QueryTypes.SELECT
      }
    );
    res.json({ exists: result.length > 0, result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

// //! Can comment out this test route
// // Test route - serves as a health check and sets CSRF token
// router.get('/hello/world', function(req, res) {
//   res.cookie('XSRF-TOKEN', req.csrfToken());  // Set CSRF token in cookie for frontend
//   res.send('Hello World!');                    // Simple response to confirm server works
// });

// Add a XSRF-TOKEN cookie
//! This route restores the CSRF token
router.get("/api/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);         // Set token in cookie
  res.status(200).json({
    'XSRF-Token': csrfToken                    // Also return token in JSON response
  });
});

// Connect the API router - all routes in apiRouter will be prefixed with '/api'
router.use('/api', apiRouter);                // Mount the API router under the /api path

module.exports = router;                      // Export the main router
