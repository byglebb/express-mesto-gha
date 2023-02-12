const User = require('../models/user');
const {
  ERROR_DATA,
  ERROR_NOT_FOUND,
  ERROR_INTERNAL,
} = require('../errors/errors');

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(ERROR_INTERNAL).send({ message: 'Произошла ошибка' }));
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_NOT_FOUND).send({ message: 'Документ не найден' });
      }
      res.status(ERROR_INTERNAL).send({ message: 'Произошла ошибка' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_DATA).send({ message: 'Переданы некорректные данные' });
      }
      res.status(ERROR_INTERNAL).send({ message: 'Произошла ошибка' });
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_DATA).send({ message: 'Переданы некорректные данные' });
      } else if (err.name === 'CastError') {
        res.status(ERROR_NOT_FOUND).send({ message: 'Документ не найден' });
      }
      res.status(ERROR_INTERNAL).send({ message: 'Произошла ошибка' });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_DATA).send({ message: 'Переданы некорректные данные' });
      } else if (err.name === 'CastError') {
        res.status(ERROR_NOT_FOUND).send({ message: 'Документ не найден' });
      }
      res.status(ERROR_INTERNAL).send({ message: 'Произошла ошибка' });
    });
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};
