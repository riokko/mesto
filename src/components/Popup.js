import {ESC_BUTTON_CODE} from "../utils/constants.js";

class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(".popup__close-button");
    this._POPUP_OPENED = "popup_opened";
  }

  open() {
    this._popup.classList.add(this._POPUP_OPENED);
    document.addEventListener("keyup", this._handleEscClose);
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove(this._POPUP_OPENED);
    document.removeEventListener("keyup", this._handleEscClose);
    document.removeEventListener("click", this._handleOverlayClose);
    this._closeButton.removeEventListener("click", this.close);
  }

  _handleEscClose = ({ code }) => {
    if (code === ESC_BUTTON_CODE) {
      this.close();
    }
  };

  _handleOverlayClose = (e) => {
    if (e.target.classList.contains(this._POPUP_OPENED)) {
      this.close();
    }
  };

  setEventListeners() {
    this._closeButton.addEventListener("click", this.close.bind(this));
    document.addEventListener("click", this._handleOverlayClose);
  }
}

export default Popup;
