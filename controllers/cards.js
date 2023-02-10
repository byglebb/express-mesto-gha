const Card = require('../models/card');

const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
const createCard = (req, res) => {
  const { name, link } = req.body;
  console.log(req.user._id); // _id станет доступен
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
const deleteCard = (req, res) => {
  const { cardId } = req.body;
  Card.findByIdAndRemove({ cardId })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
};
