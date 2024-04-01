// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import '../pages/index.css';
import {closeModal, openModal} from '../components/modal.js';
import {createCard, deleteCard, likeCard} from '../components/cards.js';
import { initialCards } from "../components/initialCards.js";


const cardsContainer = document.querySelector('.places__list');


const popUps = document.querySelectorAll('.popup');
const formElementProfile = document.forms["edit-profile"];
const nameInput = formElementProfile.querySelector('.popup__input_type_name');
const jobInput = formElementProfile.querySelector('.popup__input_type_description');


const formElementAddCard = document.forms["new-place"];
const nameCardInput = formElementAddCard.querySelector('.popup__input_type_card-name')
const linkCardInput = formElementAddCard.querySelector('.popup__input_type_url')


const editProfileBtn = document.querySelector('.profile__edit-button');
const addCardBtn = document.querySelector('.profile__add-button');


const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');


const popUpEdit = document.querySelector('.popup_type_edit');
const popUpAdd = document.querySelector('.popup_type_new-card');
const imagePopUp = document.querySelector('.popup_type_image');
const imagePopUpImage = imagePopUp.querySelector('.popup__image')
const imagePopUpCaption = imagePopUp.querySelector('.popup__caption');


initialCards.forEach(element => {
    cardsContainer.append(createCard(element, {deleteCard, likeCard, openCard}));
});


function handleFormProfileSubmit(evt) {
    evt.preventDefault();
    profileDesc.textContent = jobInput.value;
    profileTitle.textContent = nameInput.value;
    evt.target.reset()
    setFormProfileData();
    closeForm(evt);
}

function handleFormAddCardSubmit(evt) {
    evt.preventDefault();
    const name = nameCardInput.value;
    const link = linkCardInput.value;
    cardsContainer.prepend(createCard({name, link}, {deleteCard, likeCard, openCard}));
    evt.target.reset()
    closeForm(evt);
}

function closeForm(evt) {
    const currentPopUp = evt.target.closest('.popup');
    closePopup(currentPopUp)
}

function setFormProfileData() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDesc.textContent;
}

setFormProfileData();
formElementProfile.addEventListener('submit', handleFormProfileSubmit); 
formElementAddCard.addEventListener('submit', handleFormAddCardSubmit)


popUps.forEach((popup) => {
    popup.classList.add('popup_is-animated');
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_is-opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
            closePopup(popup)
        }
    })
})


editProfileBtn.addEventListener('click', () => {
    openPopup(popUpEdit);

});



addCardBtn.addEventListener('click', () => {
    openPopup(popUpAdd);
});

function openPopup(popup) {
    openModal(popup);
    document.addEventListener('keydown', handleEscape); 
}

function closePopup(popup) {
    closeModal(popup);
    document.removeEventListener('keydown', handleEscape); 
}

function handleEscape(e) {
    if (e.key === "Escape") {
        const openedPopup = document.querySelector('.popup_is-opened')
        closePopup(openedPopup);
    }
}

function openCard(card) {
    imagePopUpImage.src = card.link;
    imagePopUpImage.alt = card.name;
    imagePopUpCaption.textContent = card.name;
    openPopup(imagePopUp)
  }