// const Team = require('../models/Team');

// exports.getAllTeams = async (req, res) => {
//     try {
//       const teams = await Team.find({ userId: req.userId });
//       res.json(teams);
//     } catch (err) {
//       res.status(500).send('Server error');
//     }
//   };

//   exports.createTeam = async (req, res) => {
//     try {
//       const newTeam = new Team({ ...req.body, userId: req.userId });
//       const team = await newTeam.save();
//       res.status(201).json(team);
//     } catch (err) {
//       res.status(500).send('Server error');
//     }
//   };

//   exports.getTeamById = async (req, res) => {
//     try {
//       const team = await Team.findOne({ _id: req.params.teamId, userId: req.userId });
//       if (!team) {
//         return res.status(404).json({ msg: 'Team not found or not authorized' });
//       }
//       res.json(team);
//     } catch (err) {
//       res.status(500).send('Server error');
//     }
//   };

//   exports.updateTeam = async (req, res) => {
//     try {
//       const team = await Team.findOneAndUpdate(
//         { _id: req.params.teamId, userId: req.userId },
//         { $set: req.body },
//         { new: true }
//       );
//       if (!team) {
//         return res.status(404).json({ msg: 'Team not found or not authorized' });
//       }
//       res.json(team);
//     } catch (err) {
//       res.status(500).send('Server error');
//     }
//   };
  

//   exports.deleteTeam = async (req, res) => {
//     try {
//       const team = await Team.findOne({ _id: req.params.teamId, userId: req.userId });
//       if (!team) {
//         return res.status(404).json({ msg: 'Team not found or not authorized' });
//       }
//       await team.remove();
//       res.json({ msg: 'Team deleted' });
//     } catch (err) {
//       res.status(500).send('Server error');
//     }
//   };

//   exports.addPokemonToTeam = async (req, res) => {
//     try {
//       const newPokemon = req.body;
  
//       // Check if the user's team is already full (assuming a maximum limit of 6 Pokémon per team)
//       const userTeam = await Team.findOne({ userId: req.userId });
//       if (userTeam.pokemons.length >= 6) {
//         return res.status(400).json({ msg: 'Team is full. Cannot add more Pokémon.' });
//       }
//       userTeam.pokemons.push(newPokemon);
//       await userTeam.save();
//       res.status(201).json({ msg: 'Pokémon added to the team successfully', team: userTeam });
//     } catch (err) {
//       res.status(500).send('Server error');
//     }
//   };