const express = require('express');
require('express-async-errors');                // Automatically catch async errors
const morgan = require('morgan');               // HTTP request logger
const cors = require('cors');                   // Cross-Origin Resource Sharing
const csurf = require('csurf');                 // CSRF protection
const helmet = require('helmet');               // Security headers
const cookieParser = require('cookie-parser');  // Parse cookies in requests
const { ValidationError } = require("sequelize");  //! Import Sequelize's ValidationError class

const { environment } = require('./config');        // Import environment configuration
const isProduction = environment === 'production';  // Check if we're in production
//! ROUTES VARIABLE MOVED/REPOSITIONED TO BOTTOM
// const routes = require('./routes');                 // Import routes


const app = express();                              // Create Express application

// Connect morgan middleware for logging HTTP requests
app.use(morgan('dev'));

// Parse cookies and JSON bodies
app.use(cookieParser());
app.use(express.json());

// Security middleware
if (!isProduction) {
  // Enable CORS only in development
  // In production, frontend and backend should be on same domain
  app.use(cors());
}

// Helmet helps set security headers
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin"                  // Allow resources to be shared cross-origin
  })
);

// Enable CORS (Cross-Origin Resource Sharing) only in development
if (!isProduction) {
  app.use(cors());
}

// Set the _csrf token and create req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,                 // HTTPS only in production
      sameSite: isProduction && "Lax",      // Controls when cookies are sent with cross-site requests
      httpOnly: true                        // Prevents JavaScript access to cookies
    }
  })
);

//! CSRF restoration route
app.get('/csrf/restore', (req, res) => {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.status(200).json({});
});

// Test code, move-to/place above app.use(routes)
// app.get('/ping', (req, res) => {
//   res.send('pong');
// });

// Connect routes
const routes = require('./routes');                 // Import routes


app.use(routes);

//! ================   ERROR HANDLING MIDDLEWARE ===============
//! Resource Not Found Error-Handler
// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {                   // Regular middleware with 3 parameters
  const err = new Error("The requested resource couldn't be found.");  // Create new Error object
  err.title = "Resource Not Found";               // Add custom title property
  err.errors = { message: "The requested resource couldn't be found." };  // Add structured errors object
  err.status = 404;                              // Set HTTP status code to 404 Not Found
  next(err);                                     // Pass error to next error handler
});

//! Sequelize Error-Handler
// Process sequelize errors
app.use((err, _req, _res, next) => {                // Error middleware has 4 parameters
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {             // Check if error is from Sequelize validation
    let errors = {};
    for (let error of err.errors) {                 // Loop through each validation error
      errors[error.path] = error.message;           // Map field name to error message
    }
    err.title = 'Validation error';                 // Set error title
    err.errors = errors;                            // Replace errors with our formatted version
  }
  next(err);                                        // Pass to next error handler
});

//! Error Formatter Middleware
// Error formatter
app.use((err, _req, res, _next) => {                // Final error middleware
  res.status(err.status || 500);                    // Set HTTP status code (default to 500)
  console.error(err);                               // Log error to server console
  res.json({                                        // Send JSON response with error details
    title: err.title || 'Server Error',             // Use custom title or default
    message: err.message,                           // Original error message
    errors: err.errors,                             // Field-specific errors object
    stack: isProduction ? null : err.stack          // Only include stack trace in development
  });
});


module.exports = app;
