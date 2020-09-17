import Popup from './Popup.js';

class PopupWithSubmit extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._handleSubmit = () => {};
        this._submitButton = this._popup.querySelector('.popup__submit-button');
    }

    eventHandler = async () => {
        try {
            await this._handleSubmit();
            this.close();
            this.resolve();
        } catch(e) {
            console.log(e);
            this.reject();
        }
    }

    open() {
        super.open();
        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
    setEventListeners() {
        super.setEventListeners();
        this._submitButton.addEventListener('click', this.eventHandler);
    }

    handlerChanger(callback) {
        this._handleSubmit = callback;
    }

    close() {
        super.close();
        this._submitButton.removeEventListener('click', this.eventHandler);
    }
}

export default PopupWithSubmit;
