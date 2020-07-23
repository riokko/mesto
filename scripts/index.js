// выбор элементов на странице
const editProfilePopup = document.querySelector('.popup_type_edit-profile-form');
const profileForm = document.querySelector('[name="edit-profile"]');
const addItemForm = document.querySelector('[name="add-item"]');
const profileName = document.querySelector('.profile__name-title');
const profileProfession = document.querySelector('.profile__profession');

const elementsList = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('.template-element').content.querySelector('.element');

const addItemPopup = document.querySelector('.popup_type_new-item-form');

const photoPopup = document.querySelector('.popup_type_photo')
const photoImage = document.querySelector('.popup__image');
const photoCaption = document.querySelector('.popup__caption');


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

const closePhotoPopup = photoPopup.querySelector('.popup__close-button')


const initialCards = [
  {
    name: 'Сан-Франциско',
    link: 'https://images.unsplash.com/photo-1527905876394-1e5115891cba',
  },
  {
    name: 'Токио',
    link: 'https://images.unsplash.com/photo-1522850959516-58f958dde2c1',
  },
  {
    name: 'Амстердам',
    link: 'https://images.unsplash.com/photo-1517736996303-4eec4a66bb17',
  },
  {
    name: 'Дорога гигантов',
    link: 'https://images.unsplash.com/photo-1505576457712-b769c0c0a354',
  },
  {
    name: 'Дубаи',
    link: 'https://images.unsplash.com/photo-1510665724063-f77a01074aa2',
  },
  {
    name: 'Портофино',
    link: 'https://images.unsplash.com/photo-1556897982-56edf57f1c5b',
  }
];

initialCards.forEach((data) => {
  renderElements(data);
})

function createElements(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector('.element__name');
  const cardImage = cardElement.querySelector('.element__photo');

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  return cardElement;
}

function renderElements(data) {
  elementsList.prepend(createElements(data));
}

function toggleEditProfilePopup() {
  editProfilePopup.classList.toggle('popup_opened');
}

function toggleAddItemPopup() {
  addItemPopup.classList.toggle('popup_opened');
}

function togglePhotoPopup() {
  photoPopup.classList.toggle('popup_opened')
}

function listenerForEditButton() {
  toggleEditProfilePopup();
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
}

function saveDataFromEditForm(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  toggleEditProfilePopup();
}

function saveDataFromAddItemForm(event) {
  event.preventDefault();
  renderElements({name: inputPlace.value, link: inputUrl.value});
  toggleAddItemPopup();
}

function doSmthWithCard(event) {
  const eventTargetElement = event.target.closest('.element')
  // тут лайкаем место
  if (event.target.classList.contains('element__like')) {
    event.target.classList.toggle('element__like_is_selected');
  } // тут удаляем место
  else if (event.target.classList.contains('element__delete')) {
    eventTargetElement.remove()
  } // тут раскрываем картинку
  else if (event.target.classList.contains('element__photo')) {
    event.preventDefault();
    addDataToPhotoPopup(event);
    togglePhotoPopup();
  }
}

function addDataToPhotoPopup(event) {
  const eventTargetElement = event.target.closest('.element')
  const openPhotoClick = event.target.closest('.element__photo');
  const openPhotoClickTitle = eventTargetElement.querySelector('.element__name');

  photoImage.src = openPhotoClick.src;
  photoImage.alt = openPhotoClick.alt;
  photoCaption.textContent = openPhotoClickTitle.textContent;
}

openEditProfileButton.addEventListener('click', listenerForEditButton);
closeEditProfileButton.addEventListener('click', toggleEditProfilePopup);
profileForm.addEventListener('submit', saveDataFromEditForm);
openAddCardButton.addEventListener('click', toggleAddItemPopup);
closeAddCardButton.addEventListener('click', toggleAddItemPopup);
addItemForm.addEventListener('submit', saveDataFromAddItemForm);
elementsList.addEventListener('click', doSmthWithCard);
closePhotoPopup.addEventListener('click', togglePhotoPopup)

//Ролан, спасибо за ревью и приятные слова! Постаралась исправить все недочеты.
