const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    default: "My Team"
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

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
