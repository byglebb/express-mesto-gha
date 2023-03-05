// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs');
// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
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
    .orFail(new Error('NotValidId'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_DATA).send({ message: 'Переданы некорректные данные' });
      } else if (err.message === 'NotValidId') {
        res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь не найден' });
      }
      res.status(ERROR_INTERNAL).send({ message: 'Произошла ошибка' });
    });
};

const createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash({ password }, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
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
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if ((err.name === 'ValidationError') || (err.name === 'CastError')) {
        res.status(ERROR_DATA).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(ERROR_INTERNAL).send({ message: 'Произошла ошибка' });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if ((err.name === 'ValidationError') || (err.name === 'CastError')) {
        res.status(ERROR_DATA).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(ERROR_INTERNAL).send({ message: 'Произошла ошибка' });
      }
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

const getUserInfo = (req, res) => {
  User.findById(req.user._id)
    .orFail(new Error('NotValidId'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_DATA).send({ message: 'Переданы некорректные данные' });
      } else if (err.message === 'NotValidId') {
        res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь не найден' });
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
  login,
  getUserInfo,
};
