class FormValidator {
    constructor(validationElement, object) {
        this._validationElement = validationElement;
        this._formSelector = object.formSelector;
        this._inputSelector = object.inputSelector;
        this._inputInvalidClass = object.inputInvalidClass;
        this._submitButtonSelector = object.submitButtonSelector;
        this._inactiveButtonClass = object.inactiveButtonClass;
        this._errorClass = object.errorClass;
        this._form = this._validationElement.querySelector(this._formSelector);
        this._buttonSubmit = this._form.querySelector(this._submitButtonSelector);
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
    _checkInputValidity(input) {
        const errorElement = this._form.querySelector(`#${input.id}-error`);
        if (!input.validity.valid) {
            this._showInputError(errorElement, input);
        } else {
            this._hideInputError(errorElement, input);
        }
    }

    // Повесить обработчик события на каждое поле ввода
    _setEventListeners() {
        const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        inputList.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                this._setButtonState(inputList);
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
    _setButtonState(inputList) {
        if (!this._isFormInvalid(inputList)) {
            this._buttonSubmit.classList.remove(this._inactiveButtonClass);
            this._buttonSubmit.disabled = false;
        } else {
            this._buttonSubmit.classList.add(this._inactiveButtonClass);
            this._buttonSubmit.disabled = true;
        }
    }

    // Сбрасывать валидацию кнопки
    reset(inputList) {
        inputList.forEach((input) => {
            input.value = '';
        });
        this._buttonSubmit.classList.add(this._inactiveButtonClass);
        this._buttonSubmit.disabled = false;
    }

    // Проверить валидность заполнения форм и сбросить дефолтное поведение сабмита
    enableValidation() {
        this._form.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        this._setEventListeners();
    }
}

export default FormValidator;
