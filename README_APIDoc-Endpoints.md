# [title]

## Database Schema Design

![db-schema]

[db-schema]: ./images/airBnB-schema_smartt.png

## API Documentation

## All Endpoints that require authentication
https://rays-webnotes.netlify.app/23weekand24week/solution_lp_authenticate_me/bonus_steps_implementting_spots

### USER 

###  SPOTS 
- **GET** `/api/spots` – Get all spots  
- **GET** `/api/spots/current` – Get all spots owned by the current user  
- **GET** `/api/spots/:id` – Get details of a specific spot  
- **POST** `/api/spots` – Create a new spot  
- **POST** `/api/spots/:id/images` – Add an image to a spot  
- **PUT** `/api/spots/:id` – Edit a spot  
- **DELETE** `/api/spots/:id` – Delete a spot  
- **GET** `/api/spots` (with query filters) – Get spots with query filters  

### REVIEWS 
### BONUS-BOOKINGS 


## Package.json Script Descriptions
The following scripts are available in `package.json`:

- **`npm run sequelize`** – Runs the Sequelize CLI for database operations.
- **`npm run sequelize-cli`** – Alternative way to run Sequelize CLI commands.
- **`npm run start`** – Uses `per-env` to determine the correct start script based on `NODE_ENV`.
- **`npm run start:development`** – Starts the server in development mode using `nodemon`, which automatically restarts on file changes.
- **`npm run start:production`** – Starts the server in production mode using `node ./bin/www`.
- **`npm run build`** – Executes `psql-setup-script.js` to configure the database during deployment.
