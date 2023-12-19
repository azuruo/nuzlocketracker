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
    try {
      const team = await Team.findById(req.params.teamId);
      if (!team) {
        return res.status(404).json({ msg: 'Team not found' });
      }
      res.json(team);
    } catch (err) {
      res.status(500).send('Server error');
    }
  };

  exports.updateTeam = async (req, res) => {
    try {
      const team = await Team.findByIdAndUpdate(
        req.params.teamId,
        { $set: req.body },
        { new: true }
      );
      res.json(team);
    } catch (err) {
      res.status(500).send('Server error');
    }
  };

  exports.deleteTeam = async (req, res) => {
    try {
      await Team.findByIdAndRemove(req.params.teamId);
      res.json({ msg: 'Team deleted' });
    } catch (err) {
      res.status(500).send('Server error');
    }
  };