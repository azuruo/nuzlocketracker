const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
      // Check if the user already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // Create a new user
      user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
  
      await user.save();
  
      // Create a JWT token
      const payload = { userId: user._id };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(201).json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };

  exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      let user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }
  
      const payload = { userId: user._id };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };

exports.getProfile = async (req, res) => {
  // Get user profile
};

exports.updateProfile = async (req, res) => {
  // Update user profile
};