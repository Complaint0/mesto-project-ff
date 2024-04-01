export function openModal(element) {
    element.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscape); 
}

export function closeModal(element) {
    element.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscape); 
}

function handleEscape(e) {
    if (e.key === "Escape") {
        const openedPopup = document.querySelector('.popup_is-opened')
        closeModal(openedPopup);
    }
}