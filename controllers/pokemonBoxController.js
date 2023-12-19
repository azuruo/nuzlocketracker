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
  try {
    const box = await PokemonBox.findOne({ _id: req.params.boxId, userId: req.userId });
    if (!box) {
      return res.status(404).json({ msg: 'Box not found or not authorized' });
    }
    res.json(box);
  } catch (err) {
    res.status(500).send('Server error');
  }
};


exports.updateBox = async (req, res) => {
  try {
    const box = await PokemonBox.findOneAndUpdate(
      { _id: req.params.boxId, userId: req.userId },
      { $set: req.body },
      { new: true }
    );
    if (!box) {
      return res.status(404).json({ msg: 'Box not found or not authorized' });
    }
    res.json(box);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.deleteBox = async (req, res) => {
  try {
    const box = await PokemonBox.findOne({ _id: req.params.boxId, userId: req.userId });
    if (!box) {
      return res.status(404).json({ msg: 'Box not found or not authorized' });
    }
    await box.remove();
    res.json({ msg: 'Box deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
};