// eslint-disable-next-line import/no-extraneous-dependencies
const rateLimiter = require('express-rate-limit');

const limiter = rateLimiter({
  max: 150,
  windowMS: 45000,
  message: 'В настоящий момент превышено количество запросов на сервер. Пожалуйста, попробуйте повторить позже',
});

module.exports = limiter;
