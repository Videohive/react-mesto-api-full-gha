const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');

const { login, createUser } = require('../controllers/users');
const { validateLogin, validateRegister } = require('../utils/validate/userValidate');
const auth = require('../middlewares/auth');

const NotFoundError = require('../errors/NotFoundError');

router.post('/signin', validateLogin, login);
router.post('/signup', validateRegister, createUser);

router.use(auth);

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use((req, res, next) => {
  const newError = new NotFoundError('Данная страница не существует');
  next(newError);
});

module.exports = router;
