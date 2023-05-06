const Card = require('../models/card');
const { NotFoundError, BadRequestError, ForbiddenError } = require('../utils/customErrors');
const { handleErrors, handleErrorNotFound } = require('../utils/errors');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate([
      { path: 'owner', model: 'user' },
    ])
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => card.populate('owner'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные'));
        return;
      }
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      if (req.user._id !== card.owner.toString()) {
        throw new ForbiddenError('Вы не можете удалить чужую карточку');
      }
      return card.deleteOne().then(() => res.send(card));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Некорректные данные'));
      }
      return next(err);
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate([
      { path: 'owner', model: 'user' },
    ])
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        handleErrorNotFound(res, 'Карточка с указанным id не найдена');
      }
    })
    .catch((err) => handleErrors(err, res));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate([
      { path: 'owner', model: 'user' },
    ])
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        handleErrorNotFound(res, 'Карточка с указанным id не найдена');
      }
    })
    .catch((err) => handleErrors(err, res));
};
