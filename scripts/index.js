import Card from "./card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

// --- Selectores --- //
const editButton = document.querySelector(".profile__edit-button");
const formElement = document.querySelector("#edit-profile-form");

const nameInput = formElement.querySelector("#name-input");
const aboutInput = formElement.querySelector("#description-input");

const addButton = document.querySelector(".profile__add-button");
const newCardForm = document.querySelector("#new-card-form");

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

const imagePopupInstance = new Popup("#image-popup");

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

// --- Render inicial --- //
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

imagePopupInstance.setEventListeners();

// --- Función para abrir imagen --- //
function handleImageClick(name, link) {
  imagePopup.open(name, link);
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#card-template", handleImageClick);
      const cardElement = card.generateCard();
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);

cardSection.renderItems();

// --- Validación --- //
const editFormValidator = new FormValidator(validationConfig, formElement);
const newCardFormValidator = new FormValidator(validationConfig, newCardForm);
editFormValidator.enableValidation();
newCardFormValidator.enableValidation();

// --- Eventos --- //

const editProfilePopup = new PopupWithForm("#edit-popup", (formData) => {
  userInfo.setUserInfo({
    name: formData.name,
    job: formData.description,
  });
  editProfilePopup.setEventListeners();
});

editProfilePopup.setEventListeners();

editButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();

  nameInput.value = userData.name;
  aboutInput.value = userData.job;

  editFormValidator.resetValidation();
  editProfilePopup.open();
});

const newCardPopup = new PopupWithForm("#new-card-popup", (formData) => {
  const card = new Card(
    {
      name: formData["place-name"],
      link: formData.link,
    },
    "#card-template",
    handleImageClick
  );

  cardSection.addItem(card.generateCard());
  newCardPopup.setEventListeners();
});

newCardPopup.setEventListeners();

addButton.addEventListener("click", () => {
  newCardFormValidator.resetValidation();
  newCardPopup.open();
});
