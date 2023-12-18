const mongoose = require('mongoose');

const pokemonBoxSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  pokemons: [{
    pokeapiId: {
      type: Number,
      required: true
    },
    nickname: String,
    level: Number,
    nature: String,
    ability: String,
    moves: [String]
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const PokemonBox = mongoose.model('PokemonBox', pokemonBoxSchema);

module.exports = PokemonBox;
