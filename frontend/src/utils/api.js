class Api {
  constructor(key) {
    this._baseUrl = key.baseUrl;
    this._headers = key.headers;
  }

  _getResponseData = res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

  // получение информации о пользователе
  getUserInfo = () => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then(this._getResponseData)
  }

  //обновление информации о пользователе
  patchUserInfo = (name, about) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._getResponseData)
  }

  // получение стартовых карточек
  getInitialCards = () => {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
    }).then(this._getResponseData)
  }

  // добавление новой карточки
  addCard = (name, link) => {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._getResponseData)
  }

  // установка лайка
  setLike = (id, value) => {
    value = value ? 'DELETE' : 'PUT';
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: `${value}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
    }).then(this._getResponseData)
  }

// удаление карточки
  removeCard = (id) => {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
    }).then(this._getResponseData)
  }

  // замена аватара
  changeAvatar = (avatar) => {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._getResponseData)
  }
}

const api = new Api({
  baseUrl: 'http://api.mesto63.nomoredomains.monster',
  // headers: {
  //   authorization: '60cd4e7e-5160-4d08-8f0d-74282e71abaa',
  //   'Content-Type': 'application/json',
  // },
});

export default api;
