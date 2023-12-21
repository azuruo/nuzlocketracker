const mongoose = require('mongoose');

const pokemonBoxSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  pokemons: [
    {
      pokeapiId: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      nickname: String,
      level: {
        type: Number,
        required: false,
        default: 1,
      },
      nature: String,
      ability: String,
      moves: [String],
      sprite: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const PokemonBox = mongoose.model('PokemonBox', pokemonBoxSchema);

module.exports = PokemonBox;
