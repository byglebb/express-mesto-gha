/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routerUser = require('./routes/users');
const routerCard = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

// app.use((req, res, next) => {
//   req.user = {
//     _id: '63e3d4f3ac0f50c1bb34e310',
//   };

//   next();
// });

app.use('/users', routerUser);
app.use('/cards', routerCard);

app.get('*', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

app.listen(PORT, () => {
  console.log('Сервер запущен');
});
