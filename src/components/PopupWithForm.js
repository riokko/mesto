import Popup from "./Popup.js";
import {classesMap} from "../utils/constants.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popup.querySelectorAll(".form__input");
    this._button = this._popup.querySelector(classesMap.submitButtonSelector);
  }

  _getInputValues = () => {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  };

  _reset() {
    this._inputList.forEach((input) => {
      input.value = "";
    });
    this._button.classList.add(classesMap.inactiveButtonClass);
    this._button.disabled = false;
  }

  _submit = (event) => {
    event.preventDefault();
    this._handleFormSubmit(this._getInputValues());
    this.close();
    this._reset();
  };

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", this._submit);
  }

  close = () => {
    this._popup.classList.remove(this._POPUP_OPENED);
    document.removeEventListener("keyup", this._handleEscClose);
    document.removeEventListener("click", this._handleOverlayClose);
    this._closeButton.removeEventListener("click", this.close);
    this._popup.removeEventListener("submit", this._submit);
  };
}

export default PopupWithForm;
