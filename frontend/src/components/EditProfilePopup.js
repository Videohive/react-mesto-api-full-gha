import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup({ onUpdateUser, isOpen, onClose }) {
  const currentUser = React.useContext(CurrentUserContext);
  const { name, about } = currentUser;
  const [profileName, setProfileName] = React.useState("");
  const [profileAbout, setProfileAbout] = React.useState("");

  function handleNameChange(evt) {
    setProfileName(evt.target.value);
  }

  function handleAboutChange(evt) {
    setProfileAbout(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name: profileName,
      about: profileAbout,
    });
  }

  React.useEffect(() => {
    if (isOpen) {
      setProfileName(name);
      setProfileAbout(about);
    }
  }, [isOpen, currentUser]);
  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        name="name"
        placeholder="Имя"
        minLength={2}
        maxLength={40}
        id="name-input"
        className="popup__input"
        required=""
        value={profileName}
        onChange={handleNameChange}
      />
      <span className="popup__input-error name-input-error"></span>
      <input
        name="about"
        placeholder="О себе"
        minLength={2}
        maxLength={200}
        id="about-input"
        className="popup__input"
        required=""
        value={profileAbout}
        onChange={handleAboutChange}
      />
      <span className="popup__input-error name-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
