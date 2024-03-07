// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardsContainer = document.querySelector('.places__list');
const cardsTemplate = document.querySelector('#card-template').content;

function createCard(item, deleteCard) {
    const card = cardsTemplate.cloneNode(true);
    card.querySelector('.card__image').src = item.link;
    card.querySelector('.card__image').alt = item.name;
    card.querySelector('.card__title').textContent = item.name;
    // Так не работает, пишет что card.remove is not a function, подскажите почему так?
    // card.querySelector('.card__delete-button').addEventListener('click', () => ErrorDeleteCard(card));
    card.querySelector('.card__delete-button').addEventListener('click', deleteCard); 
    return card;
}

function ErrorDeleteCard(card) {
    card.remove();
}

function deleteCard(e) {
    const card = e.target.closest('.card'); 
    card.remove();  
}

initialCards.forEach(element => {
    cardsContainer.append(createCard(element, deleteCard));
});
