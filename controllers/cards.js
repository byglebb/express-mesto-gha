const Card = require('../models/card');
const {
  ERROR_DATA,
  ERROR_NOT_FOUND,
  ERROR_INTERNAL,
} = require('../errors/errors');

const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(ERROR_INTERNAL).send({ message: 'Произошла ошибка' }));
};
const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_DATA).send({ message: 'Переданы некорректные данные' });
      }
      res.status(ERROR_INTERNAL).send({ message: 'Произошла ошибка' });
    });
};
const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_NOT_FOUND).send({ message: 'Документ не найден' });
      }
      res.status(ERROR_INTERNAL).send({ message: 'Произошла ошибка' });
    });
};

const likeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_NOT_FOUND).send({ message: 'Документ не найден' });
      }
      res.status(ERROR_INTERNAL).send({ message: 'Произошла ошибка' });
    });
};

const dislikeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_NOT_FOUND).send({ message: 'Документ не найден' });
      }
      res.status(ERROR_INTERNAL).send({ message: 'Произошла ошибка' });
    });
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
