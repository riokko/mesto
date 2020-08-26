class FormValidator {
  constructor(validationElement, object) {
    this._validationElement = validationElement;
    this._formSelector = object.formSelector;
    this._inputSelector = object.inputSelector;
    this._inputInvalidClass = object.inputInvalidClass;
    this._submitButtonSelector = object.submitButtonSelector;
    this._inactiveButtonClass = object.inactiveButtonClass;
    this._errorClass = object.errorClass;
  }

  // Показывать ошибку при неправильном заполнении форм
  _showInputError(errorElement, input) {
    errorElement.classList.add(this._errorClass);
    input.classList.add(this._inputInvalidClass);
    errorElement.textContent = input.validationMessage;
  }

  // Убирать ошибку при правильном заполнении формы
  _hideInputError(errorElement, input) {
    errorElement.classList.remove(this._errorClass);
    input.classList.remove(this._inputInvalidClass);
    errorElement.textContent = '';
  }

  // Показывать или не показывать ошибку при заполнении форм
  _checkInputValidity(form, input) {
    const errorElement = form.querySelector(`#${input.id}-error`);
    if (!input.validity.valid) {
      this._showInputError(errorElement, input);
    } else {
      this._hideInputError(errorElement, input);
    }
  }

  // Повесить обработчик события на каждое поле ввода
  _setEventListeners(form) {
    const inputList = Array.from(form.querySelectorAll(this._inputSelector));
    const buttonSubmit = form.querySelector(this._submitButtonSelector);
    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(form, input);
        this._setButtonState(inputList, buttonSubmit);
      });
    });
  }

  // Проверить валидность заполнения формы
  _isFormInvalid(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // Добавить валидацию кнопки
  _setButtonState(inputList, buttonSubmit) {
    if (!this._isFormInvalid(inputList)) {
      buttonSubmit.classList.remove(this._inactiveButtonClass);
      buttonSubmit.disabled = false;
    } else {
      buttonSubmit.classList.add(this._inactiveButtonClass);
      buttonSubmit.disabled = true;
    }
  }

  // Проверить валидностьзаполнения форм и сбросить дефолтное поведение сабмита
  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._formSelector));
    formList.forEach((form) => {
      form.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      this._setEventListeners(form);
    });
  }
}

export default FormValidator
