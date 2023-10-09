const router = require('express').Router();
// eslint-disable-next-line import/no-extraneous-dependencies
const { celebrate, Joi } = require('celebrate');

const {
  getUserId,
  editProfileUserInfo,
} = require('../controllers/user');

router.get('/me', getUserId);
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().required().email(),
    }),
  }),
  editProfileUserInfo,
);

module.exports = router;
