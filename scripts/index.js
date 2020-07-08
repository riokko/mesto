let openEditProfileForm = document.querySelector('.profile__edit-button');
let closeEditProfileForm = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
let ProfileForm = popup.querySelector('.edit-profile-form');
let inputName = ProfileForm.querySelector('.edit-profile-form__input_type_name');
let inputProfession = ProfileForm.querySelector('.edit-profile-form__input_type_profession');
let profileName = document.querySelector('.profile__name-title');
let profileProfession = document.querySelector('.profile__profession');

function togglePopup () {
  popup.classList.toggle('popup_is-open');
}

openEditProfileForm.addEventListener('click', () => {
  togglePopup();
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
});

closeEditProfileForm.addEventListener('click', togglePopup);

ProfileForm.addEventListener('submit', (event) => {
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  event.preventDefault();
  togglePopup();
});
