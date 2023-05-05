import React, { useEffect, useCallback } from 'react';
import closeButton from '../images/close-button.svg';
import { handleOverlayClose, useEscClose } from "../utils/popupUtils";

function PopupWithForm(props) {

  const {name, title, children, buttonText, isOpen, onClose, onSubmit} = props;

  useEscClose(onClose, isOpen);

  return (
    <div
      className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}
      onClick={handleOverlayClose(onClose)}
    >
      <div className='popup__container'>
        <h2 className='popup__title'>{title}</h2>
        <div className={`popup__form popup__form-${name}`}>
          <form name={`${name}`} className='popup__container-form' onSubmit={onSubmit}>
            {children}
            <button type='submit' className='popup__button'>
              {buttonText}
            </button>
          </form>
        </div>
        <button type='button' className='popup__close-button' onClick={onClose}>
          <img
            src={closeButton}
            alt='закрыть'
          />
        </button>
      </div>
    </div>
  );
}

export default PopupWithForm;
