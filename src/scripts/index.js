// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import '../pages/index.css';
import {closeModal, openModal} from '../components/model.js';
import {initialCards, createCard, deleteCard, openCard, likeCard} from '../components/cards.js';

const cardsContainer = document.querySelector('.places__list');


initialCards.forEach(element => {
    cardsContainer.append(createCard(element, deleteCard, likeCard, openCard));
});



const formElements = document.querySelectorAll('.popup__form');
const popUps = document.querySelectorAll('.popup');
const popUpsClose = document.querySelectorAll('.popup__close');

const formElementProfile = formElements[0];
const nameInput = formElementProfile.querySelector('.popup__input_type_name');
const jobInput = formElementProfile.querySelector('.popup__input_type_description');

const formElementAddCard = formElements[1];
const nameCardInput = formElementAddCard.querySelector('.popup__input_type_card-name')
const linkCardInput = formElementAddCard.querySelector('.popup__input_type_url')


const editProfileBtn = document.querySelector('.profile__edit-button');
const addCardBtn = document.querySelector('.profile__add-button');


function handleFormSubmit(evt) {
    evt.preventDefault();

    if (evt.target.closest('.popup_type_edit')) {
        const profileTitle = document.querySelector('.profile__title');
        const profileDesc = document.querySelector('.profile__description');
        profileDesc.textContent = jobInput.value;
        profileTitle.textContent = nameInput.value;
    }
    else if (evt.target.closest('.popup_type_new-card')) {
        const name = nameCardInput.value;
        const link = linkCardInput.value;
        cardsContainer.prepend(createCard({name, link}, deleteCard, likeCard, openCard));
    }
    const currentPopUp = evt.target.closest('.popup');
    closeModal(currentPopUp)
}

formElementProfile.addEventListener('submit', handleFormSubmit); 
formElementAddCard.addEventListener('submit', handleFormSubmit)


function handleFormClick(evt) {
    if (evt.target.classList.contains('popup')) {
        const currentPopUp = evt.target.closest('.popup');
        closeModal(currentPopUp);
    }
}

for(let i = 0; i < popUps.length; i++){
    popUps[i].addEventListener('click', handleFormClick);
    popUps[i].classList.add('popup_is-animated');
}


function handleFormClose(evt) {
    const curPopUp = evt.target.closest('.popup')
    closeModal(curPopUp);
}

for(let i = 0; i < popUps.length; i++){
    popUpsClose[i].addEventListener('click', handleFormClose)
}


function handleFormCloseEsc (e, elem) {
    if (e.key === "Escape") {
        window.removeEventListener('keydown', handleFormCloseEsc);
        closeModal(elem);
    }
}

editProfileBtn.addEventListener('click', () => {
    const popUpEdit = document.querySelector('.popup_type_edit');
    openModal(popUpEdit);
    window.addEventListener('keydown', (e) => { handleFormCloseEsc(e, popUpEdit)});
});

addCardBtn.addEventListener('click', () => {
    const popUpAdd = document.querySelector('.popup_type_new-card');
    openModal(popUpAdd);
    window.addEventListener('keydown', (e) => { handleFormCloseEsc(e, popUpAdd)});
});































// const formElement = document.querySelector('.popup__form');
// const nameInput = formElement.querySelector('.popup__input_type_name');
// const jobInput = formElement.querySelector('.popup__input_type_description');
// const editProfileBtn = document.querySelector('.profile__edit-button');
// const popUpEdit = document.querySelector('.popup_type_edit');

// const addCardBtn = document.querySelector('.profile__add-button');
// const popUpAdd = document.querySelector('.popup_type_new-card');

// const popUpClose = document.querySelector('.popup__close');
// const popUp = document.querySelector('.popup');


// function handleFormSubmit(evt) {
//     evt.preventDefault(); 

//     const profileTitle = document.querySelector('.profile__title');
//     const profileDesc = document.querySelector('.profile__description');
//     profileDesc.textContent = jobInput.value;
//     profileTitle.textContent = nameInput.value;

//     formElement.reset();
//     popUpEdit.classList.remove('popup_is-opened');
// }


// popUp.addEventListener('click', (evt) => {
//     if (evt.target.classList.contains('popup')) {
//         popUp.classList.remove('popup_is-opened');
//         formElement.reset();
//     }
// });  

// formElement.addEventListener('submit', handleFormSubmit); 

// function handleFormCloseEsc (evt) {
//     if (evt.key === "Escape") {
//         window.removeEventListener('keydown', handleFormCloseEsc); 
//         popUp.classList.remove('popup_is-opened');
//         formElement.reset();
//     }
// }

// editProfileBtn.addEventListener('click', (evt) => {
//     popUpEdit.classList.add('popup_is-opened');
//     window.addEventListener('keydown', handleFormCloseEsc);
// });

// addCardBtn.addEventListener('click', () => {
//     popUpAdd.classList.add('popup_is-opened');
//     window.addEventListener('keydown', handleFormCloseEsc);
// })


// popUpClose.addEventListener('click', () => {
//     const popUp = popUpClose.closest('.popup')
//     popUp.classList.remove('popup_is-opened');
//     formElement.reset();
// })

