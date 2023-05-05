import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const ref = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({ avatar: ref.current.value });
  }

  React.useEffect(() => {
    ref.current.value = "";
  }, [isOpen]);
  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={ref}
        name="avatar"
        input=""
        type="url"
        placeholder="Ссылка на картинку"
        id="avatar-input"
        className="popup__input"
        required=""
      />
      <span className="popup__input-error name-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
