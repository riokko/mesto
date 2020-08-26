class Card {
  constructor(data) {
    this._title = data.name;
    this._image = data.link;
  }

  _remove = () => {
    this._view.remove();
  }

  _like = () => {
    const likeButton = this._view.querySelector('.element__like')
    likeButton.classList.toggle('element__like_is_selected');
  }

  getView() {
    const cardTemplate = document.querySelector('.template-element').content.querySelector('.element');

    this._view = cardTemplate.cloneNode(true);
    this._view.querySelector('.element__name').textContent = this._title;
    this._view.querySelector('.element__photo').src = this._image;
    this._view.querySelector('.element__photo').alt = this._title;

    this._view.querySelector('.element__delete').addEventListener('click', this._remove);
    this._view.querySelector('.element__like').addEventListener('click', this._like);

    return this._view;
  }
}

export default Card;
