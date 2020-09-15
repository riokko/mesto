import './index.css';

import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {classesMap} from '../utils/constants.js';
import logger from '../utils/logger.js';
import PopupWithSubmit from '../components/PopupWithSubmit';

const openEditProfileButton = document.querySelector('.profile__edit-button');
const openAddCardButton = document.querySelector('.profile__add-button');
const profileForm = document.querySelector('[name="edit-profile"]');
const inputName = profileForm.querySelector('.form__input_type_name');
const inputProfession = profileForm.querySelector('.form__input_type_profession');

const photoPopup = new PopupWithImage('.popup_type_photo');

const apiCards = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-15/cards/',
});

const apiUser = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-15/users/me/',
});

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

const editProfilePopup = new PopupWithForm('.popup_type_edit-profile-form', (userData) => {
    apiUser
        .patchUserInfo(userData)
        .then((data) => {
            userInfo.setUserInfo(data);
        })
        .catch((data) => logger);
});

const openEditProfileHandler = () => {
    listenEditButton(userInfo.getUserInfo());
    editProfilePopup.open();
};

const addCardPopup = new PopupWithForm('.popup_type_new-item-form', (cardData) => {
    apiCards
        .addCard(cardData)
        .then((data) => {
            cardRenderer(data);
        })
        .catch((data) => logger);
});

function cardRenderer(cardData, shouldPrepend) {
    const newCard = new Card({
        ...cardData,
        cardSelector: '.template-element',
        handleCardClick: () => {
            photoPopup.open(cardData);
        },
        handleRemoveCard: () => {
            removeCardPopup.myDynamicHandlerChanger(() => {
                apiCards
                    .removeCard(`https://mesto.nomoreparties.co/v1/cohort-15/cards/${cardData._id}`)
                    .then(() => {
                        removeCardPopup.close();
                        newCard.remove();
                    })
                    .catch((data) => logger);
            });
            removeCardPopup.open();
        },
    });
    const cardElement = newCard.getView();

    cardsList.addItem(cardElement, shouldPrepend);
}

function listenEditButton(obj) {
    inputName.value = obj.name.textContent;
    inputProfession.value = obj.profession.textContent;
}

new FormValidator(document.querySelector('.popup_type_new-item-form'), classesMap).enableValidation();
new FormValidator(document.querySelector('.popup_type_edit-profile-form'), classesMap).enableValidation();

cardsList.renderItem();

apiCards
    .getInitialCards()
    .then((cards) => {
        cards.forEach((card) => {
            cardRenderer(card, true);
        });
    })
    .catch((data) => logger);

apiUser
    .getUserInfo()
    .then((data) => {
        userInfo.setUserInfo(data);
    })
    .catch((data) => logger);

openEditProfileButton.addEventListener('click', openEditProfileHandler);
openAddCardButton.addEventListener('click', addCardPopup.open.bind(addCardPopup));
