class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._title = data.name;
        this._image = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _remove = () => {
        this._view.remove();
        this._view = null;
    };

    _like = () => {
        const likeButton = this._view.querySelector('.element__like');
        likeButton.classList.toggle('element__like_is_selected');
    };

    _previewPicture = () => {
        this._handleCardClick(this._title, this._image);
    };

    _setEventListeners() {
        this._view.querySelector('.element__delete').addEventListener('click', this._remove);
        this._view.querySelector('.element__like').addEventListener('click', this._like);
        this._view.querySelector('.element__photo').addEventListener('click', this._previewPicture);
    }

    _getTemplate() {
        const cardTemplate = document.querySelector(this._cardSelector).content.querySelector('.element');

        this._view = cardTemplate.cloneNode(true);
        return this._view;
    }

    getView() {
        this._getTemplate();

        const photo = this._view.querySelector('.element__photo');
        this._view.querySelector('.element__name').textContent = this._title;
        photo.src = this._image;
        photo.alt = this._title;

        this._setEventListeners();

        return this._view;
    }
}

export default Card;
