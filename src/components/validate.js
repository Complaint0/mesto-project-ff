export function clearValidation(formElement, validationConfig) {
    const inputElements = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    const inputErrorClass = validationConfig.inputErrorClass;
    const errorClass = validationConfig.errorClass;

    inputElements.forEach((inputElement) => {
        inputElement.setCustomValidity("");
        hideInputError(formElement, inputElement, {inputErrorClass, errorClass});
    });
    toggleButtonState(inputElements, buttonElement, validationConfig.inactiveButtonClass);
}


export function enableValidation(settings) {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach(function(formElement) {
        setEventListeners(formElement, settings);
    })
}

function setEventListeners(formElement, settings) {
    const inputElements = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    const inputErrorClass = settings.inputErrorClass;
    const errorClass = settings.errorClass;
    toggleButtonState(inputElements, buttonElement, settings.inactiveButtonClass);

    inputElements.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {
            checkInputValidity(formElement, inputElement, {inputErrorClass, errorClass});
            toggleButtonState(inputElements, buttonElement, settings.inactiveButtonClass);
        })
    })
}

function isValidInput(inputList) {
    return inputList.some((inputElement) => 
    {
        return !inputElement.validity.valid
    })
}

function toggleButtonState(inputList, buttonElement, disabledClass) {

    if(isValidInput(inputList))
    {
        buttonElement.classList.add(disabledClass);
    }
    else {
        buttonElement.classList.remove(disabledClass);
    }
}


function checkInputValidity(formElement, inputElement, errClasses) {

    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }


    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement, errClasses);
    }
    else {
        showInputError(formElement, inputElement, inputElement.validationMessage, errClasses);
    }
}

function showInputError(formElement, inputElement, errorMessage, errClasses) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(errClasses.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errClasses.errorClass);
}

function hideInputError(formElement, inputElement, errClasses) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(errClasses.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(errClasses.errorClass);
}