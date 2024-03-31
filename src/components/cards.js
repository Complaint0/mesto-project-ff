import { openModal } from "./model";

export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

const cardsTemplate = document.querySelector('#card-template').content.querySelector('.card');

export function createCard(item, deleteCard) {
  console.log(item)
  const card = cardsTemplate.cloneNode(true);
  const cardImg = card.querySelector('.card__image'); 
  cardImg.src = item.link;
  cardImg.alt = item.name;
  card.querySelector('.card__title').textContent = item.name;
  card.querySelector('.card__delete-button').addEventListener('click', () => deleteCard(card));
  card.querySelector('.card__like-button').addEventListener('click', likeCard);
  card.querySelector('.card__image').addEventListener('click', () => openCard(item));
  return card;
}

export function deleteCard(card) {
  card.remove();
}

export function openCard(card) {
  const imagePopUp = document.querySelector('.popup_type_image');
  imagePopUp.querySelector('.popup__image').src = card.link;
  imagePopUp.querySelector('.popup__caption').textContent = card.name;
  openModal(imagePopUp)
}

export function likeCard(evt) {
  console.log(evt.target)
  evt.target.classList.toggle('card__like-button_is-active');
}