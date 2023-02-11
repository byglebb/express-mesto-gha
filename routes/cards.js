// eslint-disable-next-line import/no-extraneous-dependencies
const router = require('express').Router();
// eslint-disable-next-line no-unused-vars
const Card = require('../models/card');

const {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getAllCards);
router.post('/', createCard);
router.delete('/:userId', deleteCard);
router.put(':cardId/likes', likeCard);
router.delete(':cardId/likes', dislikeCard);

module.exports = router;
