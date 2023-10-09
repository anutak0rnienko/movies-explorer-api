const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;
const { urlRegexPattern } = require('../utils/constants');

const movieSchema = new Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (url) => urlRegexPattern.test(url),
      message: 'Укадите корректную ссылку на картинку',
    },
  },
  trailerLink: {
    required: true,
    type: String,
    validate: {
      validator: (url) => urlRegexPattern.test(url),
      message: 'Некорректно введен URL',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (url) => urlRegexPattern.test(url),
      message: 'Некорректно введен URL',
    },
  },
  owner: {
    required: true,
    type: ObjectId,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
