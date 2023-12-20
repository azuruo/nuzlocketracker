require('dotenv').config();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    // Check if the user already exists
    const foundUser = await User.findOne({ email: req.body.email });
    if (foundUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password directly in the controller
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create the user with the hashed password
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();

    // Create a JWT token
    const payload = {
      _id: user._id,
      username: user.username,
      email: user.email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    return res.status(201).json({ token });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // Compare the password directly in the controller
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const payload = {
      _id: user._id,
      username: user.username,
      email: user.email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      { $set: req.body },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.verify = async (req, res) => {
  try {
    const { user } = req;
    const foundUser = await User.findOne({
      email: user.email,
      _id: user._id,
    }).select('-password');
    if (!foundUser) {
      return res.status(500).json({
        message: 'User not found!',
      });
    }
    const payload = {
      _id: user._id,
      username: user.username,
      email: user.email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    return res.status(200).json({ token, user: foundUser });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
};
