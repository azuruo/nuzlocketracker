const express = require('express');
const router = express.Router();
const teamsController = require('../controllers/teamsController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, teamsController.getAllTeams);
router.post('/', authMiddleware, teamsController.createTeam);
router.get('/:teamId', authMiddleware, teamsController.getTeamById);
router.put('/:teamId', authMiddleware, teamsController.updateTeam);
router.delete('/:teamId', authMiddleware, teamsController.deleteTeam);
router.post('/addPokemon', authMiddleware, teamsController.addPokemonToTeam);

module.exports = router;