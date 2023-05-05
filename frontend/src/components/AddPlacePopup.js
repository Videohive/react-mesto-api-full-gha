import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ onAddPlace, isOpen, onClose }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: name,
      link: link,
    });
  }

  React.useEffect(() => {
    if (isOpen) {
      setName("");
      setLink("");
    }
  }, [isOpen]);
  return (
    <PopupWithForm
      title="Новое место"
      name="add_card"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        name="name"
        placeholder="Название"
        minLength={2}
        maxLength={40}
        id="name-input"
        className="popup__input"
        required=""
        onChange={handleNameChange}
        value={name}
      />
      <span className="popup__input-error name-input-error"></span>
      <input
        name="url"
        input=""
        type="url"
        placeholder="Ссылка на картинку"
        id="url-input"
        className="popup__input"
        required=""
        onChange={handleLinkChange}
        value={link}
      />
      <span className="popup__input-error name-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
