import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card(card) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;

  //console.log(card)

  const isLiked = card.likes.some((id) => id === currentUser._id);

  const cardLikeButtonClassName = `element__like-button ${
    isLiked && "element__like-button_active"
  }`;

  function handleClick() {
    card.onCardClick(card);
  }

  function handleLikeClick() {
    card.onCardLike(card);
  }

  function handleDeleteClick() {
    card.onCardDelete(card);
  }

  function changeName(name) {
    return name[0].toUpperCase() + name.slice(1);
  }

  return (
    <article className="element">
      {isOwn && (
        <button
          onClick={handleDeleteClick}
          type="button"
          className="element__trash-button"
        />
      )}
      <img
        onClick={handleClick}
        src={card.link}
        alt={card.name}
        className="element__image"
      />
      <div className="element__container-text">
        <h2 className="element__title">{changeName(card.name)}</h2>
        <div className="element__likes">
          <button
            onClick={handleLikeClick}
            type="button"
            className={cardLikeButtonClassName}
          />
          <p className="element__like-count"> {card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
