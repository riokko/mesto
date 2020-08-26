import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Popup from './Popup.js';
import {classesMap, initialCards} from './constants.js';


// выбор элементов на странице
const profileName = document.querySelector('.profile__name-title');
const profileProfession = document.querySelector('.profile__profession');
const elementsList = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('.template-element').content.querySelector('.element');
const openEditProfileButton = document.querySelector('.profile__edit-button');
const openAddCardButton = document.querySelector('.profile__add-button');


const profilteEditPopupContent = document.querySelector('.edit-profile-popup-template').content.cloneNode(true);
const profileForm = profilteEditPopupContent.querySelector('[name="edit-profile"]');
const inputName = profileForm.querySelector('.form__input_type_name');
const inputProfession = profileForm.querySelector('.form__input_type_profession');

const wrapperForEditProfile = document.createElement('div');
[...profilteEditPopupContent.children].forEach((child) => wrapperForEditProfile.appendChild(child));
const editProfilePopup = new Popup(document.querySelector('.popup'), wrapperForEditProfile);
const editProfileValidator = new FormValidator(wrapperForEditProfile, classesMap);
editProfileValidator.enableValidation();

const addPlacePopupContent = document.querySelector('.add-place-popup-template').content.cloneNode(true);
const addPlaceForm = addPlacePopupContent.querySelector('[name="add-item"]');
const inputPlace = addPlaceForm.querySelector('.form__input_type_place');
const inputUrl = addPlaceForm.querySelector('.form__input_type_url');

const wrapperForAddPlace = document.createElement('div');
[...addPlacePopupContent.children].forEach((child) => wrapperForAddPlace.appendChild(child));
const addPlacePopup = new Popup(document.querySelector('.popup'), wrapperForAddPlace);
const addItemValidator = new FormValidator(wrapperForAddPlace, classesMap);
addItemValidator.enableValidation();


function renderElements(data) {
  const cardItem = new Card(data, cardTemplate);
  elementsList.prepend(cardItem.getView());
}

initialCards.forEach((data) => {
  renderElements(data);
});

function listenEditButton() {
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
  editProfilePopup.open();
}

function saveDataFromEditForm(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  editProfilePopup.close();
}

function saveDataFromAddItemForm(event) {
  event.preventDefault();
  renderElements({name: inputPlace.value, link: inputUrl.value});
  addPlacePopup.close();
}

openEditProfileButton.addEventListener('click', listenEditButton);
profileForm.addEventListener('submit', saveDataFromEditForm);
openAddCardButton.addEventListener('click', addPlacePopup.open);
addPlaceForm.addEventListener('submit', saveDataFromAddItemForm);
