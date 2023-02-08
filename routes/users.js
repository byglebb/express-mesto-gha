// eslint-disable-next-line import/no-extraneous-dependencies
const router = require('express').Router();
// eslint-disable-next-line no-unused-vars
const User = require('../models/user');

const { getAllUsers, getUser, createUser } = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/:userId', getUser);
router.post('/', createUser);

module.exports = router;
