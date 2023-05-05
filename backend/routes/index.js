const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');

const { login, createUser } = require('../controllers/users');
const { validateLogin, validateRegister } = require('../utils/validate/userValidate');
const auth = require('../middlewares/auth');

const { NOT_FOUND } = require('../utils/errors');

router.post('/signin', validateLogin, login);
router.post('/signup', validateRegister, createUser);

router.use(auth);

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: 'Данная страница не существует' });
});

module.exports = router;
