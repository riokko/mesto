import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {closePopup, openPopup} from './utils.js';
import {classesMap, initialCards, photoPopup} from './constants.js';

const popupList = Array.from(document.querySelectorAll('.popup'));

// выбор элементов на странице
const editProfilePopup = document.querySelector('.popup_type_edit-profile-form');
const profileForm = document.querySelector('[name="edit-profile"]');
const addItemForm = document.querySelector('[name="add-item"]');
const profileName = document.querySelector('.profile__name-title');
const profileProfession = document.querySelector('.profile__profession');

const elementsList = document.querySelector('.elements__list');

const addItemPopup = document.querySelector('.popup_type_new-item-form');

// Выбор элементов формы редактирования профиля
const openEditProfileButton = document.querySelector('.profile__edit-button');
const closeEditProfileButton = editProfilePopup.querySelector('.popup__close-button');
const inputName = profileForm.querySelector('.form__input_type_name');
const inputProfession = profileForm.querySelector('.form__input_type_profession');

// Выбор элементов формы добавления нового места
const openAddCardButton = document.querySelector('.profile__add-button');
const closeAddCardButton = addItemPopup.querySelector('.popup__close-button');
const inputPlace = addItemForm.querySelector('.form__input_type_place');
const inputUrl = addItemForm.querySelector('.form__input_type_url');

const closePhotoPopup = photoPopup.querySelector('.popup__close-button');

new FormValidator(addItemPopup, classesMap).enableValidation();
new FormValidator(editProfilePopup, classesMap).enableValidation();

function renderElements(data) {
  const cardItem = new Card(data, '.template-element');
  elementsList.prepend(cardItem.getView());
}

initialCards.forEach((data) => {
  renderElements(data);
});

function closePopupHandler({target, currentTarget}) {
  if (target === currentTarget) {
    closePopup();
  }
}

function editProfilePopupOpen() {
  openPopup(editProfilePopup);
}

function addItemPopupOpen() {
  openPopup(addItemPopup);
}

function listenEditButton() {
  editProfilePopupOpen();
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
}

function saveDataFromEditForm(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  closePopup();
}

function saveDataFromAddItemForm(event) {
  event.preventDefault();
  renderElements({name: inputPlace.value, link: inputUrl.value});
  closePopup();
}

openEditProfileButton.addEventListener('click', listenEditButton);
closeEditProfileButton.addEventListener('click', closePopup);
profileForm.addEventListener('submit', saveDataFromEditForm);
openAddCardButton.addEventListener('click', addItemPopupOpen);
closeAddCardButton.addEventListener('click', closePopup);
addItemForm.addEventListener('submit', saveDataFromAddItemForm);
closePhotoPopup.addEventListener('click', closePopup);

popupList.forEach((popup) => {
  popup.addEventListener('click', closePopupHandler);
});
