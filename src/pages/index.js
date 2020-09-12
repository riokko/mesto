import "./index.css";

import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
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
