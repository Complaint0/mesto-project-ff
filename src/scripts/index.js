// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import '../pages/index.css';
import {closeModal, openModal} from '../components/modal.js';
import {createCard, deleteCard, likeCard} from '../components/cards.js';
import { clearValidation,  enableValidation} from '../components/validate.js';
import { getInitialProfileInfo, getInitialCards, sendNewProfileData, sendNewCard, checkIsImage, sendDeletedCard} from '../components/api.js';


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

const formElementChangeProfileImage = document.forms["change-profile-image"];
const profileImage = document.querySelector('.profile__image');
const popUpChangeProfileImage = document.querySelector('.popup_type_change-profile-image');
const imageInput = document.querySelector('.popup__input_type_url-image');


const popUpEdit = document.querySelector('.popup_type_edit');
const popUpAdd = document.querySelector('.popup_type_new-card');
const imagePopUp = document.querySelector('.popup_type_image');
const imagePopUpImage = imagePopUp.querySelector('.popup__image')
const imagePopUpCaption = imagePopUp.querySelector('.popup__caption');

const formElementConfirmDelete = document.forms['confirm-delete'];
const popUpDelete = document.querySelector('.popup_type_confirm-delete');


const buttonEditProfile = formElementProfile.elements.addBtn;
const buttonAddCard = formElementAddCard.elements.addBtn;
const buttonChangeProfileImage = formElementChangeProfileImage.elements.addBtn;

const btnOnLoadText = "Сохранение...";
const btnLoadedText = "Сохранить"


const validationObject = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error-active'
}

let userId;
let isCardDelete;


function handleFormProfileSubmit(evt) {
    evt.preventDefault();
    const name = nameInput.value
    const job = jobInput.value;
    buttonEditProfile.textContent = btnOnLoadText
    sendNewProfileData({name, job})
        .then(data =>  {
            setProfileData(data)
            closeModal(popUpEdit);
        })
        .catch((err) =>  console.log(err))
        .finally(() => buttonEditProfile.textContent = btnLoadedText);
}

function setProfileData(data) {
    profileTitle.textContent = data.name;
    profileDesc.textContent = data.about;
    profileImage.style.backgroundImage = `url(${data.avatar})`;
}


function handleFormAddCardSubmit(evt) {
    evt.preventDefault();
    const name = nameCardInput.value;
    const link = linkCardInput.value;
    setBtnText(buttonAddCard, btnOnLoadText);
    sendNewCard({name, link})
        .then(data =>  {
            cardsContainer.prepend(createCard(data, userId, {confirmDeleteCard, likeCard, openCard}))
            evt.target.reset();
            closeModal(popUpAdd);
            clearValidation(formElementAddCard, validationObject);
        })
        .catch((err) =>  console.log(err))
        .finally(() => setBtnText(buttonAddCard, buttonAddCard));
}


function handleFormChangeProfileImage(evt) {
    evt.preventDefault();
    setBtnText(buttonChangeProfileImage, btnOnLoadText);
    checkIsImage(imageInput.value)
        .then(data => {
            setProfileImage(data.avatar)
            evt.target.reset();
            closeModal(popUpChangeProfileImage);
            clearValidation(formElementChangeProfileImage, validationObject);
        })
        .catch((err) =>  console.log(err))
        
        .finally(() => buttonChangeProfileImage.textContent = btnLoadedText);
}

function setProfileImage(image) {
    profileImage.style.backgroundImage =`url(${image})`;
}

function handleSubmitConfirmPopup(evt) {
    evt.preventDefault();
    sendDeletedCard(isCardDelete.cardId)
        .then(data => {
            deleteCard(isCardDelete.card);
            closeModal(popUpDelete)
        })
        .catch((err) =>  console.log(err));
}

function confirmDeleteCard(card) {
    openModal(popUpDelete);
    isCardDelete = card;
}

formElementProfile.addEventListener('submit', handleFormProfileSubmit); 
formElementAddCard.addEventListener('submit', handleFormAddCardSubmit);
formElementChangeProfileImage.addEventListener('submit', handleFormChangeProfileImage);
formElementConfirmDelete.addEventListener('submit', handleSubmitConfirmPopup);

addCardBtn.addEventListener('click', () => {
    openModal(popUpAdd);
});

profileImage.addEventListener('click', () => {
    openModal(popUpChangeProfileImage);
})

popUps.forEach((popup) => {
    popup.classList.add('popup_is-animated');
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_is-opened')) {
            closeModal(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
            closeModal(popup)
        }
    })
})


editProfileBtn.addEventListener('click', () => {
    setProfileFormData();
    openModal(popUpEdit);
    clearValidation(formElementProfile, 
        validationObject
    ); 
});

function setProfileFormData() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDesc.textContent;
}


function openCard(card) {
    imagePopUpImage.src = card.link;
    imagePopUpImage.alt = card.name;
    imagePopUpCaption.textContent = card.name;
    openModal(imagePopUp)
}


enableValidation(validationObject);



const promises = [getInitialProfileInfo, getInitialCards];

Promise.all(promises)
    .then((results) => {
        setProfileData(results[0])
        userId = results[0]['_id']
        innerCards(results[1], userId)
    })
    .catch((err) =>  console.log(err));

function innerCards(data, userId){
    data.forEach(element => {
        cardsContainer.append(createCard(element, userId, {confirmDeleteCard, likeCard, openCard}));
    });
}


function setBtnText(btn, text)
{
    btn.textContent = text;
}

