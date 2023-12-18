const express = require('express');
const router = express.Router();
const pokemonBoxesController = require('../controllers/pokemonBoxesController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, pokemonBoxesController.getAllBoxes);
router.post('/', authMiddleware, pokemonBoxesController.createBox);
router.get('/:boxId', authMiddleware, pokemonBoxesController.getBoxById);
router.put('/:boxId', authMiddleware, pokemonBoxesController.updateBox);
router.delete('/:boxId', authMiddleware, pokemonBoxesController.deleteBox);

module.exports = router;