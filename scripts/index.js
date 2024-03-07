// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardsList = document.querySelector('.places__list');
const cardsTemplate = document.querySelector('#card-template').content;

function foramateCard(item, deleteCard) {
    let card = cardsTemplate.cloneNode(true);
    card.querySelector('.card__image').src = item.link;
    card.querySelector('.card__title').textContent = item.name;
    card.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    return card;
}

function deleteCard(e) {
    const removeCard = e.target.closest('.card');
    removeCard.remove(); 
}

initialCards.forEach(element => {
    cardsList.append(foramateCard(element, deleteCard));
});
