const PokemonBox = require('../models/PokemonBox');

exports.getAllBoxes = async (req, res) => {
  try {
    const boxes = await PokemonBox.find({ userId: req.userId });
    res.json(boxes);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.createBox = async (req, res) => {
  try {
    const newBox = new PokemonBox({ ...req.body, userId: req.userId });
    const box = await newBox.save();
    res.status(201).json(box);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.getBoxById = async (req, res) => {
  // Get a specific Pokémon box
};

exports.updateBox = async (req, res) => {
  // Update a specific Pokémon box
};

exports.deleteBox = async (req, res) => {
  // Delete a specific Pokémon box
};