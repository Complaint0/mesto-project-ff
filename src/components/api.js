const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-12",
  headers: {
    authorization: "15b9ade9-0fb6-48e4-9df8-c18fc5002836",
    "Content-Type": "application/json",
  },
};

export const getInitialProfileInfo = fetch(`${config.baseUrl}/users/me`, {
  headers: config.headers,
}).then((res) => {
  if (res.ok) return res.json();
  return Promise.reject(`Ошибка: ${res.status}`);
});

export const getInitialCards = fetch(`${config.baseUrl}/cards`, {
  headers: config.headers,
}).then((res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
});

export const sendNewProfileData = (data) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
        name: data.name,
        about: data.job
    })
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const sendNewCard = (card) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  };

  export const sendDeletedCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  };

  export const checkIsImage = (imageUrl) => {
    return fetch(`${imageUrl}`, {
      method: 'HEAD',
    }).then((res) => {
      if (res.ok && res.headers.get('Content-Type').includes('image')) {
        return sendNewProfileImage(imageUrl);
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  };

  const sendNewProfileImage = (imageUrl) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: imageUrl,
      })
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  };