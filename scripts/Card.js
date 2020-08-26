import Popup from './Popup.js';

class Card {
  constructor(data, cardTemplate) {
    this._title = data.name;
    this._image = data.link;
    this._cardTemplate = cardTemplate;
    this._DELETE_CLASS_NAME = 'element__delete';
    this._LIKE_CLASS_NAME = 'element__like';
    this._popupElement = document.querySelector('.popup');
    this._popup = new Popup(this._popupElement, this._preparePopupContent(), 'popup__container_type_photo');
  }

  _preparePopupContent = () => {
    const templateContent = document.querySelector('.photo-popup-template').content
    const photoImage = templateContent.querySelector('.popup__image').cloneNode(true);
    const photoCaption = templateContent.querySelector('.popup__caption').cloneNode(true);
    const wrapper = document.createElement('div');

    photoImage.src = this._image;
    photoImage.alt = this._title;
    photoCaption.textContent = this._title;

    wrapper.appendChild(photoImage);
    wrapper.appendChild(photoCaption);
    return wrapper;
  }

  _remove = () => {
    this._view.remove();
    this._view = undefined;
  }

  _like = () => {
    const likeButton = this._view.querySelector('.element__like')
    likeButton.classList.toggle('element__like_is_selected');
  }

  getView() {
    this._view = this._cardTemplate.cloneNode(true);
    const photo = this._view.querySelector('.element__photo');

    this._view.querySelector('.element__name').textContent = this._title;
    photo.src = this._image;
    photo.alt = this._title;

    this._view.querySelector(`.${this._DELETE_CLASS_NAME}`).addEventListener('click', this._remove);
    this._view.querySelector(`.${this._LIKE_CLASS_NAME}`).addEventListener('click', this._like);
    photo.addEventListener('click', this._popup.open);

    return this._view;
  }
}

export default Card;
// добавить слушателя к карточке не получилось, зато выделила отдельный класс Popup — единый для всех
