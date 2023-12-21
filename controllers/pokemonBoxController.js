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

// exports.getBoxById = async (req, res) => {
//   try {
//     const box = await PokemonBox.findOne({ _id: req.params.boxId, userId: req.userId });
//     if (!box) {
//       return res.status(404).json({ msg: 'Box not found or not authorized' });
//     }
//     res.json(box);
//   } catch (err) {
//     res.status(500).send('Server error');
//   }
// };


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

exports.addPokemonToBox = async (req, res) => {
  try {
    const newPokemon = req.body;
    // Use req.user._id as provided by the auth middleware
    let userBox = await PokemonBox.findOne({ userId: req.user._id });

    // If no box is found for the user, create a new one
    if (!userBox) {
      userBox = new PokemonBox({ userId: req.user._id, pokemons: [] });
      await userBox.save(); // Make sure to save the new box
    }

    // Check if the box is full
    if (userBox.pokemons.length >= 30) {
      return res.status(400).json({ msg: 'Box is full. Cannot add more Pokémon.' });
    }

    // Add the new Pokemon to the user's box
    userBox.pokemons.push(newPokemon);
    await userBox.save();

    res.status(201).json({ msg: 'Pokémon added to the box successfully', box: userBox });
  } catch (err) {
    console.error(err); // Log the error to the console
    res.status(500).json({ error: err.message }); // Send back a detailed error message
  }
};

exports.getUserBox = async (req, res) => {
  try {
      const userId = req.user._id; // Assuming you have the user's ID from the auth middleware
      const box = await PokemonBox.findOne({ userId: userId });

      if (!box) {
          return res.status(404).send('Box not found');
      }
      res.json(box.pokemons);
  } catch (error) {
      res.status(500).send('Server error');
  }
};