const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const { Schema } = mongoose;
const { urlRegexPattern } = require('../utils/constants').default;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (url) => urlRegexPattern.isEmail(url),
      message: 'Требуется ввести электронный адрес',
    },
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
