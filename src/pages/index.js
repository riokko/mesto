import "./index.css";

import Api from "../components/Api.js"
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {classesMap, initialCards} from "../utils/constants.js";

const openEditProfileButton = document.querySelector(".profile__edit-button");
const openAddCardButton = document.querySelector(".profile__add-button");
const profileForm = document.querySelector('[name="edit-profile"]');
const inputName = profileForm.querySelector(".form__input_type_name");
const inputProfession = profileForm.querySelector(
  ".form__input_type_profession"
);

new FormValidator(
  document.querySelector(".popup_type_new-item-form"),
  classesMap
).enableValidation();
new FormValidator(
  document.querySelector(".popup_type_edit-profile-form"),
  classesMap
).enableValidation();

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardRenderer(item, true);
    },
  },
  ".elements__list"
);
//

const photoPopup = new PopupWithImage(".popup_type_photo");

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

cardsList.renderItem();

function listenEditButton(obj) {
  inputName.value = obj.name.textContent;
  inputProfession.value = obj.profession.textContent;
}

const userInfo = new UserInfo({
  name: ".profile__name-title",
  about: ".profile__profession",
});

const openEditProfileHandler = () => {
  listenEditButton(userInfo.getUserInfo());
  editProfilePopup.open();
};

const editProfilePopup = new PopupWithForm(
  ".popup_type_edit-profile-form",
  userInfo.setUserInfo
);

const addCardPopup = new PopupWithForm(
  ".popup_type_new-item-form",
  renderMapping
);

openEditProfileButton.addEventListener("click", openEditProfileHandler);
openAddCardButton.addEventListener(
  "click",
  addCardPopup.open.bind(addCardPopup)
);

const api = new Api ({
    url: "https://mesto.nomoreparties.co/v1/cohort-15/cards/",
    headers: {
        "Content-Type": "application/json",
        authorization: "0ffb4600-da7b-4a50-ad82-6478aae818d7"
    }
})

const cards = api.getInitialCards();
cards.then((data) => {
    console.log(data);
})
