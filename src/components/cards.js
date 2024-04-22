import { closeModal, openModal } from "./modal";
import { sendDeletedCard } from "./api";

const cardsTemplate = document.querySelector('#card-template').content.querySelector('.card');

export function createCard(item, userId, { deleteCard, popUpDelete, likeCard, openCard } ) {
  const card = cardsTemplate.cloneNode(true);
  const cardImg = card.querySelector('.card__image'); 
  const cardLikes = card.querySelector('.card__like_count'); 
  const deleteButton = card.querySelector('.card__delete-button');
  const cardTitle = card.querySelector('.card__title');
  const cardId = item['_id'];
  const likeBtn = card.querySelector('.card__like-button');
  const arrayLikes = item.likes;

  isLiked( { arrayLikes, userId, likeBtn });

  cardImg.src = item.link;
  cardImg.alt = item.name;
  cardTitle.textContent = item.name;
  setLikesCount(cardLikes, item.likes.length)

  if (item.owner['_id'] !== userId) {
    card.removeChild(deleteButton);
  }
  else {
    deleteButton.addEventListener('click', () => deleteCard(card, popUpDelete, cardId));
  }

  likeBtn.addEventListener('click', (evt) => likeCard(evt, {cardLikes, cardId}));
  cardImg.addEventListener('click', () => openCard(item));
  return card;
}

function setLikesCount(cardLikes, likesCount) {
  cardLikes.textContent = likesCount;
}

function isLiked(likesObj) {
  likesObj.arrayLikes.forEach(element => {
    if (element['_id'] == likesObj.userId)
    likesObj.likeBtn.classList.add('card__like-button_is-active');
  });
}

export function deleteCard(card, popUpDelete, cardId) {
  openModal(popUpDelete);
  popUpDelete.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__button'))
    {
      closeModal(popUpDelete);
      sendDeletedCard(cardId);
      card.remove();
    }
  });
}




export function likeCard(evt, card) {
  if (evt.target.classList.contains('card__like-button_is-active')) {
    evt.target.classList.remove('card__like-button_is-active');
    sendLike(card, 'DELETE')
  }
  else {
    evt.target.classList.add('card__like-button_is-active');
    sendLike(card, 'PUT')
  }
}

function sendLike(card, method) {
  fetch(`https://nomoreparties.co/v1/wff-cohort-12/cards/likes/${card.cardId}`, {
      method: method,
      headers: {
          authorization: '15b9ade9-0fb6-48e4-9df8-c18fc5002836',
          'Content-Type': 'application/json'
      },
    })
    .then(data => data.json())
    .then(data => setLikesCount(card.cardLikes, data.likes.length));
}