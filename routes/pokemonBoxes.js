const express = require('express');
const router = express.Router();
const pokemonBoxController = require('../controllers/pokemonBoxController');
const authMiddleware = require('../middleware/auth');

router.get('/userBox', authMiddleware, pokemonBoxController.getUserBox);
router.get('/', authMiddleware, pokemonBoxController.getAllBoxes);
router.post('/', authMiddleware, pokemonBoxController.createBox);
// router.get('/:boxId', authMiddleware, pokemonBoxController.getBoxById);
router.put('/:boxId', authMiddleware, pokemonBoxController.updateBox);
router.delete('/:boxId', authMiddleware, pokemonBoxController.deleteBox);
router.post(
  '/addPokemon',
  authMiddleware,
  pokemonBoxController.addPokemonToBox
);
router.delete(
  '/:boxId/:pokemonId',
  authMiddleware,
  pokemonBoxController.removePokemonFromBox
);

module.exports = router;
