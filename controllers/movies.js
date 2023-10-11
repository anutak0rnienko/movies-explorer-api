const Movie = require('../models/movie');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const AccessDeniedError = require('../errors/AccessDeniedError');

// Получение массива карточек
function getMovie(req, res, next) {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
}

// Создание новой карточки
function addNewMovie(req, res, next) {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const { userId } = req.user;

  // eslint-disable-next-line no-unused-expressions
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: userId,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(201).send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            'Переданы некорректные данные при создании карточки',
          ),
        );
      } else {
        next(err);
      }
    });
}

// Удаление карточки из массива
function removeMovie(req, res, next) {
  const { id: movieId } = req.params;
  Movie.findById({
    _id: movieId,
  })
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Данные по указанному id не найдены');
      }

      const { owner: movieOwnerId } = movie;

      if (movieOwnerId.valueOf() !== movieId) {
        throw new AccessDeniedError('Нет прав доступа');
      }

      return Movie.findByIdAndDelete(movieId);
    })
    .then((deletedMovie) => {
      if (!deletedMovie) {
        throw new NotFoundError('Карточка уже была удалена');
      }

      res.send({ data: deletedMovie });
    })
    .catch(next);
}

module.exports = {
  getMovie,
  addNewMovie,
  removeMovie,
};
