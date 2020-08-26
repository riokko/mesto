class Popup {
  constructor(popup, content, classModifier) {
    this._popup = popup;
    this._popupContent = content;
    this._closeButton = this._popup.querySelector('.popup__close-button');
    this._ESC_KEY_CODE = 27;
    this._classModefier = classModifier || undefined;
    this._popupContainer = this._popup.querySelector('.popup__container');
    this._popupContentElement = this._popup.querySelector('.popup__content');
  }

  open = () => {
    this._popupContainer.classList.add(this._classModefier);
    this._popupContentElement.innerHTML = '';
    this._popupContentElement.appendChild(this._popupContent);
    this._popup.classList.add('popup_opened');
    this._popup.addEventListener('click', this._closeHandler);
    this._closeButton.addEventListener('click', this.close);
    document.addEventListener('keyup', this._closeOnESC);
  }

  _closeHandler = ({target, currentTarget}) => {
    if (target === currentTarget) {
      this.close();
    }
  }

  _removeClassModifier = () => {
    this._popupContainer.classList.remove(this._classModefier);
    this._popup.removeEventListener('transitionend', this._removeClassModifier);
  }

  close = () => {
    this._popup.classList.remove('popup_opened');
    this._popup.removeEventListener('click', this._closeHandler);
    this._closeButton.removeEventListener('click', this._close);
    document.removeEventListener('keyup', this._closeOnESC);
    this._popup.addEventListener('transitionend', this._removeClassModifier);

  }

  _closeOnESC = (event) => {
    if (event.keyCode === this._ESC_KEY_CODE) {
      this.close()
    }
  }
}

export default Popup
