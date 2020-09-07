import Popup from "./Popup.js";
import {POPUP_OPENED} from "./constants.js";

class PopupWithImage extends Popup {
    constructor(data, popupSelector) {
        super(popupSelector);
        this._title = data.name;
        this._image = data.link;
        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupCaption = this._popup.querySelector('.popup__caption');
    }

    open = () => {
        this._popup.classList.add(POPUP_OPENED);
        this._popupImage.src = this._image;
        this._popupImage.alt = this._title;
        this._popupCaption.textContent = this._title;
        document.addEventListener('keyup', this._handleEscClose);
        this.setEventListeners();
    }
}

export default PopupWithImage;
