// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardsContainer = document.querySelector('.places__list');
const cardsTemplate = document.querySelector('#card-template').content.querySelector('.card');

function createCard(item, deleteCard) {
    const card = cardsTemplate.cloneNode(true);
    const cardImg = card.querySelector('.card__image'); 
    cardImg.src = item.link;
    cardImg.alt = item.name;
    card.querySelector('.card__title').textContent = item.name;
    card.querySelector('.card__delete-button').addEventListener('click', () => deleteCard(card));
    return card;
}

function deleteCard(card) {
    card.remove();
}


initialCards.forEach(element => {
    cardsContainer.append(createCard(element, deleteCard));
});
