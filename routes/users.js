// eslint-disable-next-line import/no-extraneous-dependencies
const router = require('express').Router();
// eslint-disable-next-line no-unused-vars
const User = require('../models/user');

const {
  getAllUsers,
  getUser,
  updateUser,
  updateAvatar,
  getUserInfo,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/:userId', getUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);
router.get('/me', getUserInfo);

module.exports = router;
