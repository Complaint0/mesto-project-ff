
const cardsTemplate = document.querySelector('#card-template').content.querySelector('.card');

export function createCard(item, { deleteCard, likeCard, openCard } ) {
  const card = cardsTemplate.cloneNode(true);
  const cardImg = card.querySelector('.card__image'); 
  cardImg.src = item.link;
  cardImg.alt = item.name;
  card.querySelector('.card__title').textContent = item.name;
  card.querySelector('.card__delete-button').addEventListener('click', () => deleteCard(card));
  card.querySelector('.card__like-button').addEventListener('click', likeCard);
  cardImg.addEventListener('click', () => openCard(item));
  return card;
}

export function deleteCard(card) {
  card.remove();
}

export function likeCard(evt) {
  console.log(evt.target)
  evt.target.classList.toggle('card__like-button_is-active');
}