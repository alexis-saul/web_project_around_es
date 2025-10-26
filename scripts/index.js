const editButton = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector("#edit-popup");
const closeButtonEdit = popupEditProfile.querySelector(".popup__close");
const profileName = document.querySelector(".profile__title");
const profileAbout = document.querySelector(".profile__description");

const nameInput = popupEditProfile.querySelector(".popup__input_type_name");
const aboutInput = popupEditProfile.querySelector(
  ".popup__input_type_description"
);

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

initialCards.forEach(function (name) {});

function openModal(modal) {
  modal.classList.add("popup_is-opened"); // agrega la clase que lo hace visible
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened"); // quita la clase para ocultarlo
}

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

// === Asociamos el evento submit al formulario ===
formElement.addEventListener("submit", handleProfileFormSubmit);
