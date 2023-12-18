const Team = require('../models/Team');

exports.getAllTeams = async (req, res) => {
    try {
      const teams = await Team.find({ userId: req.userId });
      res.json(teams);
    } catch (err) {
      res.status(500).send('Server error');
    }
  };

  exports.createTeam = async (req, res) => {
    try {
      const newTeam = new Team({ ...req.body, userId: req.userId });
      const team = await newTeam.save();
      res.status(201).json(team);
    } catch (err) {
      res.status(500).send('Server error');
    }
  };

exports.getTeamById = async (req, res) => {
  // Get a specific team
};

exports.updateTeam = async (req, res) => {
  // Update a specific team
};

exports.deleteTeam = async (req, res) => {
  // Delete a specific team
};