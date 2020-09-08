import Popup from "./Popup.js";
import {POPUP_OPENED} from "./constants.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popup.querySelectorAll(".form__input");
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
          input.value = '';
      });
  }

  setEventListeners = () => {
    this._closeButton.addEventListener("click", this.close);
    document.addEventListener("click", this._handleOverlayClose);
    this._popup.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
      this._reset();
    });
  };

  close = () => {
    document.querySelector(`.${POPUP_OPENED}`).classList.remove(POPUP_OPENED);
    document.removeEventListener("keyup", this._handleEscClose);
    document.removeEventListener("click", this._handleOverlayClose);
    this._closeButton.removeEventListener("click", this.close);
  };
}

export default PopupWithForm;
