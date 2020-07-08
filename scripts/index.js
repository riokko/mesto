let openEditProfileForm = document.querySelector(".profile__edit-button");
let closeEditProfileForm = document.querySelector(".popup__close-button");
let popup = document.querySelector(".popup");
let profileForm = popup.querySelector(".edit-profile-form");

//переносы мне сделал Prettier, не заметила такой подставы :)
let inputName = profileForm.querySelector(".edit-profile-form__input_type_name");
let inputProfession = profileForm.querySelector(".edit-profile-form__input_type_profession");
let profileName = document.querySelector(".profile__name-title");
let profileProfession = document.querySelector(".profile__profession");

//переключение класса popup_opened, который показывает окно или убирает
function togglePopup() {
  popup.classList.toggle("popup_opened");
}

//показ данных из profile__name-title и profile__profession + слушатель,
//срабатывающий по кнопке profile__edit-button
function listenerForEditButton() {
  togglePopup();
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
}

//сохранение данных из формы и отправка в profile__name-title и profile__profession
function saveDataFromEditForm(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  togglePopup();
}

// открывает форму редактирования профиля при клике на кнопку
openEditProfileForm.addEventListener("click", listenerForEditButton);
// закрывает форму редактирования
closeEditProfileForm.addEventListener("click", togglePopup);
// закрывает форму и сохраняет при нажатии на Сохраниить
profileForm.addEventListener("submit", saveDataFromEditForm);
