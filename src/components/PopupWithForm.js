import Popup from "./Popup.js";
import FormValidator from "./FormValidator.js";
import {classesMap} from "../utils/constants";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popup.querySelectorAll(".form__input");

    this._formValidator = new FormValidator(
      document.querySelector(".popup_type_new-item-form"),
      classesMap
    );
    this._reset = this._formValidator.reset.bind(this._formValidator);
  }

  _getInputValues = () => {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  };

  _submit = (event) => {
    event.preventDefault();
    this._handleFormSubmit(this._getInputValues());
    this.close();
    this._reset(this._inputList);
  };

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", this._submit);
  }

  close() {
    super.close();
    this._popup.removeEventListener("submit", this._submit);
  }
}

export default PopupWithForm;
