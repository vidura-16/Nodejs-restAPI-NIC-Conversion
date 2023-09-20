# nic-conversion
 Nodejs-restAPI
# NIC Conversion REST API and Dashboard

This project implements a REST API for NIC (National Identity Card) conversion and a dashboard that allows users to convert NIC numbers to birthdates and genders.

## Features

- User registration and authentication.
- Secure conversion of NIC numbers.
- Dashboard interface for NIC conversion.
- MongoDB database for user data storage.

## Technologies Used

- Node.js: Backend server implementation.
- Express.js: Web application framework for routing.
- MongoDB: Database for user data storage.
- Mongoose: ODM (Object-Document Mapping) library for MongoDB.
- bcrypt: Password hashing for user authentication.
- JSON Web Tokens (JWT): Authentication mechanism.
- HTML/CSS/JavaScript: Frontend for user registration, login, and dashboard.

## Project Structure

- `models/user.js`: Defines the User schema and model for MongoDB.
- `routes/auth.js`: Defines API routes for user registration and login.
- `server.js`: Main server file for configuring routes and starting the server.
- `frontend/`: Directory containing frontend HTML, CSS, and JavaScript files.

## Usage

1. Clone this repository:


2. Install dependencies:


3. Configure the MongoDB connection in `server.js`.

4. Start the server:
   
5. Access the application:

- API: `http://localhost:3000/api/auth`
- Frontend: `http://localhost:3000`

## API Endpoints

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Authenticate and log in a user.
- `POST /api/auth/process-nic`: Convert an NIC number to birthdate and gender.

## Contributors

- [Vidura Vishwa](https://github.com/yVidura-16): Project Lead

## License

This project is licensed under the [MIT License](LICENSE).


