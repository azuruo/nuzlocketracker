const PokemonBox = require('../models/PokemonBox');
const { getPokeApiPokemonSprite } = require('../utils/pokeApiUtils');

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
    const box = await PokemonBox.findOne({
      _id: req.params.boxId,
      userId: req.userId,
    });
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
      return res
        .status(400)
        .json({ msg: 'Box is full. Cannot add more Pokémon.' });
    }

    // Add the new Pokemon to the user's box
    userBox.pokemons.push({
      ...newPokemon,
      sprite: getPokeApiPokemonSprite(newPokemon.pokeapiId),
    });
    await userBox.save();

    res
      .status(201)
      .json({ msg: 'Pokémon added to the box successfully', box: userBox });
  } catch (err) {
    console.error(err); // Log the error to the console
    res.status(500).json({ error: err.message }); // Send back a detailed error message
  }
};

exports.removePokemonFromBox = async (req, res) => {
  try {
    const { pokemonId, boxId } = req.params;
    const userBox = await PokemonBox.findOne({
      _id: boxId,
      userId: req.user._id,
    });

    // If no box is found for the user
    if (!userBox) {
      return res.status(404).json({ msg: 'Box not found' });
    }

    // Find the index of the pokemon to remove
    const pokemonIndex = userBox.pokemons.findIndex(
      (pokemon) => pokemon._id.toString() === pokemonId
    );

    // If the pokemon is not found in the box
    if (pokemonIndex === -1) {
      return res.status(404).json({ msg: 'Pokémon not found in the box' });
    }

    // Remove the pokemon from the box
    userBox.pokemons.splice(pokemonIndex, 1);

    // Save the updated box
    await userBox.save();

    return res
      .status(200)
      .json({ msg: 'Pokémon removed from the box successfully', box: userBox });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
exports.getUserBox = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have the user's ID from the auth middleware
    let box = await PokemonBox.findOne({ userId: userId });

    if (!box) {
      // return res.status(404).send('Box not found');
      box = await PokemonBox.create({ userId: userId, pokemons: [] });
    }
    return res.status(200).json(box);
  } catch (error) {
    return res.status(500).send('Server error');
  }
};
