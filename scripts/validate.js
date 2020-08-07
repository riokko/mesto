const classesMap = {
  formSelector: '.form',
  inputSelector: '.form__input',
  inputInvalidClass: 'form__input_type_invalid',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  errorClass: 'form__error_visible',
};

// Показывать ошибку при неправильном заполнении форм
function showInputError(errorElement, inputElement, errorMessage) {
  errorElement.classList.add(classesMap.errorClass);
  inputElement.classList.add(classesMap.inputInvalidClass);
  errorElement.textContent = errorMessage;
}

// Убирать ошибку при правильном заполнении форм
function hideInputError(errorElement, inputElement) {
  errorElement.classList.remove(classesMap.errorClass);
  inputElement.classList.remove(classesMap.inputInvalidClass);
  errorElement.textContent = '';
}

// Показывать или не показывать ошибку при заполнении форм
function checkInputValidity(formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  if (!inputElement.validity.valid) {
    showInputError(errorElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(errorElement, inputElement);
  }
}

// Повесить обработчик события на каждое поле ввода
function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(classesMap.inputSelector));
  const buttonSubmit = formElement.querySelector(classesMap.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonSubmit);
    });
  });
}

// Проверить валидность заполнения формы
function isFormValid(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// Добавить валидацию кнопки
function toggleButtonState(inputList, buttonSubmit) {
  if (!isFormValid(inputList)) {
    buttonSubmit.classList.remove(classesMap.inactiveButtonClass);
    buttonSubmit.disabled = false;
  } else {
    buttonSubmit.classList.add(classesMap.inactiveButtonClass);
    buttonSubmit.disabled = true;
  }
}

// Проверить валидность заполнения форм и сбросить дефолтное поведение сабмита
function enableValidation({formSelector}) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}

enableValidation(classesMap);
