const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
// Handle user registration
router.post('/register', async (req, res) => {
  try {

    // Hash the password using bcrypt
    // Create a new user instance with the hashed password
    // Save the user to the database
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    // Send a success response
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    // Handle registration errors
    if (error.code === 11000 && error.keyPattern && error.keyPattern.username === 1) {
      res.status(400).json({ message: 'Username is already taken' });
    } else {
      res.status(500).json({ message: 'An error occurred while registering user' });
    }
  }
});


// Handle user login
router.post('/login', async (req, res) => {
  try {
    // Extract username and password from the request body
    const { username, password } = req.body;
    // Find the user in the database
    const user = await User.findOne({ username });
    // If user doesn't exist or password doesn't match, return an error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ username: user.username }, '12345', { expiresIn: '1h' });

    // Send a success response with the token
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post('/process-nic', async (req, res) => {
  try {
    const nicNumber = req.body.nicNumber;

    if (nicNumber.length < 10) {
      return res.status(400).json({ message: 'Invalid NIC number' });
    }

    const year = '19' + nicNumber.substring(0, 2);
    const dayOfYear = parseInt(nicNumber.substring(2, 5), 10);
    const gender = dayOfYear < 500 ? 'Male' : 'Female';

    const birthdate = new Date(year, 0);
    birthdate.setDate(dayOfYear);

    res.json({
      birthdate: birthdate.toDateString(),
      gender,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




module.exports = router;
