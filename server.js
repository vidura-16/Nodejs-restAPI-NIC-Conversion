const express = require('express');// Express framework for handling routes
const mongoose = require('mongoose'); // Mongoose for MongoDB interaction
const authRoutes = require('./routes/auth');// Import routes for authentication
const path = require('path'); // Path for working with file and directory paths

// Create an instance of the Express application
const app = express();
// Define the port for the server to listen on
const PORT = process.env.PORT || 3000;

app.use(express.json());
// Connect to the MongoDB database
mongoose.connect('mongodb+srv://admin:12345@jwaredb.uvbz9pf.mongodb.net/jwaredb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Define a secret key for JWT (JSON Web Tokens) authentication
const secretKey = '12345';
// Use the authentication routes defined in 'authRoutes.js'
app.use('/api/auth', authRoutes);


// Dashboard route with JWT verification middleware
app.use('/dashboard', (req, res, next) => {
  const token = req.headers['authorization'];
  // Verify the JWT token
  if (!token) {
    return res.status(403).json({ message: 'Token not provided' });
  }

  jwt.verify(token.replace('Bearer ', ''), secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  // Attach the user information from the token to the request object
    req.user = decoded.user;
    next();
  });
});

// Serve the frontend files from the 'frontend/frontend' directory
app.use(express.static(path.join(__dirname, 'frontend/frontend')));



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

