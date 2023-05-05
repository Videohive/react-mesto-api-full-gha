import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import ImagePopup from "./ImagePopup";

import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import api from "../utils/api";
import authApi from "../utils/authApi";

import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";

import AddPlacePopup from "./AddPlacePopup.js";

import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login.js";
import Register from "./Register.js";
import InfoTooltip from "./InfoTooltip.js";

function App() {
  // хуки
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false); // попап редактирования профиля

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false); // попап добавления карточки

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false); // попап редактирования аватара

  const [selectedCard, setSelectedCard] = useState(null); // попап карточки
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);

  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false); // информация о входе

  const [headerEmail, setHeaderEmail] = useState("");

  const [isSuccess, setSuccess] = useState({ status: false, text: "" });

  const navigate = useNavigate();

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((id) => id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .setLike(card._id, isLiked)
      .then((newCard) => {
        console.log(newCard)
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleUpdateUser({ name, about }) {
    api
      .patchUserInfo(name, about)
      .then((info) => {
        setCurrentUser(info);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .changeAvatar(avatar)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleLogin(email, password) {
    authApi
      .loginUser(email, password)
      .then((data) => {
        if (data.token) {
          setHeaderEmail(email); // передача почты
          setIsLoggedIn(true);
          localStorage.setItem("jwt", data.token); // запись токена
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        setSuccess({
          status: false,
          text: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        setIsSuccessPopupOpen(true);
        console.log(err);
      });
  }
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      authApi
        .checkToken(jwt)
        .then((data) => {
          if (data) {
            setIsLoggedIn(true); // войдено
            setHeaderEmail(data.email); // получаем почту
            navigate("/", { replace: true });
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  function handleRegister(email, password) {
    authApi
      .registerUser(email, password)
      .then((data) => {
        if (data) {
          setSuccess({ status: true, text: "Вы успешно зарегистрировались!" });
          navigate("/signin", { replace: true });
        }
      })
      .catch((err) => {
        setSuccess({
          status: false,
          text: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        console.log(err);
      })
      .finally(() => setIsSuccessPopupOpen(true));
  }

  function handleSingOut() {
    localStorage.removeItem("jwt");
    setHeaderEmail("");
    setIsLoggedIn(false);
    navigate("/signin", { replace: true });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeletePopupOpen(false);
    setSelectedCard(null);
    setIsSuccessPopupOpen(false);
  }

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards.reverse());
        })
        .catch((err) => console.error(err));
    }
  }, [isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header onSignOut={handleSingOut} headerEmail={headerEmail} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          />
        </Routes>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          isOpen={isSuccessPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
