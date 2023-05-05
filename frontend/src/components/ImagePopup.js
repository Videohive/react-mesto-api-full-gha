import React, { useEffect, useCallback } from "react";
import closeButton from "../images/close-button.svg";
import { handleOverlayClose, useEscClose } from "../utils/popupUtils";

function ImagePopup(props) {
  const { card, onClose } = props;

  useEscClose(onClose, card);

  return (
    <div
      className={`popup popup-image ${card ? "popup_opened" : ""}`}
      onClick={handleOverlayClose(onClose)}
    >
      <div className="popup__container-image">
        <img className="popup__image" src={card?.link} alt={card?.name} />
        <figcaption className="popup__image-caption">
          {card ? card.name : ""}
        </figcaption>
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        >
          <img src={closeButton} alt="закрыть" />
        </button>
      </div>
    </div>
  );
}

export default ImagePopup;
