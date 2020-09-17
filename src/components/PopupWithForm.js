import Popup from './Popup.js';
import FormValidator from './FormValidatr.js';
import { classesMap } from '../utils/constants';

class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = this._popup.querySelectorAll('.form__input');

        this._formValidator = new FormValidator(document.querySelector('.popup_type_new-item-form'), classesMap);
        this.reset = this._formValidator.reset.bind(this._formValidator);
    }

    _getInputValues = () => {
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    };

    _submit = (event) => {
        event.preventDefault();
        this.toggleLoadingState(true);
        this._handleFormSubmit(this._getInputValues()).then(() => {
            this.close();
            this.reset(this._inputList);

        }).catch((data) => {
            if (data.errors) {
                this.displayError(data.errors);
            } else {
                console.log(data);
            }
        }
        ).finally(() => {
            this.toggleLoadingState(false);
        });
    };

    displayError = (errors) => {
        Object.entries(errors).forEach( ([key, value]) => {
            const input = this._popup.querySelector(`[name=${key}]`)
            const errorElement = this._popup.querySelector(`#${input.id}-error`);
            this._formValidator.showInputError(errorElement, input, value.message);
        });
    };

    toggleLoadingState = (state) => {
        this._popup.querySelector('.form__button').textContent = state ? 'Сохранение...' : 'Сохранить';
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', this._submit);
    }

    close() {
        super.close();
        this._popup.removeEventListener('submit', this._submit);
    }
}

export default PopupWithForm;
