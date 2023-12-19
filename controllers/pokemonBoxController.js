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
    const box = await PokemonBox.findById(req.params.boxId);
    if (!box) {
      return res.status(404).json({ msg: 'Box not found' });
    }
    res.json(box);
  } catch (err) {
    res.status(500).send('Server error');
  }
};


exports.updateBox = async (req, res) => {
  try {
    const box = await PokemonBox.findByIdAndUpdate(
      req.params.boxId,
      { $set: req.body },
      { new: true }
    );
    res.json(box);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.deleteBox = async (req, res) => {
  try {
    const box = await PokemonBox.findById(req.params.boxId);

    if (!box) {
      return res.status(404).json({ msg: 'Box not found' });
    }
    await box.remove();
    res.json({ msg: 'Box deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};