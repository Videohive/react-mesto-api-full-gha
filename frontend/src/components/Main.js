import React from "react";
import Card from "./Card.js";
import api from "../utils/api.js";
import { useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main(props) {
  const {
    onEditAvatar,
    onEditProfile,
    onAddPlace,
    cards,
    onCardClick,
    onCardLike,
    onCardDelete,
    onDeleteClick,
  } = props;

  const currentUser = React.useContext(CurrentUserContext);

  useEffect(() => {
    document.title = "Место";
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <img
          src={currentUser.avatar}
          className="profile__avatar"
          alt="Аватар"
        />
        <button className="profile__avatar-button" onClick={onEditAvatar} />
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            type="button"
            className="profile__edit"
            onClick={onEditProfile}
          />
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button className="profile__add" type="button" onClick={onAddPlace} />
      </section>
      <section className="elements">
        {cards.map((card) => {
          return (
            <Card
              key={card._id}
              {...card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
