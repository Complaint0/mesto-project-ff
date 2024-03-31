export function openModal(element) {
    element.classList.add('popup_is-opened');
}

export function closeModal(element) {
    element.classList.remove('popup_is-opened');
    if (element.querySelector('.popup__form') !== null)
        element.querySelector('.popup__form').reset();
}