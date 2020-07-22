// выбор элементов на странице
const editProfilePopup = document.querySelector(".popup_type_edit-profile-form");
const profileForm = document.querySelector('[name="edit-profile"]');
const inputName = profileForm.querySelector(".form__input_type_name");
const inputProfession = profileForm.querySelector(".form__input_type_profession");

const elementsList = document.querySelector(".elements__list");
const cardTemplate = document.querySelector('.template-element').content.querySelector('.element');

const addItemPopup = document.querySelector(".popup_type_new-item-form");

// Выбор элементов формы редактирования профиля
const openEditProfileButton = document.querySelector(".profile__edit-button");
const closeEditProfileButton = editProfilePopup.querySelector(".popup__close-button");
const profileName = document.querySelector(".profile__name-title");
const profileProfession = document.querySelector(".profile__profession");

// Выбор элементов формы добавления нового места
const openAddCardButton = document.querySelector(".profile__add-button");
const closeAddCardButton = addItemPopup.querySelector(".popup__close-button");

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

initialCards.forEach((card) => {
  const cardElement = cardTemplate.cloneNode(true);

  const cardTitle = cardElement.querySelector('.element__name');
  const cardImage = cardElement.querySelector('.element__photo');
  const cardLikeButton = cardElement.querySelector('.element__like');

  cardTitle.textContent = card.name;
  cardImage.src = card.link;

  elementsList.prepend(cardElement);
})

//переключение класса popup_opened, который показывает окно или убирает
function toggleEditProfilePopup() {
  editProfilePopup.classList.toggle("popup_opened");
}

function toggleAddItemPopup() {
  addItemPopup.classList.toggle("popup_opened");
}

function listenerForEditButton() {
  toggleEditProfilePopup();
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
}

//сохранение данных из формы и отправка в profile__name-title и profile__profession
function saveDataFromEditForm(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  toggleEditProfilePopup();
}

function saveDataFromAddItemForm(event) {
  event.preventDefault();

}

openEditProfileButton.addEventListener("click", listenerForEditButton);
closeEditProfileButton.addEventListener("click", toggleEditProfilePopup);
profileForm.addEventListener("submit", saveDataFromEditForm);
openAddCardButton.addEventListener('click', toggleAddItemPopup);
closeAddCardButton.addEventListener('click', toggleAddItemPopup);
