const express = require('express');
const router = express.Router();               // Create main router
const apiRouter = require('./api');            // Import the API router

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

// Static routes
// Serve React build files in production
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  // Serve the frontend's index.html file at the root route
  router.get('/', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, '../../frontend', 'dist', 'index.html')
    );
  });

  // Serve the static assets in the frontend's build folder
  router.use(express.static(path.resolve("../frontend/dist")));

  // Serve the frontend's index.html file at all other routes NOT starting with /api
  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, '../../frontend', 'dist', 'index.html')
    );
  });
}

// Add a XSRF-TOKEN cookie in development
if (process.env.NODE_ENV !== 'production') {
  router.get('/api/csrf/restore', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.json({});
  });
}



module.exports = router;                      // Export the main router
