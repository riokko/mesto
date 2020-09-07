import {ESC_BUTTON_CODE, POPUP_OPENED} from "./constants.js";

class Popup{
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closeButton = this._popup.querySelector('.popup__close-button');
    }

    open = () => {
        this._popup.classList.add(POPUP_OPENED);
        document.addEventListener('keyup', this._handleEscClose);
        this.setEventListeners();
    }

    close = () => {
        document.querySelector(`.${POPUP_OPENED}`).classList.remove(POPUP_OPENED);
        document.removeEventListener('keyup', this._handleEscClose);
        document.removeEventListener('click', this._handleOverlayClose)
        this._closeButton.removeEventListener('click', this.close);
    }

    _handleEscClose = ({code}) => {
        if (code === ESC_BUTTON_CODE) {
            this.close();
        };
    }

    _handleOverlayClose = (e) => {
        if (e.target.classList.contains(POPUP_OPENED)) {
            this.close();
        }
    }

    setEventListeners = () => {
        this._closeButton.addEventListener('click', this.close);
        document.addEventListener('click', this._handleOverlayClose)
    }
}

export default Popup;
