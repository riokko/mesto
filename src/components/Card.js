class Card {
    constructor({
        name,
        link,
        owner,
        likes,
        cardSelector,
        handleCardClick,
        handleRemoveCard,
        ownerId,
        handleLikeCard,
    }) {
        this._title = name;
        this._image = link;
        this._likes = likes;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleRemoveCard = handleRemoveCard;
        this._id = owner._id;
        this._ownerId = ownerId;
        this._handleLikeCard = handleLikeCard;
        this._isLiked = likes.some((like) => like._id === ownerId);
    }

    _delete = async () => {
        try {
            await this._handleRemoveCard();
            this.remove();
        } catch(e) {
            console.log(e);
        }
    };

    remove() {
        this._view.remove();
        this._view = null;
    }

     _like = async () => {
        try {
            const data = await this._handleLikeCard();
            this.toggleLike();
            this.setLikeCounter(data.likes.length);
        } catch(e) {}
    };

    toggleLike = () => {
        const likeButton = this._view.querySelector('.element__like');
        likeButton.classList.toggle('element__like_is_selected');
        this._isLiked = !this._isLiked;
    };

    getLikesState = () => {
        return this._isLiked;
    };

    setLikeCounter = (count) => {
        this._view.querySelector('.element__likes').textContent = count;
    };

    _previewPicture = () => {
        this._handleCardClick(this._title, this._image);
    };

    _setEventListeners() {
        this._view.querySelector('.element__delete').addEventListener('click', this._delete);
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
        const trash_icon = this._view.querySelector('.element__delete');
        const like_element = this._view.querySelector('.element__like');
        if (this._isLiked) {
            like_element.classList.add('element__like_is_selected');
        }
        this._view.querySelector('.element__name').textContent = this._title;
        this._view.querySelector('.element__likes').textContent = this._likes.length;
        photo.src = this._image;
        photo.alt = this._title;

        if (this._id === this._ownerId) {
            trash_icon.classList.remove('element__delete_hidden');
        }
        this._setEventListeners();

        return this._view;
    }
}

export default Card;
