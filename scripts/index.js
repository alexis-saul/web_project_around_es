const editButton = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector("#edit-popup");
const closeButtonEdit = popupEditProfile.querySelector(".popup__close");
const profileName = document.querySelector(".profile__title");
const profileAbout = document.querySelector(".profile__description");

const nameInput = popupEditProfile.querySelector(".popup__input_type_name");
const aboutInput = popupEditProfile.querySelector(
  ".popup__input_type_description"
);
const addbutton = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector("#new-card-popup");
const closeButtonNewCard = popupNewCard.querySelector(".popup__close");
const newCardForm = document.querySelector("#new-card-form");
const placeNameInput = newCardForm.querySelector(
  ".popup__input_type_card-name"
);
const imagePopup = document.querySelector("#image-popup");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");
const closeImageButton = imagePopup.querySelector(".popup__close");

const placeLinkInput = newCardForm.querySelector(".popup__input_type_url");

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

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsContainer = document.querySelector(".cards__list");

function getCardElement(
  name = "Sin titulo",
  link = "./images/placeholder.jpg"
) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  cardImage.addEventListener("click", function () {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    openModal(imagePopup);
  });

  likeButton.addEventListener("click", function (e) {
    e.target.classList.toggle("card__like-button_is-active");
  });

  deleteButton.addEventListener("click", function () {
    cardElement.remove();
  });

  closeImageButton.addEventListener("click", function () {
    closeModal(imagePopup);
  });

  return cardElement;
}

function rendercard(name, link, container) {
  const cardElement = getCardElement(name, link);
  container.prepend(cardElement);
}

initialCards.forEach(function (card) {
  rendercard(card.name, card.link, cardsContainer);
});

function openModal(modal) {
  modal.classList.add("popup_is-opened"); // agrega la clase que lo hace visible
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened"); // quita la clase para ocultarlo
}

addbutton.addEventListener("click", function () {
  openModal(popupNewCard);
});

closeButtonNewCard.addEventListener("click", function () {
  closeModal(popupNewCard);
});

editButton.addEventListener("click", function () {
  openModal(popupEditProfile);
});

closeButtonEdit.addEventListener("click", function () {
  closeModal(popupEditProfile);
});

function fillProfileForm() {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(popupEditProfile);
}

editButton.addEventListener("click", handleOpenEditModal);
closeButtonEdit.addEventListener("click", () => closeModal(popupEditProfile));

const formElement = document.querySelector("#edit-profile-form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // evita que el formulario se envíe y recargue la página

  // Obtenemos los valores actuales de los inputs
  const nameValue = nameInput.value;
  const aboutValue = aboutInput.value;

  // Actualizamos el contenido de la página
  profileName.textContent = nameValue;
  profileAbout.textContent = aboutValue;

  // Cerramos la ventana emergente
  closeModal(popupEditProfile);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = placeNameInput.value;
  const linkValue = placeLinkInput.value;

  rendercard(nameValue, linkValue, cardsContainer);

  closeModal(popupNewCard);
  newCardForm.requestFullscreen();
}

// === Asociamos el evento submit al formulario ===
formElement.addEventListener("submit", handleProfileFormSubmit);
newCardForm.addEventListener("submit", handleCardFormSubmit);
