import PopupWithConfirmation from "./PopupWithConfirmation.js";
import Card from "./card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import Api from "./Api.js";

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
const avatarImage = document.querySelector(".profile__image");

avatarImage.addEventListener("click", () => {
  avatarPopup.open();
});
const imagePopupInstance = new Popup("#image-popup");
imagePopupInstance.setEventListeners();
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

const avatarPopup = new PopupWithForm(".popup_type_avatar", handleAvatarSubmit);

avatarPopup.setEventListeners();

const confirmDeletePopup = new PopupWithConfirmation(
  ".popup_type_confirm-delete",
);

confirmDeletePopup.setEventListeners();

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "6a58be05-8a8e-4df4-9fdd-a4b70877163b",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

let currentUserId;

api
  .getUserInfo()
  .then((userData) => {
    currentUserId = userData._id;

    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar,
      _id: userData._id,
    });
  })
  .catch(console.error);

// --- Función para abrir imagen --- //
function handleImageClick(name, link) {
  imagePopup.open(name, link);
}

function handleLikeClick(card) {
  const isLiked = card.isLiked();
  const cardId = card.getId();

  const likeRequest = isLiked ? api.unlikeCard(cardId) : api.likeCard(cardId);

  likeRequest
    .then((updatedCard) => {
      card.updateLike(updatedCard.isLiked);
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleDeleteClick(card) {
  confirmDeletePopup.open();

  confirmDeletePopup.setSubmitAction(() => {
    api
      .deleteCard(card.getId())
      .then(() => {
        card.removeCard();
        confirmDeletePopup.close();
      })
      .catch((err) => {
        console.error(err);
      });
  });
}

const cardSection = new Section(
  {
    renderer: (item) => {
      const card = new Card(
        item,
        "#card-template",
        handleImageClick,
        handleLikeClick,
        handleDeleteClick,
        currentUserId,
      );

      const cardElement = card.generateCard();
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list",
);

api
  .getInitialCards()
  .then((cards) => {
    cardSection.renderItems(cards);
  })
  .catch((err) => {
    console.error(err);
  });

function handleAvatarSubmit(data) {
  avatarPopup.renderLoading(true);

  api
    .updateAvatar({
      avatar: data.avatar,
    })
    .then((userData) => {
      userInfo.setUserInfo({
        name: userData.name,
        about: userData.about,
        avatar: userData.avatar,
        _id: userData._id,
      });
      avatarPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      avatarPopup.renderLoading(false);
    });
}

function handleAddCardSubmit(data) {
  addCardPopup.renderLoading(true);

  api
    .addCard({
      name: data["place-name"],
      link: data.link,
    })
    .then((cardData) => {
      const card = new Card(
        cardData,
        "#card-template",
        handleImageClick,
        handleLikeClick,
        handleDeleteClick,
        currentUserId,
      );

      const cardElement = card.generateCard();
      cardSection.addItem(cardElement);
      addCardPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      addCardPopup.renderLoading(false);
    });
}

const addCardPopup = new PopupWithForm("#new-card-popup", handleAddCardSubmit);

addCardPopup.setEventListeners();

// --- Validación --- //
const editFormValidator = new FormValidator(validationConfig, formElement);
const newCardFormValidator = new FormValidator(validationConfig, newCardForm);
editFormValidator.enableValidation();
newCardFormValidator.enableValidation();

// --- Eventos --- //

const editProfilePopup = new PopupWithForm("#edit-popup", (formData) => {
  editProfilePopup.renderLoading(true);

  api
    .updateUserInfo({
      name: formData.name,
      about: formData.description,
    })
    .then((userData) => {
      userInfo.setUserInfo({
        name: userData.name,
        about: userData.about,
        avatar: userData.avatar,
        _id: userData._id,
      });
      editProfilePopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editProfilePopup.renderLoading(false);
    });
});

editProfilePopup.setEventListeners();

editButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();

  nameInput.value = userData.name;
  aboutInput.value = userData.job;

  editFormValidator.resetValidation();
  editProfilePopup.open();
});

addButton.addEventListener("click", () => {
  newCardFormValidator.resetValidation();
  addCardPopup.open();
});
