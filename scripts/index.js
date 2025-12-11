import Card from "./card.js";
import FormValidator from "./FormValidator.js";
import { openModal, closeModal, closePopupOnOverlayClick } from "./utils.js";

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
const popupEditProfile = document.querySelector("#edit-popup");
const profileName = document.querySelector(".profile__title");
const profileAbout = document.querySelector(".profile__description");
const formElement = document.querySelector("#edit-profile-form");

const nameInput = formElement.querySelector("#name-input");
const aboutInput = formElement.querySelector("#description-input");

const addButton = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector("#new-card-popup");
const newCardForm = document.querySelector("#new-card-form");
const placeNameInput = newCardForm.querySelector("#card-name-input");
const placeLinkInput = newCardForm.querySelector("#url-input");

const imagePopup = document.querySelector("#image-popup");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("mousedown", closePopupOnOverlayClick);
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

const cardsContainer = document.querySelector(".cards__list");

// --- Función para abrir imagen --- //
function handleImageClick(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(imagePopup);
}

// --- Renderizado de cards --- //
function renderCard(item) {
  const card = new Card(item, "#card-template", handleImageClick);
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
}

initialCards.forEach(renderCard);

// --- Validación --- //
const editFormValidator = new FormValidator(validationConfig, formElement);
const newCardFormValidator = new FormValidator(validationConfig, newCardForm);
editFormValidator.enableValidation();
newCardFormValidator.enableValidation();

// --- Eventos --- //
editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;

  editFormValidator.resetValidation();
  openModal(popupEditProfile);
});

formElement.addEventListener("submit", (evt) => {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;

  closeModal(popupEditProfile);
});

addButton.addEventListener("click", () => {
  newCardForm.reset();
  newCardFormValidator.resetValidation();
  openModal(popupNewCard);
});

newCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  renderCard({
    name: placeNameInput.value,
    link: placeLinkInput.value,
  });

  closeModal(popupNewCard);
});
