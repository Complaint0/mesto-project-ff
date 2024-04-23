import { sendDeletedCard, sendLike } from "./api";

const cardsTemplate = document.querySelector('#card-template').content.querySelector('.card');

export function createCard(item, userId, { confirmDeleteCard, likeCard, openCard } ) {
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
    deleteButton.addEventListener('click', () => confirmDeleteCard( {card, cardId} ));
  }

  likeBtn.addEventListener('click', (evt) => likeCard(evt, {cardLikes, cardId}));
  cardImg.addEventListener('click', () => openCard(item));
  return card;
}

function setLikesCount(cardLikes, likesCount) {
  cardLikes.textContent = likesCount;
}

function isLiked(likeObj) {
  likeObj.arrayLikes.forEach(element => {
    if (element['_id'] == likeObj.userId)
      likeObj.likeBtn.classList.add('card__like-button_is-active');
  });
}

export function deleteCard(card) {
  card.remove();
}

export function likeCard(evt, card) {
  if (evt.target.classList.contains('card__like-button_is-active')) {
    sendLike(card, 'DELETE')
      .then(data => {
          evt.target.classList.remove('card__like-button_is-active');
          setLikesCount(card.cardLikes, data.likes.length)
      })
      .catch((err) =>  console.log(err)); 
  }
  else {
    sendLike(card, 'PUT')
      .then(data => {
        evt.target.classList.add('card__like-button_is-active');
        setLikesCount(card.cardLikes, data.likes.length)
      })
      .catch((err) =>  console.log(err)); 
  }
}