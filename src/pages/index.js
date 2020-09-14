import "./index.css";

import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {classesMap} from "../utils/constants.js";

const openEditProfileButton = document.querySelector(".profile__edit-button");
const openAddCardButton = document.querySelector(".profile__add-button");
const profileForm = document.querySelector('[name="edit-profile"]');
const inputName = profileForm.querySelector(".form__input_type_name");
const inputProfession = profileForm.querySelector(
    ".form__input_type_profession"
);

const photoPopup = new PopupWithImage(".popup_type_photo");

const apiCards = new Api({
    url: "https://mesto.nomoreparties.co/v1/cohort-15/cards/",
});

const apiUser = new Api({
    url: "https://mesto.nomoreparties.co/v1/cohort-15/users/me/",
    method: "PATCH",
});

const cardsList = new Section(
    {
        items: [],
        renderer: (item) => {
            cardRenderer(item, true);
        },
    },
    ".elements__list"
);

const userInfo = new UserInfo({
    name: ".profile__name-title",
    about: ".profile__profession",
    avatar: ".profile__avatar",
});

const editProfilePopup = new PopupWithForm(
    ".popup_type_edit-profile-form",
    (userData) => {
        apiUser.patchUserInfo(userData).then((data) => {
            userInfo.setUserInfo(data);
        });
    }
);

const openEditProfileHandler = () => {
    listenEditButton(userInfo.getUserInfo());
    editProfilePopup.open();
};

const addCardPopup = new PopupWithForm(
    ".popup_type_new-item-form",
    renderMapping
);

function renderMapping({ place, url }) {
    cardRenderer({ name: place, link: url }, false);
}

function cardRenderer(cardData, shouldPrepend) {
    const newCard = new Card(cardData, ".template-element", () => {
        photoPopup.open(cardData);
    });
    const cardElement = newCard.getView();

    cardsList.addItem(cardElement, shouldPrepend);
}

function listenEditButton(obj) {
    inputName.value = obj.name.textContent;
    inputProfession.value = obj.profession.textContent;
}

new FormValidator(
    document.querySelector(".popup_type_new-item-form"),
    classesMap
).enableValidation();
new FormValidator(
    document.querySelector(".popup_type_edit-profile-form"),
    classesMap
).enableValidation();

cardsList.renderItem();

apiCards.getInitialCards().then((cards) => {
    cards.forEach((card) => {
        cardRenderer(card);
    });
});

apiUser.getUserInfo().then((data) => {
    userInfo.setUserInfo(data);
});

openEditProfileButton.addEventListener("click", openEditProfileHandler);
openAddCardButton.addEventListener(
    "click",
    addCardPopup.open.bind(addCardPopup)
);
