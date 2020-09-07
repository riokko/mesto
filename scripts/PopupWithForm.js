import Popup from "./Popup.js";

class PopupWithForm extends Popup {
    constructor(submitHandler, popupSelector) {
        super(popupSelector);
        this._submitHandler = submitHandler;
    }

    _getInputValues = () => {}

    setEventListeners = () => {}

    close = () => {}
}

export default PopupWithForm;
