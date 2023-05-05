const router = require('express').Router();
const { validateUserData, validateUserAvatar, validateUserId } = require('../utils/validate/userValidate');
const {
  getUserById, getCurrentUser, getUsers, updateUserInfo, updateUserAvatar,
} = require('../controllers/users');

router.get('/me', getCurrentUser);
router.get('/:userId', validateUserId, getUserById);
router.get('/', getUsers);
router.patch('/me', validateUserData, updateUserInfo);
router.patch('/me/avatar', validateUserAvatar, updateUserAvatar);

module.exports = router;
