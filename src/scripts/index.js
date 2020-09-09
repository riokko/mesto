import '../pages/index.css';

import Card from "./Card.js";
import Section from "./Section.js";
import FormValidator from "./FormValidator.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import {classesMap, initialCards} from "./constants.js";

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
      const cardItem = new Card(item, ".template-element", () => {
        photoPopup.open();
      });
      const cardElement = cardItem.getView();
      const photoPopup = new PopupWithImage(item, ".popup_type_photo");
      cardsList.addItem(cardElement);
    },
  },
  ".elements__list"
);

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

function renderElementsWithMapping({ place, url }) {
  const newCard = new Card(
    { name: place, link: url },
    ".template-element",
    () => {
      photoPopup.open();
    }
  );
  const cardElement = newCard.getView();
  const photoPopup = new PopupWithImage(
    { name: place, link: url },
    ".popup_type_photo"
  );
  cardsList.addItem(cardElement);
}

const addCardPopup = new PopupWithForm(
  ".popup_type_new-item-form",
  renderElementsWithMapping
);

openEditProfileButton.addEventListener("click", openEditProfileHandler);
openAddCardButton.addEventListener("click", addCardPopup.open);
