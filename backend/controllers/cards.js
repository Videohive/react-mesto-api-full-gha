const Card = require('../models/card');
const { handleErrors, handleErrorNotFound, handleForbiddenError } = require('../utils/errors');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate([
      { path: 'owner', model: 'user' },
    ])
    .then((cards) => res.send(cards))
    .catch((err) => handleErrors(err, res));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user;
  Card.create({ name, link, owner })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(201).send(card))
    .catch((err) => handleErrors(err, res));
};

module.exports.deleteCard = (req, res) => {
  const _id = req.params.cardId;

  Card.findOne({ _id })
    .populate([
      { path: 'owner', model: 'user' },
    ])
    .then((card) => {
      if (!card) handleErrorNotFound(res, 'Карточка не найдена');

      if (card.owner._id.toString() !== req.user._id.toString()) {
        handleForbiddenError(res, 'Вы не можете удалить чужую карточку');
      }

      Card.findByIdAndDelete({ _id })
        .populate([
          { path: 'owner', model: 'user' },
        ])
        .then((deletedCard) => { res.send(deletedCard); });
    })
    .catch((err) => handleErrors(err, res));
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
