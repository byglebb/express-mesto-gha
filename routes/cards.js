// eslint-disable-next-line import/no-extraneous-dependencies
const router = require('express').Router();
// eslint-disable-next-line no-unused-vars
const Card = require('../models/card');

const { getAllCards, createCard, deleteCard } = require('../controllers/cards');

router.get('/', getAllCards);
router.post('/', createCard);
router.delete('/:userId', deleteCard);

module.exports = router;
