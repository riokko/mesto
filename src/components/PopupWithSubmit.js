import Popup from './Popup.js';

class PopupWithSubmit extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._handleSubmit = () => {};
        this._submitButton = this._popup.querySelector('.popup__submit-button');
    }

    eventHandler() {
        this._handleSubmit();
    }
    setEventListeners() {
        super.setEventListeners();
        this._submitButton.addEventListener('click', this.eventHandler.bind(this));
    }

    myDynamicHandlerChanger(callback) {
        this._handleSubmit = callback;
    }

    close() {
        super.close();
        this._submitButton.removeEventListener('click', this.eventHandler);
    }
}

export default PopupWithSubmit;
