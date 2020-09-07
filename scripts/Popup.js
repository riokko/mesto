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
        this._closeButton.removeEventListener('click', this.close);
    }

    _handleEscClose = ({code}) => {
        if (code === ESC_BUTTON_CODE) {
            this.close();
        };
    }

    setEventListeners = () => {
        this._closeButton.addEventListener('click', this.close);
    }
}

export default Popup;
