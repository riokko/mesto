import './index.css';

import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidatr.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { classesMap } from '../utils/constants.js';
import logger from '../utils/logger.js';
import PopupWithSubmit from '../components/PopupWithSubmit';

const apiConfig = {
    token: '0ffb4600-da7b-4a50-ad82-6478aae818d7',
}

const openEditProfileButton = document.querySelector('.profile__edit-button');
const openAddCardButton = document.querySelector('.profile__add-button');
const profileForm = document.querySelector('[name="edit-profile"]');
const editAvatar = document.querySelector('.profile__user-pic');
const inputName = profileForm.querySelector('.form__input_type_name');
const inputProfession = profileForm.querySelector('.form__input_type_profession');

const api = new Api(apiConfig);
const photoPopup = new PopupWithImage('.popup_type_photo');
const removeCardPopup = new PopupWithSubmit('.popup_type_card-remove');

const cardsList = new Section(
    {
        items: [],
        renderer: (item) => {
            cardRenderer(item, true);
        },
    },
    '.elements__list'
);

const userInfo = new UserInfo({
    name: '.profile__name-title',
    about: '.profile__profession',
    avatar: '.profile__avatar',
});

const editProfilePopup = new PopupWithForm('.popup_type_edit-profile-form', async (userData) => {
    const data = await api.patchUserInfo(userData);
    userInfo.setUserInfo(data);
});

const openEditProfileHandler = () => {
    listenEditButton(userInfo.getUserInfo());
    editProfilePopup.open();
};

const addCardPopup = new PopupWithForm('.popup_type_new-item-form', (cardData) =>
    api.addCard(cardData)
        .then((data) => {
            cardRenderer(data);
        })
        .catch(logger)
);

const editAvatarPopup = new PopupWithForm('.popup_type_edit-avatar-form', ({ avatar }) =>
    api.editAvatar(avatar)
        .then((data) => {
            userInfo.setUserInfo(data);
        })
);

function cardRenderer(cardData, shouldPrepend) {
    const newCard = new Card({
        ...cardData,
        cardSelector: '.template-element',
        handleCardClick: () => {
            photoPopup.open(cardData);
        },
        handleRemoveCard: () => {
            removeCardPopup.handlerChanger( () =>
                api.removeCard(`https://mesto.nomoreparties.co/v1/cohort-15/cards/${cardData._id}`)
            );
            return removeCardPopup.open();
        },
        ownerId: userInfo.getUserId(),
        handleLikeCard: () =>
            api.like(
                `https://mesto.nomoreparties.co/v1/cohort-15/cards/likes/${cardData._id}`,
                newCard.getLikesState() ? 'DELETE' : 'PUT'
            )
    });
    const cardElement = newCard.getView();

    cardsList.addItem(cardElement, shouldPrepend);
}

function listenEditButton(obj) {
    inputName.value = obj.name.textContent;
    inputProfession.value = obj.profession.textContent;
}

cardsList.renderItem();

api.getInitialCards()
    .then((cards) => {
        cards.forEach((card) => {
            cardRenderer(card, true);
        });
    })
    .catch(logger);

api.getUserInfo()
    .then((data) => {
        userInfo.setUserInfo(data);
    })
    .catch(logger);

openEditProfileButton.addEventListener('click', openEditProfileHandler);
openAddCardButton.addEventListener('click', addCardPopup.open.bind(addCardPopup));
editAvatar.addEventListener('click', editAvatarPopup.open.bind(editAvatarPopup));

new FormValidator(document.querySelector('.popup_type_new-item-form'), classesMap).enableValidation();
new FormValidator(document.querySelector('.popup_type_edit-profile-form'), classesMap).enableValidation();
new FormValidator(document.querySelector('.popup_type_edit-avatar-form'), classesMap).enableValidation();
