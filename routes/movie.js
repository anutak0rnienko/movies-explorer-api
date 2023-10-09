const router = require('express').Router();
// eslint-disable-next-line import/no-extraneous-dependencies
const { celebrate, Joi } = require('celebrate');

const { urlRegexPattern } = require('../utils/constants');
const {
  getMovie,
  addNewMovie,
  removeMovie,
} = require('../controllers/movie');

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      image: Joi.string().required().pattern(urlRegexPattern),
      description: Joi.string().required(),
      year: Joi.string().required(),
      trailerLink: Joi.string().required().pattern(urlRegexPattern),
      thumbnail: Joi.string().required().pattern(urlRegexPattern),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  addNewMovie,
);

router.get('/', getMovie);

router.delete(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().length(24).hex().required(),
    }),
  }),
  removeMovie,
);

module.exports = router;
